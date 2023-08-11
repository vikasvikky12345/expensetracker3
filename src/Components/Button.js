import React from "react";
import classes from './Button.module.css'
const Button =(prop)=>
{
    return(<React.Fragment>
        <button className={`${classes.button1} ${prop.className}`} type={prop.type || "button"} onClick={prop.onClick}>{prop.children}</button>
        </React.Fragment>)
}

export default Button