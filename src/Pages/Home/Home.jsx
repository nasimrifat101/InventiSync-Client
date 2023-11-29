import { Helmet } from "react-helmet-async";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";
import SellingPoint from "./Components/SellingPoint";
import Footer from "./Components/Banner/Footer";
import Brands from "./Components/Brands";
import Trusted from "./Components/Trusted";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Helmet>
        <title>InventiSync | Home</title>
      </Helmet>
     <Banner></Banner>
     <SellingPoint></SellingPoint>
     <Brands></Brands>
     <Trusted></Trusted>
     <Footer></Footer>
    </div>
  );
};

export default Home;
