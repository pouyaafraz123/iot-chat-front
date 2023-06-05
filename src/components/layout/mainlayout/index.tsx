import classes from "./styles.module.scss";
import React, { useState } from "react";
import SideBar from "../../common/sidebar";

interface IMainLayout {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className={classes.MainLayout}>
      <SideBar open={openSideBar} close={() => setOpenSideBar(!openSideBar)} />
      {children}
    </div>
  );
};

export default MainLayout;
