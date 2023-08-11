import React, { useContext } from "react";
import  "./AvailableMusicAlbums.css";

import MusicAlbums from "./MusicAlbums";
import CartContext from "../Store/cart-context";
import Loading from "../UI/Loading";
const AvailableMusicAlbums = (prop) => {

  const productsArr = [
    {
      title: "Colors",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },

    {
      title: "Black and white Colors",

      price: 50,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },

    {
      title: "Yellow and Black Colors",

      price: 70,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },

    {
      title: "Blue Color",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

const cartctx=useContext(CartContext)

  return (<React.Fragment>
    <main  className="music-content">
       <section className='music container'>
            <h2>Music</h2>
        </section>
   { cartctx.validatingAddCart && productsArr.map((item) => {
      return <MusicAlbums key={item.title} items={item}></MusicAlbums>;
    })}
  
  </main>
  {! cartctx.validatingAddCart &&<Loading>Adding...</Loading>}
  </React.Fragment>
  );

  // return(<div className={classes.album}>
  //     <div>{prop.items.title}</div>
  //     <img src={prop.items.imageUrl} alt="Music Albums"></img>
  //     <div>{prop.items.price}</div>
  // </div>)
};

export default AvailableMusicAlbums;