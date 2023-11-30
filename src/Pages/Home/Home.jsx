import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";
import SellingPoint from "./Components/SellingPoint";
import Footer from "./Components/Banner/Footer";
import Brands from "./Components/Brands";
import Trusted from "./Components/Trusted";
import Preloader from "./Components/Banner/Preeloader";
import Contact from "./Components/Contact";
import NewsLetter from "./Components/NewsLetter";
import TheEnd from "./Components/TheEnd";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader></Preloader>
      ) : (
        <>
          <Navbar />
          <Helmet>
            <title>InventiSync | Home</title>
          </Helmet>

          <Banner />
          <div data-aos="fade-up" data-aos-duration="1000">
            <SellingPoint />
          </div>
          <div data-aos="fade-down" data-aos-duration="1000">
            <Brands />
          </div>
          <div data-aos="fade-up" data-aos-duration="1000">
            <Trusted />
          </div>
          <div data-aos="fade-down" data-aos-duration="1000">
            <Contact></Contact>
          </div>
          <div data-aos="fade-up" data-aos-duration="1000">
            <NewsLetter></NewsLetter>
          </div>
          <TheEnd></TheEnd>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
