import { useState, useEffect } from "react";

const Preloader = () => {
  const words = ["Welcome", "To", "InventiSync"];
  const [visibleWordIndex, setVisibleWordIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleWordIndex((prevIndex) => prevIndex + 1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [visibleWordIndex]);

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-6xl">
            <h1 className="text-5xl font-bold">
              {words.slice(0, visibleWordIndex).map((word, index) => (
                <span key={index}>
                  {index > 0 && " "}
                  {word}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
