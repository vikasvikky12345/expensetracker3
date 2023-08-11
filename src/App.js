import React, { useContext, useState, Suspense } from "react";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import Loading from "./Components/UI/Loading";
import CartContext from "./Components/Store/cart-context";
import { Route, Switch, Redirect } from "react-router-dom";

//import AvailableMusicAlbums from "./Components/Music/AvailableMusicAlbums";
//import Cart from "./Components/Cart/Cart";
//import About from "./Components/pages/About";
//import Home from "./Components/pages/Home";
//import Contact from "./Components/pages/Contact.js/Contact";
//import ProductDetails from "./Components/pages/ProductDetails/ProductDetails";
//import AuthForm from "./Components/pages/Auth/AuthForm";

const AuthForm = React.lazy(() => import("./Components/pages/Auth/AuthForm"));
const ProductDetails = React.lazy(() =>
  import("./Components/pages/ProductDetails/ProductDetails")
);
const Contact = React.lazy(() =>
  import("./Components/pages/Contact.js/Contact")
);
const Home = React.lazy(() => import("./Components/pages/Home"));
const About = React.lazy(() => import("./Components/pages/About"));
const Cart = React.lazy(() => import("./Components/Cart/Cart"));
const AvailableMusicAlbums = React.lazy(() =>
  import("./Components/Music/AvailableMusicAlbums")
);

function App(prop) {
  const [initCart, setInitCart] = useState(false);
  const cartctx = useContext(CartContext);
  const openCartHandler = () => {
    setInitCart(true);
  };

  const closeCartButtonHandler = () => {
    setInitCart(false);
  };

  return (
    <React.Fragment>
      <Header openCart={openCartHandler} />
      <Suspense fallback={<Loading>Loading...</Loading>}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/store">
            {initCart && <Cart closeCart={closeCartButtonHandler}></Cart>}
            {cartctx.userIsLogin && <AvailableMusicAlbums />}
            {!cartctx.userIsLogin && <Redirect to="/auth" />}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          {!cartctx.userIsLogin && (
            <Route path="/auth">
              <AuthForm />
            </Route>
          )}
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/product-details">
            {cartctx.userIsLogin && <ProductDetails />}
            {!cartctx.userIsLogin && <Redirect to="/auth" />}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default App;