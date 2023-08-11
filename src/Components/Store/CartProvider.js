import React, { useState, useEffect } from "react";
import CartContext from "./cart-context";
import axios from "axios";
const ContextProvider = (prop) => {
  const [cartItem, setCartItem] = useState([]);
  const [getProductDetails, setProductDetails] = useState("");
  const [emailID, setEmailID] = useState();
  const [switchCart, setSwitchCart] = useState(false);
  const [validateAddToCart, setValidateAddToCart] = useState(true);

  let userMailFinal;
  if (emailID) {
    localStorage.setItem("email", JSON.stringify(emailID));
    console.log("setting");
  }
  let getStoreMail = localStorage.getItem("email");
  if (getStoreMail) {
    let getMail = JSON.parse(getStoreMail);
    let userMail_ = getMail.replace(".", "");
    userMailFinal = userMail_.replace("@", "");
  }

  console.log(userMailFinal);

  useEffect(() => {
    console.log(userMailFinal);

    const onLoad = async () => {
      const res = await axios.get(
        `https://crudcrud.com/api/c97a8f42cbfa4cff9994c881d8f55497/${userMailFinal}`
      );

      try {
        let getData = res.data;
        console.log(getData);
        setCartItem(getData);
      } catch (err) {
        console.log(err);
      }
    };

    onLoad();
  }, [switchCart,userMailFinal]);

  let storedToken = localStorage.getItem("idToken");
  const [token, setToken] = useState(storedToken);
  let userLogin = false;

  // console.log(getStoreMail);

  const addToCartHAndler = async (item) => {
    // console.log(userMailFinal);
    try{
    let hasItem = false;
    let cartArr = [...cartItem];
    let objId;
    let objQuantity;
    let objItem;
    setValidateAddToCart(false);
    cartArr.forEach((data, index) => {
      if (data.title === item.title) {
        cartArr[index].quantity = Number(cartArr[index].quantity) + 1;
        hasItem = true;
        // console.log(cartArr[index].id);
        objQuantity = cartArr[index].quantity;
        if (cartArr[index].id) {
          objId = cartArr[index].id;
        }
        if (cartArr[index]._id) {
          objId = cartArr[index]._id;
        }
      }
    });

    

    
    if (hasItem === true) {
      objItem = { ...item, quantity: objQuantity };
      const res = await axios.put(
        `https://crudcrud.com/api/c97a8f42cbfa4cff9994c881d8f55497/${userMailFinal}/${objId}`,
        objItem
      );
      try {
        if (res.statusText === "OK") {
          setCartItem(cartArr);
          setValidateAddToCart(true);
          console.log("PUT REQUEST", res);
        }
      } catch (err) {
        console.log("something went wrong");
        setValidateAddToCart(true);
      }
    } else {
      setValidateAddToCart(false);
      const res = await axios.post(
        `https://crudcrud.com/api/c97a8f42cbfa4cff9994c881d8f55497/${userMailFinal}`,
        item
      );

      console.log("POST", res);
      try {
        if (res.status === 201) {
          let id = res.data._id;
          let item_ = { ...item, id: id };
          setCartItem([...cartItem, item_]);
          setValidateAddToCart(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  catch(err)
  {
    alert(err.message)
    setValidateAddToCart(true);
  }
  };
  // console.log(cartItem);

  const removeCartHandler = async (id) => {
    try{
    let arr = [...cartItem];
    let objId;
    let objQuantity;
    let objItem;
    let item;
    let hasQuantity = false;

    arr.forEach((data, index) => {
      if (data.title === id) {
        arr[index].quantity = Number(arr[index].quantity) - 1;
        item = arr[index];
        if (arr[index].id) {
          objId = arr[index].id;
        } else {
          objId = arr[index]._id;
        }

        console.log(arr[index]);
        objQuantity = arr[index].quantity;

        hasQuantity = true;
      }

      if (arr[index].quantity === 0) {
        arr.splice(index, 1);
        hasQuantity = false;
      }

      console.log(arr);
      setCartItem(arr);
    });

    if (hasQuantity) {
      objItem = {
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: objQuantity,
      };

      console.log(objItem, objId);
      await axios.put(
        `https://crudcrud.com/api/c97a8f42cbfa4cff9994c881d8f55497/${userMailFinal}/${objId}`,
        objItem
      );
    } else {
      await axios.delete(
        `https://crudcrud.com/api/c97a8f42cbfa4cff9994c881d8f55497/${userMailFinal}/${objId}`
      );
    }
  }
  catch(err)
  {
    alert(err.message)
  }
  };

  const amount = cartItem.reduce((netamt, amt) => {
    return netamt + amt.price * amt.quantity;
  }, 0);

  const productDetailsHandler = (data) => {
    // console.log(data);
    setProductDetails(data);
  };

  // console.log(getProductDetails, "getting.....");

  const addingTokenHandler = (tkn) => {
    setToken(tkn);
    localStorage.setItem("idToken", tkn);
  };

  const removingTokenHandler = () => {
    setToken(null);
    localStorage.removeItem("email");
    localStorage.removeItem("idToken");
    setEmailID(null);
  };

  if (token) {
    userLogin = true;
  } else {
    userLogin = false;
  }

  const getEmailIdHandler = (mailID) => {
    setEmailID(mailID);
  };

  console.log(emailID);

  const switchCartonClickHandler = () => {
    setSwitchCart(!switchCart);
  };

  return (
    <CartContext.Provider
      value={{
        items: cartItem,
        totalAmount: amount,
        addToCart: addToCartHAndler,
        removeItem: removeCartHandler,
        productDetails: productDetailsHandler,
        productDetailObj: getProductDetails,
        tokenId: token,
        addingToken: addingTokenHandler,
        removingToken: removingTokenHandler,
        userIsLogin: userLogin,
        getEmailId: getEmailIdHandler,
        userEmail: emailID,
        switchCartonClick: switchCartonClickHandler,
        validatingAddCart: validateAddToCart,
      }}
    >
      {prop.children}
    </CartContext.Provider>
  );
};

export default ContextProvider;