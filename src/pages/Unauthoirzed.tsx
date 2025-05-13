import React from "react";
import "../index.css";

const Unauthorized: React.FC = () => {
  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Unauthorized</h1>
      <p>You don't have access to this page</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default Unauthorized;
