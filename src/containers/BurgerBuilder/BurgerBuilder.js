import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "../../axios-orders";

import Wrap from '../../hoc/Wrap/Wrap'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient]
      })
      .reduce((sum, element) => sum + element, 0)
    
      return sum > 0
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('./checkout')
  }
  
  render () {
    const disabledInfo = {
      ...this.props.ingredients
    }

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let modalContent = null
    let burger = this.props.error ? <p>Ingredients cannot be loaded :/</p> : <Spinner />

    if(this.props.ingredients) {
      burger = (
        <Wrap>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls purchasable={this.updatePurchaseState(this.props.ingredients)} price={this.props.price} ordered={this.purchaseHandler} disabled={disabledInfo}
            ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} />
        </Wrap>
      )
      modalContent = (
        <OrderSummary price={this.props.price} purchaseCancelled={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} ingredients={this.props.ingredients} />
      )
    }

    return (
      <Wrap>
        <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
          {modalContent}
        </Modal>
        {burger}
      </Wrap>  
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    onIngredientAdded: ing => dispatch(actions.addIngredient(ing)), 
    onIngredientRemoved: ing => dispatch(actions.removeIngredient(ing)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))