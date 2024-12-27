import React, { useEffect } from "react";

import "../css/components/Loading.css";

const Loading = ({ loading, setLoading }) => {
  useEffect(() => {
    return () => {
      setLoading && setLoading(false);
      setTimeout(() => {
        document.documentElement.style.setProperty(
          "--transition-delay",
          `${0}s`
        );
      }, 3300);
    };
  }, []);

  return (
    <div className={`loading ${!loading ? "loading-done" : ""}`}>
      <div className="loading-container">
        <div className="loading-logo" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
