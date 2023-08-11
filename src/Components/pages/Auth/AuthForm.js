import React,{useState , useRef, useContext} from "react";
import classes from './AuthForm.module.css'
import Button from "../../Button";
import CartContext from "../../Store/cart-context";
import { useHistory } from "react-router-dom";
const AuthForm =()=>
{

    const [isLogin,setIslogin]=useState(true)
    const[sendingRqst,setSendingRqst]=useState(false)
    const enteredMailRef=useRef();
    const enteredPasswordRef=useRef();
    const cartctx=useContext(CartContext)
    const history=useHistory()
    const switchAuthHandler=(event)=>
    {
        event.preventDefault()
        setIslogin(!isLogin)
        
    }

    const submitHandler=async()=>
    {
       
        const enteredMail=enteredMailRef.current.value;
        const enteredPass=enteredPasswordRef.current.value
        setSendingRqst(true)
        if(isLogin)
        {
            let res= await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",{
                method:"POST",
                body:JSON.stringify({
                    email:enteredMail,
                    password:enteredPass,
                    returnSecureToken:true
                }),
                headers:{"Content-Type": "application/json"}
            })
            try{
                if(res.ok)
                {
                    
                    cartctx.getEmailId(enteredMail)
                    let data=await res.json()
                    cartctx.addingToken(data.idToken)
                    history.replace('/store')
                    console.log(data)
                }
                else{
                    let data=await res.json()
                    throw Error(data.error.message)
                }
            }
            catch(err)
            {
                alert(err)
            }
        }
        else{
            let res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY',{
                method:'POST',
                body:JSON.stringify({
                    email:enteredMail,
                    password:enteredPass,
                    returnSecureToken:true
                }),
                headers:{"Content-Type": "application/json"}
            })

            try{
                if(res.ok)
                {
                    setIslogin(!isLogin)
                }
                else{
                    let data=await res.json()
                    throw Error(data.error.message)
                }
            }
            catch(err)
            {
                alert(err)
            }
        }
        enteredMailRef.current.value='';
        enteredPasswordRef.current.value='';
        setSendingRqst(false);
    }



    return(<React.Fragment>
        <form className={classes.form}>
            <h2>{ isLogin? "Login" :"Sign Up" }</h2>
            <label htmlFor="mail">EMail</label>
            <input ref={enteredMailRef} type='email' id="mail"></input>
            <label htmlFor="pass">Password</label>
            <input ref={enteredPasswordRef} type='password' id="pass"></input>
            {!sendingRqst && <Button onClick={submitHandler} className={classes.button}>{ isLogin? "Login" : "SignUp"}</Button>}
            {sendingRqst && <h3>Sending request...</h3>}
            <button onClick={switchAuthHandler} className={classes.toggleButton}>{isLogin?" Create new account" : "Login to existing acccount"}</button>
        </form>
    </React.Fragment>)
}

export default AuthForm