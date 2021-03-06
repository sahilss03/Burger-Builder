import React from 'react'
import classes from './BuildControl.css'
const buildControl=(props)=>
{
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button disabled={props.disabledinfo} onClick={props.Remove} className={classes.Less}>Less</button>
            <button onClick={props.Add} className={classes.More}>More</button>
        </div>
    );
}
export default buildControl;