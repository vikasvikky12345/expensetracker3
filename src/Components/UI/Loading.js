import React from "react";
import classes from './Loading.module.css'
const Loading=(prop)=>
{
    return(<p className={classes.para} >{prop.children}</p>)
}

export default Loading