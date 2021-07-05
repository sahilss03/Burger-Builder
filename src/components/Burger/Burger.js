import React from 'react' 
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
 import classes from './Burger.css'
const Burger=(props)=>
{
    //they are actually two loops
    //first Object Keys makes an arary of all the keys of the object ingredients{[salad,bacon,..]}
    //then using Array i run another loop of size props.ingredients[igKey] which is the value of the keys
    //salad:1 etc
    //there igkeys contains string of salad,bacon etc
    //and ind contains the ind of the Array 
    const transformedIngredients=Object.keys(props.ingredients).map(igKey=>{
        return[...Array(props.ingredients[igKey])].map((_,ind)=>{
            return <BurgerIngredient
                key={igKey+ind}
                type={igKey}
            />
        });
    })
    return(
        <div className={classes.Burger}>
            <BurgerIngredient
                type="bread-top"
            />
            {transformedIngredients}
            <BurgerIngredient
                type="bread-bottom"
            />
        </div>
    );
}
export default Burger;