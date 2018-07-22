import React from "react"

import classes from './Modal.css'
import Wrap from '../../../hoc/Wrap'
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
    <Wrap>
        <Backdrop clicked={props.modalClosed} show={props.show}/>
        <div className={classes.Modal} style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }} >
            {props.children}
        </div>
    </Wrap>
    
)

export default modal
