import React from "react";

import classes from './Burger.css'
import Ingredient from './Ingredient/Ingredient'

const burger = props => {
    
    const ingredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])]
                .map( (_, i) => {
                    return <Ingredient key={ingredient + i} type={ingredient} />
                })
        })

    return <div className={classes.Burger}>
        <Ingredient type="bread-top" />
        {ingredients}
        <Ingredient type="bread-bottom" />
      </div>;
};

export default burger;
