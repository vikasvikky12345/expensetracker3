import React, { useContext } from "react";
import classes from './MusicAlbums.module.css'
import Button from "../Button";
import CartContext from "../Store/cart-context";
import { NavLink } from "react-router-dom";
const MusicAlbums=(prop)=>
{

const cartctx=useContext(CartContext)

const sendToCart=(event)=>
{
  event.preventDefault()
  cartctx.addToCart({...prop.items,quantity:1})
}

const addProductDetailsToCtx=(data)=>{
  cartctx.productDetails(data)
}

    return( <div className={classes.musicContent}>
    <div>
      {/* <NavLink to={{pathname:`/product-details/`, state:{title:prop.items.title, imageUrl:prop.items.imageUrl,price:prop.items.price}}} > */}
      
      <NavLink to='/product-details' onClick={()=>addProductDetailsToCtx(prop.items)}  >
      <h3>{prop.items.title}</h3>
      <div className= {classes.imageContainer} >
        <img className= {classes.images} src={prop.items.imageUrl} alt="Music Album"></img>
      </div>
      </NavLink>
      <div className=  {classes.prodDetails}>
        <span>$
        <span>{prop.items.price}</span>
       
        </span>
        <Button onClick={sendToCart} className={classes.addButton}>ADD TO CART</Button>
        
      </div>
      
    </div>
  </div>)
}

export default MusicAlbums