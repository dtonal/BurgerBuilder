import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => {

    const controlElements = controls.map((key, index)=>{
       return <BuildControl label={key.label} key={key.label+index}/>
    });

    return(
    <div className={classes.Control}>
        {controlElements}
    </div>
    );
}

export default buildControls;