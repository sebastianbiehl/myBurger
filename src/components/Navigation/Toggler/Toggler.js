import React from "react";

import classes from './Toggler.css'

const toggler = props => (
    <div onClick={props.open}>
        <div className={classes.BurgerIcon} />
        <div className={classes.BurgerIcon} />
        <div className={classes.BurgerIcon} />
    </div>
);

export default toggler;
