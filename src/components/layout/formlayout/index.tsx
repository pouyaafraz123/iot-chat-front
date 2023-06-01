import classes from "./styles.module.scss"
import React from "react";

interface IFormLayout {
    children: React.ReactNode
}

const FormLayout = ({children}:IFormLayout) => {
    return (
        <div className="container">
            <div className={classes.FormLayout}>{children}</div>
        </div>
    )
}

export default FormLayout;