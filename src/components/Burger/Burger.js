import React from "react";

import classes from './Burger.css'
import Ingredient from './Ingredient/Ingredient'

const burger = props => {
    
    let ingredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])]
                .map( (_, i) => {
                    return <Ingredient key={ingredient + i} type={ingredient} />
                })
        })
        .reduce((array, element) => {
            return array.concat(element)
        }, [])

        if(ingredients.length === 0) {
            ingredients = <p>Please start adding ingredients!</p>
        }

    return <div className={classes.Burger}>
        <Ingredient type="bread-top" />
        {ingredients}
        <Ingredient type="bread-bottom" />
      </div>;
};

export default burger;