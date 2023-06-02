import classes from "./styles.module.scss"
import ChannelView, {IChannelView} from "../../components/common/channelview";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {Send2} from "iconsax-react";

const Chat = () => {
    const params = useParams();
    const [currentChannel, setCurrentChannel] = useState<IChannelView>();
    const [message, setMessage] = useState("");
    const [channels, setChannels] = useState<IChannelView[]>([
        {
            name: "Test 1",
            id: 1,
            image: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
        },
        {
            name: "Test 2",
            id: 2,
            image: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
        },
        {
            name: "Test 3",
            id: 3,
            image: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
        }
    ]);
    useEffect(() => {
        setCurrentChannel(channels[channels.findIndex(item => item.id === parseInt(params.id ? params.id : '-1'))])
    }, [params.id])
    return (
        <div className={classes.Chat}>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-6">
                    <h3 className="text-start text-white pb-3 border-bottom">Channels</h3>
                    <div className={classes.Chat__ChannelList}>
                        {
                            channels.map((item, index) => {
                                return (
                                    <ChannelView
                                        key={index}
                                        image={item.image}
                                        name={item.name}
                                        id={item.id}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-6">
                    <div className={clsx([classes.Chat__Messsage__Header, "pb-2"])}>
                        <img src={currentChannel?.image} alt="" className={classes.Chat__Messsage__Header__Image}/>
                        <h3 className="text-start text-white">{currentChannel?.name}</h3>
                    </div>
                    <div className={classes.Chat__Messsage__Body}>
                        <div className={classes.Chat__Messsage__Body__MessageBox}></div>
                        <div className={classes.Chat__Messsage__Body__InputBox}>
                            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text"
                                   name="message" id="message"
                                   className={classes.Chat__Messsage__Body__InputBox__Input}
                                   placeholder={"Type message ..."}/>
                            <div className={classes.Chat__Messsage__Body__InputBox__Send}>
                                <Send2
                                    size="24"
                                    color="#697689"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat