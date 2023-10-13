import React from "react";
import Product from "./Product";
import ProdDescription from "./ProdDescription";
import RelatedProducts from "./RelatedProducts";
import { useLocation } from "react-router-dom";

const ProdDesc = () => {
  const location = useLocation();
  return (
    <>
      <Product state={location?.state} />
      <ProdDescription state={location?.state} />
      <RelatedProducts state={location?.state} />
    </>
  );
};

export default ProdDesc;
