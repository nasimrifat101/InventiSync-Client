import { Helmet } from "react-helmet-async";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Helmet>
        <title>InventiSync | Home</title>
      </Helmet>
     <Banner></Banner>
    </div>
  );
};

export default Home;
