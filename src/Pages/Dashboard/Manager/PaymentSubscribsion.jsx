import { Helmet } from "react-helmet-async";
import DashNavSecond from "../extra/DashNavSecond";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../Manager/style/swiper.css";
import { EffectCoverflow, Pagination } from "swiper/modules";


const PaymentSubscription = () => {
 const handleBasic =()=>{
alert('b')
 }
 const handleStandard =()=>{
    alert('s')
 }
 const handlePrimium =()=>{
    alert('p')
 }
 

  return (
    <div>
      <Helmet>
        <title>InventiSync | D | Payment Subscription</title>
      </Helmet>
      <DashNavSecond heading={"Choose the plan that best fits you"} />
      <div>
        <div className="container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={false}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="card bg-base-200 h-[300px] rounded-lg text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Basic Plan</h2>
                  <p className="pt-5">
                    With this update, you can have up to 200 products on your
                    shop, providing users with a broader range of choices..
                  </p>
                  <div className="card-actions justify-end">
                    <button onClick={handleBasic} className="btn btn-primary">
                      Update to Basic
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card bg-base-200 h-[300px] rounded-lg text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Standard Plan</h2>
                  <p className="pt-5">
                    Upgrade to the Standard Plan to accommodate up to 450
                    products in your shop, giving users even more options.
                  </p>
                  <div className="card-actions justify-end">
                    <button onClick={handleStandard} className="btn btn-primary">
                      Update to Standard
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="card bg-base-200 h-[300px] rounded-lg text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Premium Plan</h2>
                  <p className="pt-5">
                    Experience the ultimate flexibility with the Premium Plan,
                    allowing you to showcase up to 1500 products on your shop.
                  </p>
                  <div className="card-actions justify-end">
                    <button onClick={handlePrimium} className="btn btn-primary">
                      Update to premium
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PaymentSubscription;
