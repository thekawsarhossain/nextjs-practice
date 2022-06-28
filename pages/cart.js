import React from "react";
import Cart from "../components/Cart";
import authCheck from "../hooks/authCheck";

const cart = () => {
  return (
    <div>
      <Cart />
    </div>
  );
};

export default authCheck(cart);
