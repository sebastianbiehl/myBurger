import React from "react";

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import Items from '../Items/Items'
import Toggler from '../Toggler/Toggler'

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.Toggler}>
        <Toggler open={props.open} />
    </div>
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <Items />
    </nav>
  </header>
);

export default toolbar;
