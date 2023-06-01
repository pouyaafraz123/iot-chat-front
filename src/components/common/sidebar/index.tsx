import classes from "./styles.module.scss";
import BackDrop from "../backdrop/index.tsx";
import React from "react";
import clsx from "clsx";

interface ISideBar {
    open: boolean;
    close: () => void;
}

const SideBar = ({open, close}: ISideBar) => {
    let attachedClasses = [classes.SideBar, classes.Close];
    if (open) {
        attachedClasses = [classes.SideBar, classes.Open];
    }
    return (
        <>
            <BackDrop close={close} show={open}/>
            <div className={clsx(attachedClasses)}>
                <div className={classes.SideDraw__SideDrawLogo}>
                    {/*<Link className="mx-auto" to="/">*/}
                    {/*    <img src={require("../../assets/images/Logo.png")} alt="Logo" className="img-fluid Logo"/>*/}
                    {/*</Link>*/}
                </div>
                <div
                    className={clsx([classes.SideDraw__SideDrawContent, "d-flex justify-content-end align-items-start flex-column mt-3"])}>

                </div>
            </div>
        </>
    );
}

export default SideBar;