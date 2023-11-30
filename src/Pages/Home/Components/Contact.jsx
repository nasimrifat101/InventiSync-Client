const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto h-[200px] lg:h-[500px] grid lg:grid-cols-2">
      <div className="p-3 lg:p-0">
        <h1 className="text-5xl lg:text-9xl font-bold text-green-200 mt-10">
          What Are You <span className="cursor-not-allowed ">Waitiiiiing</span>{" "}
          For?
        </h1>
      </div>
     <div className="hidden lg:block">
     <div className="flex justify-end mt-14">
      <iframe src="https://giphy.com/embed/26BRF6v9duKz62OME" className="w-[446px] h-[480px]"></iframe>

      </div>
     </div>
    </div>
  );
};

export default Contact;
