import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const control =
[
    {label:'Salad' , type:'salad'},
    {label:'Bacon' , type:'bacon'},
    {label:'Cheese' , type:'cheese'},
    {label:'Meat' , type:'meat'},
];
const buildControls=(props)=>
{
    return(
        <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.Price.toFixed(2)}</strong></p>
            {control.map(arr=>{
                return <BuildControl
                    key={arr.label}
                    label={arr.label}
                    Add={props.Add.bind(this,arr.type)}
                    Remove={props.Remove.bind(this,arr.type)}
                    disabledinfo={props.disabledinfo[arr.type]}
                />
            })}
            <button disabled={!props.Orderable} className={classes.OrderButton} onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>
        </div>
    )
}
export default buildControls;