import React, { useContext } from "react";
import "./HeaderCartButton.css"
import CartContext from "../Store/cart-context";

const HeaderCartButton = (prop) => {

  let cartctx=useContext(CartContext);

  const numberOfCartItems=cartctx.items.reduce((itemSum,item)=>
  {
    return(itemSum+item.quantity)
  },0)

  return (<React.Fragment>
    <button  onClick={prop.onClick} className="button">
      <span>Cart</span>
      <span>{numberOfCartItems}</span>
    </button>
    </React.Fragment>
  );
};

export default HeaderCartButton;