import React from "react";

import Logo from '../../Logo/Logo'
import Items from '../Items/Items'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Wrap from "../../../hoc/Wrap/Wrap";

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return <Wrap>
        <Backdrop clicked={props.closed} show={props.show} />
        <div className={attachedClasses.join(' ')}>
          <Logo height="11%" />
          <nav>
            <Items />
          </nav>
        </div>
      </Wrap>;
}

export default sideDrawer;
