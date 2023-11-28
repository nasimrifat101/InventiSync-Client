import axios from "axios";
import { useState } from "react";
import SellingCard from "./Cards/SellingCard";

const SellingPoint = () => {
    const [datas, setData] = useState([])
    axios.get('/offer.json')
    .then(res=>{
        setData(res.data)
    })
  return (
    <div className="h-[530px] text-base-300 bg-green-200 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-bold py-10"> What We Offer</h2>
        <div className="grid grid-cols-3 gap-5">
            {
                datas?.map(item=> <SellingCard key={item.id} item={item}></SellingCard>)
            }
        </div>
      </div>
    </div>
  );
};

export default SellingPoint;
