import "../css/components/Button.css";

const Button = ({ children, primary, secondary, className, ...rest }) => {
  return (
    <button
      className={`btn ${primary ? "primary" : ""} ${
        secondary ? "secnodary" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
