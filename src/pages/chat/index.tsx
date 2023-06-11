import classes from "./styles.module.scss";
import ChannelView from "../../components/common/channelview";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {Send2} from "iconsax-react";
import {getUserChannels, IChannel} from "../../api/channel.ts";
import Loader from "../../components/common/loader";
import {useQuery} from "@tanstack/react-query";
import useProfile from "../../hooks/useProfile.tsx";
import Message from "../../components/common/message";

const Chat = () => {
    const params = useParams<{ id: string }>();
    const [currentChannel, setCurrentChannel] = useState<IChannel>();
    const [message, setMessage] = useState("");
    const profile = useProfile();
    const id = profile?.data?.data?.data?.getCurrentUser?._id;
    const {data, isLoading, isError} = useQuery(
        [getUserChannels.name, id],
        () => getUserChannels(id || ""),
        {enabled: !!id}
    );
    const channels = data?.data?.data?.getUserChannels || [];

    useEffect(() => {
        setCurrentChannel(
            channels[channels.findIndex((item) => item?._id === params?.id)]
        );
    }, [params.id]);
    return (
        <div className={classes.Chat}>
            <Loader isLoading={isLoading} isError={isError}>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-6">
                        <h3 className="text-start text-white pb-3 border-bottom">
                            Channels
                        </h3>
                        <div className={classes.Chat__ChannelList}>
                            {channels.map((item, index) => {
                                return (
                                    <ChannelView
                                        key={index}
                                        image={item?.image || ""}
                                        name={item?.name || ""}
                                        id={item?._id || ""}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-6">
                        <div className={clsx([classes.Chat__Messsage__Header, "pb-2"])}>
                            <img
                                src={currentChannel?.image}
                                alt=""
                                className={classes.Chat__Messsage__Header__Image}
                            />
                            <h3 className="text-start text-white">{currentChannel?.name}</h3>
                        </div>
                        <div className={classes.Chat__Messsage__Body}>
                            <div className={classes.Chat__Messsage__Body__MessageBox}>
                                <Message profile={"https://xsgames.co/randomusers/assets/avatars/male/63.jpg"}
                                         name={"Kamyab"} text={"Hiiiiiiiiii"} date={"12:33"} currentUser={false}/>
                                <Message profile={"https://xsgames.co/randomusers/assets/avatars/male/63.jpg"}
                                         name={"Kamyab"} text={"Hiiiiiiiiii"} date={"12:33"} currentUser={false}/>
                                <Message profile={"https://xsgames.co/randomusers/assets/avatars/male/63.jpg"}
                                         name={"Kamyab"} text={"Hiiiiiiiiii"} date={"12:33"} currentUser={false}/>
                                <Message profile={"https://xsgames.co/randomusers/assets/avatars/male/63.jpg"}
                                         name={"Kamyab"} text={"Hiiiiiiiiii"} date={"12:33"} currentUser={true}/>
                                <Message profile={"https://xsgames.co/randomusers/assets/avatars/male/63.jpg"}
                                         name={"Kamyab"} text={"Hiiiiiiiiii"} date={"12:33"} currentUser={true}/>
                                <Message profile={"https://xsgames.co/randomusers/assets/avatars/male/63.jpg"}
                                         name={"Kamyab"} text={"Hiiiiiiiiii"} date={"12:33"} currentUser={true}/>
                                <Message profile={"https://xsgames.co/randomusers/assets/avatars/male/63.jpg"}
                                         name={"Kamyab"} text={"Hiiiiiiiiii"} date={"12:33"} currentUser={false}/>
                                <Message profile={"https://xsgames.co/randomusers/assets/avatars/male/63.jpg"}
                                         name={"Kamyab"} text={"Hiiiiiiiiii"} date={"12:33"} currentUser={true}/>
                            </div>
                            <div className={classes.Chat__Messsage__Body__InputBox}>
                                <input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    type="text"
                                    name="message"
                                    id="message"
                                    className={classes.Chat__Messsage__Body__InputBox__Input}
                                    placeholder={"Type message ..."}
                                />
                                <div className={classes.Chat__Messsage__Body__InputBox__Send}>
                                    <Send2 size="24" color="#697689"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    );
};

export default Chat;
