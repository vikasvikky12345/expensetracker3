import React, { useContext } from "react";
import Modal from "../UI/Modal";
import "./Cart.css";
import Button from "../Button";
import CartContext from "../Store/cart-context";
const Cart = (prop) => {



const cartctx=useContext(CartContext)

const netAmount=cartctx.totalAmount

  const decreasingQuantity=(title)=>
  {
    cartctx.removeItem(title)
  }

  const cartItems = (
    <ul className="cart-items">
      {cartctx.items.map((item) => {
        return (
          <li key={item.title}>
            <img src={item.imageUrl} alt="ItemImage"></img>
            <span>
              Title : <div>{item.title}</div>
            </span>
            <span>
              QUANTITY : <div>{item.quantity}</div>
              <Button onClick={decreasingQuantity.bind(this, item.title)}>
                REMOVE ITEMS
              </Button>
            </span>
            <span>
              Price : <div>{item.price}</div>
            </span>
          </li>
        );
      })}
    </ul>
  );

  const closeCartHandler = () => {
    prop.closeCart();
  };

  return (
    <Modal>
      <Button className={"cancel-button"} onClick={closeCartHandler}>
        X
      </Button>
      <main>{cartItems}</main>
      <div className='total'>
          <span>Total Amount</span>
          <span>{`$${netAmount}`}</span>
        </div>
    </Modal>
  );
};

export default Cart;