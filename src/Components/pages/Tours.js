import React from "react";
import Button from "../Button";
import classes from './Tours.module.css'
const Tours =(prop)=>
{
    return(<React.Fragment>
        <div className={classes.item}>
            <span className={classes.date} >{prop.details.date}</span>
            <span className={classes.place}>{prop.details.location}</span>
            <span className={classes.theater}>{prop.details.theater}</span>
            <Button className={classes['item-button']} >BUY TICKET</Button>
        </div>
    </React.Fragment>)
}

export default Tours