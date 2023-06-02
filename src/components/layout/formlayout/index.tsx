import classes from "./styles.module.scss";
import React from "react";
import clsx from "clsx";
import { useAuth } from "../../../hooks/useAuth.tsx";

interface IFormLayout {
  children: React.ReactNode;
}

const FormLayout = ({children}: IFormLayout) => {
  const {isLoggedIn} = useAuth();
    return (
        isLoggedIn ?
            <div className={classes.FormLayout}>{children}</div>
            :
            <div className="container">
                <div className={clsx([classes.FormLayout, classes.Custom])}>{children}</div>
            </div>
    )
}

export default FormLayout;
