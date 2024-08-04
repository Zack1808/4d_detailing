import "../css/components/Header.css";

const Header = ({ title = "Title" }) => {
  return (
    <div className="header-container">
      <div className="header-content">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Header;
