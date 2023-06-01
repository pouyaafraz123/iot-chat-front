import React, {HTMLProps, useEffect, useRef, useState} from "react";
import classes from "./styles.module.scss"

interface IInput extends HTMLProps<HTMLInputElement> {
    label?: string
    placeHolder: string
    name: string
    id: string
    type: string
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    status: string
}

const Input = ({label, placeHolder, type, value, handleChange,status, name, id, ...restProps}: IInput) => {
    return (
        <div className={classes.InputGroup}>
            {
                label ? <label className={classes.InputGroup__Label} htmlFor={id}>{label}</label> : null
            }
            <input placeholder={placeHolder} type={type} value={value} onChange={handleChange}
                   name={name} id={id}
                   className={classes.InputGroup__Input} {...restProps} data-status={status}/>
            <span className={classes.InputGroup__Error}>
                {
                    status === "empty" ? "This Field Is Required " : status === "invalid" ?"Enter Valid Data" : ""
                }
            </span>
        </div>
    )
}

export default Input