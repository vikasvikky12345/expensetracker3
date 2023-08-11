import React, { useContext } from "react";
// import { useParams, useLocation } from "react-router-dom";
import classes from "./ProductDetails.module.css";
import CartContext from "../../Store/cart-context";

const ProductDetails = () => {
//   const location = useLocation();
//   const { title, imageUrl, price } = location.state;
  //   let color = false;
  //   let blackAndWhite = false;
//   const params = useParams();
//   console.log(params.productId);


const cartctx=useContext(CartContext)
let product=cartctx.productDetailObj;

console.log(cartctx.productDetailObj)

  const imageObj = [
    { url: "/image/pic1.jpg" },
    { url: "/image/pic2.jpg" },
    { url: "/image/pic3.jpg" },
    { url: "/image/pic4.jpg" },
    { url: "/image/pic5.jpg" },
  ];

  return (
    <React.Fragment>
         <section className={classes.section}>
            <div>
      <h1>{product.title}</h1>
      <img src={product.imageUrl} alt="IMAGES" />
      <span className={classes.price}>PRICE $ {product.price}</span>
      </div>
      <span>
        <h3>Details</h3>
        <p>Have you seen the movie Smoke with Harvey Keitel? His character goes out every morning at the same time and takes a photograph. The photo is from the front of his shop. He then prints the image and stores them in huge photo albums. Another character flips through these images to see all the different scenarios.
        These are easy photo essays to do as you use a simple set up. It might be a challenge to find somewhere accessible to you at the same time every day. The great thing about this photo essay project is that you can create it about anything.</p>
      </span>
</section>
<span>
    <h4 className={classes.similar}>Similar Products</h4>
</span>
<section>
      {imageObj.map((obj) => (
        <img key={Math.random()} className={classes.image} src={obj.url} alt="images" />
      ))}
    </section>
    </React.Fragment>
   
  );
};

export default ProductDetails;