import React from "react";
import "./Loading.css";

export const AppLoader = () => {
  return (
    <section className="app-loader">
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};
export default AppLoader;
