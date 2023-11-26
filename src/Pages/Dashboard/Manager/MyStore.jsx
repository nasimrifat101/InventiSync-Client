/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import DashNavSecond from "../extra/DashNavSecond";
import ProfileCard from "../extra/ProfileCard";
import StoreCard from "../extra/StoreCard";

const MyStore = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [storeData, setStoreData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axiosSecure.get(`/shops/${user?.email}`);
        setStoreData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [axiosSecure, user?.email]);

  return (
    <div>
      <DashNavSecond heading={"My Stores"} text={''}></DashNavSecond>
      <div className="">
        <StoreCard data={storeData}></StoreCard>
      </div>
    </div>
  );
};

export default MyStore;
