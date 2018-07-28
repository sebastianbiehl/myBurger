import React, { Component } from "react"

import classes from './Modal.css'
import Wrap from "../../../hoc/Wrap/Wrap";
import Backdrop from "../Backdrop/Backdrop";

class modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        return(
            <Wrap>
                <Backdrop clicked={this.props.modalClosed} show={this.props.show} />
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }} >
                    {this.props.children}
                </div>
            </Wrap>
        )
    }
}

export default modal
