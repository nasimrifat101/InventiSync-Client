/* eslint-disable react/prop-types */
const DashNavSecond = ({heading, click, text}) => {
  return (
    <div>
      <div className="navbar">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">{heading}</a>
        </div>
        <div className="flex-none">
          <button onClick={click} className="btn bg-base-300">
          {text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashNavSecond;
