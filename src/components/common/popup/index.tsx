import classes from "./styles.module.scss"
import React from "react";

interface IPopup {
    children: React.ReactNode;
    open: boolean
}

const Popup = ({children, open}: IPopup) => {
    return (
        open ?
            <div className={classes.Popup}>
                <div className="container">
                    <div className={classes.Popup__Panel}>
                        {children}
                    </div>
                </div>
            </div>
            :
            <></>
    )
}

export default Popup