import React from "react";
import useHelmet from "../hooks/useHelmet";

const HomePage = () => {
  useHelmet("App - Home");
  return <div>HomePage</div>;
};

export default HomePage;
