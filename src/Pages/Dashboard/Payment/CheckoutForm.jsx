/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/subscription/email?email=${user.email}`).then((res) => {
      setData(res.data);
    });
  }, [axiosSecure, user.email]);

  const price = parseInt(data.price);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
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
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
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
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const paymentInfo = {
          name: user?.displayName,
          email: user?.email,
          service: data?.subscription,
          price: data?.price,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        try {
          const paymentResponse = await axiosSecure.post("/payments", paymentInfo);

          if (paymentResponse.data.insertedId) {
            const shopResponse = await axiosSecure.get(`/shops/${user.email}`);
            const shopData = shopResponse.data;

            if (shopData) {
              const updatedProductLimit = data.productLimit;
              const updateShopResponse = await axiosSecure.put(`/shops/${user.email}`, {
                productLimit: updatedProductLimit,
              });

              if (updateShopResponse.data.modifiedCount) {
                const deleteSubscriptionResponse = await axiosSecure.delete(`/subscription/delete/email?email=${user.email}`);

                if (deleteSubscriptionResponse.data.deletedCount) {
                  toast.success('Congratulations. Product Limit updated')
                  navigate('/dashboard/mystore');
                }
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const formStyles = {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyles = {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const errorMessageStyles = {
    color: "#ff0000",
    marginTop: "10px",
  };

  const successMessageStyles = {
    color: "#008000",
    marginTop: "10px",
  };

  return (
    <div style={formStyles}>
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
          style={buttonStyles}
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p style={errorMessageStyles}>{error}</p>
        {transactionId && (
          <p style={successMessageStyles}>
            Your transaction id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
