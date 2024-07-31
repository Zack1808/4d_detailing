import "../css/components/Loading.css";

const Loading = ({ className }) => {
  return (
    <div className={`loading-container ${className}`}>
      <div className="loader"></div>
      <h4>Loading...</h4>
    </div>
  );
};

export default Loading;
