import React, { Component } from "react";
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Summary from '../../components/Order/Summary/Summary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return <div>
        <Summary checkoutCancel={this.checkoutCancelHandler} checkoutContinue={this.checkoutContinueHandler} ingredients={this.props.ingredients} />
        <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);