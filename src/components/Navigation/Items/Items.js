import React from "react";

import classes from './Items.css'
import Item from "./Item/Item";

const items = props => (
  <ul className={classes.Items}>
    <Item link='/'>Burger Builder</Item>
    <Item link='/orders/'>Orders</Item>
  </ul>
);

export default items;
