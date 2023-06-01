import classes from "./styles.module.scss"
import SideBar from "../../components/common/sidebar";
import {useState} from "react";

const Chat = () => {
    const [openSideBar, setOpenSideBar] = useState(true)
    return (
        <div className={classes.Chat}>
            <SideBar open={openSideBar} close={() => setOpenSideBar(false)}/>
        </div>
    )
}

export default Chat