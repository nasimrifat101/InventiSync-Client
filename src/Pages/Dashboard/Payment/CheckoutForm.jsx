/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Swal } from "sweetalert2/dist/sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate()

  axiosSecure.get(`/subscription/email?email=${user.email}`).then((res) => {
    setData(res.data);
    // console.log(res.data);
  });

  const price = parseInt(data.price);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

      if (confirmError) {
        console.log("confirm error");
      } else {
        console.log("payment intent", paymentIntent);
        if (paymentIntent.status === "succeeded") {
          console.log("transaction id", paymentIntent.id);
          setTransactionId(paymentIntent.id);
          // now save the payment in the database
      
          const paymentInfo = {
            name: user?.displayName,
            email: user?.email,
            service: data?.subscription,
            price: data?.price,
            transactionId: paymentIntent.id,
            date: new Date(),
          };
          try {
            // Process payment
            const paymentResponse = await axiosSecure.post("/payments", paymentInfo);
            if (paymentResponse.data.insertedId) {
              const shopResponse = await axiosSecure.get(`/shops/${user.email}`);
      
              const shopData = shopResponse.data;
      
              if (shopData) {
                const updatedProductLimit = data.productLimit;
      
                // Update productLimit in the shop
                const updateShopResponse = await axiosSecure.put(`/shops/${user.email}`, {
                  productLimit: updatedProductLimit,
                });
      
                if (updateShopResponse.data.modifiedCount) {
                  // Delete subscription
                  const deleteSubscriptionResponse = await axiosSecure.delete(`/subscription/delete/email?email=${user.email}`);
                  console.log(deleteSubscriptionResponse.data);
      
                  if (deleteSubscriptionResponse.data.deletedCount) {
                   toast.success('Congratulations. Product Limit updated')
                    navigate('/dashboard/mystore');
                  }
                }
              }
            }
          } catch (error) {
            console.error(error);
            // Handle errors here
          }
        }
      }}
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-accent"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-400">
            {" "}
            Your transaction id: {transactionId}
          </p>
        )}
      </form>
      ;
    </>
  );
};

export default CheckoutForm;
