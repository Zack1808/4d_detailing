import React, { useEffect } from "react";

import "../css/components/Loading.css";

const Loading = ({ loading, setLoading }) => {
  useEffect(() => {
    return () => setLoading && setLoading(false);
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
