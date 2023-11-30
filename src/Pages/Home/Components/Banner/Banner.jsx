const Banner = () => {
  return (
    <div className="h-[400px] lg:h-[500px]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2">
        <div className="space-y-5 mt-24 p-3 lg:p-0 ">
          <h1 className="text-4xl text-center lg:text-left lg:text-8xl text-green-200 font-bold cursor-not-allowed">Inventory Management</h1>
          <p className="lg:w-[520px] text-center lg:text-left cursor-not-allowed">
            Elevate Efficiency with Our Inventory Management Solution!
            Streamline control, minimize errors, and maximize profits
            effortlessly. <span className="text-green-300 font-semibold">Explore now!</span>
          </p>
         
        </div>
        <div className="flex justify-end">
        <img src="https://i.postimg.cc/mr7hDzfQ/Frame-3-4.png" className="h-[450px] hidden lg:block"/>
        </div>
      </div>
    </div>
  );
};

export default Banner;
