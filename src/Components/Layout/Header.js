import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
// import { useState } from "react";
import CartContext from "./Store/cart-context";

const Header = (prop) => {
  const [onShow, setOnShow] = useState(false);
  const cartctx=useContext(CartContext)
  const cartHandler = () => {
    prop.openCart();
    cartctx.switchCartonClick()
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname==='/store') {
      setOnShow(true);
      console.log("cart on");
    } else {
      setOnShow(false);
      console.log("cart off");
    }
  }, [location]);

  const logoutHandler=()=>
  {
    cartctx.removingToken()
  }


  return (
    <React.Fragment>
      <header className={classes.header}>
        <NavLink activeClassName={classes.active} to="/" exact>
          HOME
        </NavLink>
       <NavLink activeClassName={classes.active} to="/store">
          STORE
        </NavLink>
        <NavLink activeClassName={classes.active} to="/about">
          ABOUT
        </NavLink>
        {!cartctx.userIsLogin && <NavLink activeClassName={classes.active} to='/auth'>LOGIN</NavLink>}
        <NavLink activeClassName={classes.active} to="/contact">
          Contact
        </NavLink>
        {onShow && <HeaderCartButton onClick={cartHandler}></HeaderCartButton>}
       { cartctx.userIsLogin && <button onClick={logoutHandler} className={classes.logoutButton} >Logout</button>}
      </header>
      <div className={classes.heading}>
        <h1>The Generics</h1>
      </div>
      {/* <section className={classes.music}>
            <h2>Music</h2>
        </section> */}
    </React.Fragment>
  );
};

export default Header;