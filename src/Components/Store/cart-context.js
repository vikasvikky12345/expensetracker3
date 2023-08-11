import React from "react"

const CartContext = React.createContext({
items:[],
addToCart:()=>{}
})

export default CartContext