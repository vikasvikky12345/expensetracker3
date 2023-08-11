import React, { useRef } from "react";
import classes from "./ContactForm.module.css";
import Button from "../../Button";
const ContactForm = () => {
  const enteredName = useRef();
  const enteredMail = useRef();
  const enteredNumber = useRef();

  const submitFormHandler = async () => {
    let obj = {
      name: enteredName.current.value,
      mail: enteredMail.current.value,
      number: enteredNumber.current.value,
    };

    if(obj.name.trim().length===0 || obj.mail.trim().length===0 || obj.number.trim().length===0)
    {
        alert('fill all required fields')
    }


    else{
        let res = await fetch(
            "https://react-http-90afb-default-rtdb.firebaseio.com/contact-details.json",
            {
              method: "POST",
              body: JSON.stringify(obj),
              headers: {
                "Context-Type": "application/json",
              },
            }
          );

          console.log(res);
    }
   

    
    enteredName.current.value = "";
    enteredMail.current.value = "";
    enteredNumber.current.value = "";
  };

  return (
    <React.Fragment>
      <section className={classes.form}>
        <h2>Submit Your Details</h2>
        <label htmlFor="name">Name</label>
        <input  ref={enteredName} type="text" id="name" required></input>
        <label htmlFor="mail">EMail ID</label>
        <input ref={enteredMail} type="email" id="mail" required></input>
        <label htmlFor="phone">Phone Number</label>
        <input ref={enteredNumber} type="number" id="phone"required></input>
        <Button onClick={submitFormHandler} className={classes.buttonSub}>
          Submit
        </Button>
      </section>
    </React.Fragment>
  );
};
export default ContactForm;