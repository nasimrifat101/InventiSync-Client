const BeforeTheEnd = () => {
  return (
    <div className="bg-green-200 h-[880px] lg:h-[470px] mt-28">
      <div className="max-w-6xl mx-auto">
        <div>
          <h1 className="text-4xl text-center font-bold p-5 text-base-200">
            We Are Trusted By{" "}
          </h1>
          <div className="grid lg:grid-cols-3 gap-5 p-3 lg:p-0">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-center text-4xl font-black text-green-200">2000+</h2>
                <p className="font-bold text-center text-2xl ">Corporate Businesses</p>
              
              </div>
            </div>
            {/*  */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
              <h2 className="text-center text-4xl font-black text-green-200">10000+</h2>
              <p className="font-bold text-center text-2xl ">Small Business</p>
               
              </div>
            </div>
            {/*  */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
              <h2 className="text-center text-4xl font-black text-green-200">4000+</h2>
              <p className="font-bold text-center text-2xl ">Chain Stores</p>
              </div>
              
            </div>
            {/*  */}
            <div className="card bg-base-100 shadow-xl lg:col-span-3">
              <div className="card-body">
              <h2 className="text-center text-4xl font-black text-green-200">1000000+</h2>
              <p className="font-bold text-center text-2xl ">Shops Accross World</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeTheEnd;
