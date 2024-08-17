import "../css/components/Loading.css";

const Loading = ({ className }) => {
  return (
    <div className={`loading-container ${className}`}>
      <img src="/logo-transition.webp" alt="Logo" />
      <h4>Loading...</h4>
    </div>
  );
};

export default Loading;
