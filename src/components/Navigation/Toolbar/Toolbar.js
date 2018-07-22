import React from "react";

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import Items from '../Items/Items'
import Toggler from '../Toggler/Toggler'

const toolbar = props => (
  <header className={classes.Toolbar}>
    <Toggler open={props.open}/>
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <Items />
    </nav>
  </header>
);

export default toolbar;
