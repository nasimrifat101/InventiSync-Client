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


const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          <SellingPoint />
          <Brands />
          <Trusted />
          <Contact></Contact>
          <NewsLetter></NewsLetter>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
