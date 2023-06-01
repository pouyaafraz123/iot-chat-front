import classes from "./styles.module.scss";
import BackDrop from "../backdrop/index.tsx";
import React from "react";
import clsx from "clsx";
import {HambergerMenu, MessageAdd1, Messages2, UserEdit} from "iconsax-react";
import {Link, NavLink} from "react-router-dom";


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
                <div onClick={close} className={classes.SideBar__SideBarLogo}>
                    <HambergerMenu size="32" color="#FF8A65"/>
                </div>
                <div
                    className={clsx([classes.SideBar__SideBarContent, "d-flex justify-content-end align-items-start flex-column mt-3"])}>
                    <NavLink to={"/messages"} className={classes.SideBar__SideBarContent__Option}>
                        <Messages2 size="32" color="#FF8A65"/>
                        <span className={classes.SideBar__SideBarContent__Option__Label}>All Messages</span>
                    </NavLink>
                    <NavLink to={"/edit-profile"} className={classes.SideBar__SideBarContent__Option}>
                        <UserEdit size="32" color="#FF8A65"/>
                        <span className={classes.SideBar__SideBarContent__Option__Label}>Edit Profile</span>
                    </NavLink>
                    <NavLink to={"/create-channel"} className={classes.SideBar__SideBarContent__Option}>
                        <MessageAdd1 size="32" color="#FF8A65"/>
                        <span className={classes.SideBar__SideBarContent__Option__Label}>Create Channel</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default SideBar;