import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom'
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
    let summary = <Redirect to='/' />
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
      summary = (
        <div>
            {purchasedRedirect}
            <Summary checkoutCancel={this.checkoutCancelHandler} checkoutContinue={this.checkoutContinueHandler} ingredients={this.props.ingredients} />
            <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);