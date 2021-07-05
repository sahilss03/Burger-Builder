import React from 'react'
import Classes from './Input.css'
const Input = (props) => {
        let inputElement = null;
        let inputClasses = [Classes.InputElement];
        if (props.Invalid && props.shouldValidate && props.isTouched) {
            inputClasses.push(Classes.Invalid);
        }
        switch (props.elementType) {
            case ('input'):
                //{...props.elementConfig} it will distribute the attributes that are present in the elementConfig right now they are placeholder and type of the input
                inputElement = < input
                className = { inputClasses.join(' ') } {...props.elementConfig }
                value = { props.value }
                onChange = { props.change }
                />
                break;
            case ('testarea'):
                inputElement = < textarea
                className = { inputClasses.join(' ') } {...props.elementConfig }
                value = { props.value }
                onChange = { props.change }
                />
                break;
            case ('select'):
                inputElement = ( <
                    select className = { inputClasses.join(' ') }
                    value = { props.value }
                    onChange = { props.change } >

                    {
                        props.elementConfig.options.map(obj => ( <
                            option key = { obj.value }
                            value = { obj.value } > { obj.displayValue } < /option>
                        ))
                    }

                    <
                    /select>);
                    break;
                    default:
                    inputElement = ( < input className = { inputClasses.join(' ') } {...props.elementConfig }
                        value = { props.value }
                        />)
                    }
                    return ( <
                        div className = { Classes.Input } >
                        <
                        label className = { Classes.Label } > { props.label } < /label> { inputElement } < /
                        div >
                    );
                }
                export
            default Input;