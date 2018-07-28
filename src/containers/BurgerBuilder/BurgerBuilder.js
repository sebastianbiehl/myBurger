import React, { Component } from 'react'

import Wrap from '../../hoc/Wrap/Wrap'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get("https://myburger-react-app.firebaseio.com/ingredients.json")
        .then(response => {
          this.setState({ingredients: response.data})
        })
        .catch( error => {
          this.setState({error: true})
        })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient]
      })
      .reduce((sum, element) => sum + element, 0)
    
      this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    if(oldCount <= 0) return;
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceAddition
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }
  
  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let modalContent = null
    let burger = this.state.error ? <p>Ingredients cannot be loaded :/</p> : <Spinner />

    if(this.state.ingredients) {
      burger = (
        <Wrap>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls purchasable={this.state.purchasable} price={this.state.totalPrice} ordered={this.purchaseHandler} disabled={disabledInfo}
            ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} />
        </Wrap>
      )
      modalContent = (
        <OrderSummary price={this.state.totalPrice} purchaseCancelled={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} ingredients={this.state.ingredients} />
      )
    }

    if (this.state.loading) {
      modalContent = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios)