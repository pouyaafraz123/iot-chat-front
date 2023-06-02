import classes from "./styles.module.scss";
import BackDrop from "../backdrop/index.tsx";
import React from "react";
import clsx from "clsx";
import {
  HambergerMenu,
  Logout,
  MessageAdd1,
  Messages2,
  UserEdit,
} from "iconsax-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.tsx";

interface ISideBar {
  open: boolean;
  close: () => void;
}

const SideBar = ({ open, close }: ISideBar) => {
  const { logout } = useAuth();
  let attachedClasses = [classes.SideBar, classes.Close];
  if (open) {
    attachedClasses = [classes.SideBar, classes.Open];
  }
  return (
    <>
      <BackDrop close={close} show={open} />
      <div className={clsx(attachedClasses)}>
        <div onClick={close} className={classes.SideBar__SideBarLogo}>
          <HambergerMenu size="32" color="#FF8A65" />
        </div>
        <div
          className={clsx([
            classes.SideBar__SideBarContent,
            "d-flex justify-content-end align-items-start flex-column mt-3",
          ])}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <NavLink
            onClick={open ? close : () => {}}
            to={"/messages"}
            className={classes.SideBar__SideBarContent__Option}
          >
            <Messages2 size="32" color="#FF8A65" />
            <span className={classes.SideBar__SideBarContent__Option__Label}>
              All Channels
            </span>
          </NavLink>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <NavLink
            onClick={open ? close : () => {}}
            to={"/edit-profile"}
            className={classes.SideBar__SideBarContent__Option}
          >
            <UserEdit size="32" color="#FF8A65" />
            <span className={classes.SideBar__SideBarContent__Option__Label}>
              Edit Profile
            </span>
          </NavLink>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <NavLink
            onClick={open ? close : () => {}}
            to={"/create-channel"}
            className={classes.SideBar__SideBarContent__Option}
          >
            <MessageAdd1 size="32" color="#FF8A65" />
            <span className={classes.SideBar__SideBarContent__Option__Label}>
              Create Channel
            </span>
          </NavLink>
          <NavLink
            onClick={() => logout()}
            to={"/login"}
            className={classes.SideBar__SideBarContent__Option}
          >
            <Logout size="32" color="#FF8A65" />
            <span className={classes.SideBar__SideBarContent__Option__Label}>
              Logout
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideBar;
