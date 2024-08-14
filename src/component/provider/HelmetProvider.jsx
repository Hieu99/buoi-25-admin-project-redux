import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const HelmetProvider = (props) => {
  const { title } = useSelector((store) => store.helmet);
  return (
    <>
      <Helmet title={title} />
      {props.children}
    </>
  );
};

export default HelmetProvider;
