import axios from 'axios';

import { useState, useEffect } from 'react';
import TrustCard from './Cards/TrustCard';
import Marquee from 'react-fast-marquee';

const Trusted = () => {
  const [datas, setData] = useState([]);

  useEffect(() => {
    axios.get('testi.json').then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <div className="h-[530px] text-base-300 bg-green-200 mt-32 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl font-bold py-10">
            {" "}
            See What Our Client Say
          </h2>
          <Marquee speed={40} gradient={false} pauseOnHover={true}>
            <div className="flex">
              {datas?.map((item) => (
                <TrustCard key={item.id} item={item}></TrustCard>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Trusted;
