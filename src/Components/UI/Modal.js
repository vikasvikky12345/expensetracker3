import React from "react";
import "./Modal.css"
import ReactDOM from "react-dom"
const Modal =(prop)=>
{

    const ModalOverlay=(prop)=>
    {
        return(
            <div className="cart">
                <div>{prop.children}</div>
            </div>
        )
    }


    return(<React.Fragment>
        {ReactDOM.createPortal(<ModalOverlay>{prop.children}</ModalOverlay>,document.getElementById('modal-root'))}
    </React.Fragment>)
}

export default Modal;