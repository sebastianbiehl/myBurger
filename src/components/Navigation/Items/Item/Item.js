import React from "react";
import { NavLink } from 'react-router-dom'

import classes from './Item.css'

const item = props => (
    <li className={classes.Item}>
        <NavLink exact activeClassName={classes.active} to={props.link}>{props.children}</NavLink>
    </li>
)

export default item;
