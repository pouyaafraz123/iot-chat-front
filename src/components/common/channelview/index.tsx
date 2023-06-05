import classes from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { Edit, MessageRemove, Profile2User } from "iconsax-react";
import React, { useEffect, useState } from "react";
import Popup from "../popup";
import Input from "../../core/input";
import Button from "../../core/button";
import { useQuery } from "@tanstack/react-query";
import { getChannel, IChannel } from "../../../api/channel.ts";
import Loader from "../loader";
import { BeatLoader } from "react-spinners";

export interface IChannelView {
  image: string;
  name: string;
  id: string;
}

const ChannelView = ({ image, name, id }: IChannelView) => {
  const [inputs, setInputs] = useState({
    channelName: "",
    description: "",
    displayName: "",
    image: "",
  });
  const [status, setStatus] = useState({
    channelName: "",
    description: "",
    displayName: "",
    image: "",
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [popupElement, setPopupElement] = useState<JSX.Element>(<></>);
  const [newUserID, setNewUserID] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    value === ""
      ? setStatus((prevInputs) => ({
          ...prevInputs,
          [name]: "",
        }))
      : null;
  };
  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.preventDefault();
    } else {
      // Rest Action
    }
  };
  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.preventDefault();
    } else {
      // Rest Action
    }
  };
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let isValid = true;
    for (let i = 0; i < form.elements.length; i++) {
      const input = form.elements[i] as HTMLInputElement;
      const { name } = input;

      if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false;
        setStatus((prevInputs) => ({
          ...prevInputs,
          [name]: "empty",
        }));
      } else if (!input.checkValidity()) {
        isValid = false;
        setStatus((prevInputs) => ({
          ...prevInputs,
          [name]: "invalid",
        }));
      } else {
        isValid = true;
        setStatus((prevInputs) => ({
          ...prevInputs,
          [name]: "valid",
        }));
      }
    }

    if (isValid) {
      console.log("Hello");
    }
  };

  function RenderPopup(
    channel: IChannel | undefined,
    action: "add" | "delete" | "edit"
  ) {
    console.log(inputs);
    if (action === "add") {
      setPopupElement(
        <form onSubmit={handleAdd} noValidate className="row">
          <div className="col-12">
            <h3 className="text-center text-white pb-4">New User ID</h3>
            <Input
              label={""}
              placeHolder={"Enter ID ..."}
              name={"newUserID"}
              id={"newUserID"}
              type={"newUserID"}
              value={newUserID}
              handleChange={(e) => setNewUserID(e.target.value)}
              status={""}
              required
            />
          </div>
          <div className="col-lg-6 col-12">
            <Button
              title={"Cancel"}
              action={() => {
                setOpenPopup(false);
              }}
              type={"button"}
              color={"warning"}
            />
          </div>
          <div className="col-lg-6 col-12">
            <Button
              title={"Add User"}
              action={() => {
                setOpenPopup(false);
              }}
              type={"submit"}
              color={"success"}
            />
          </div>
        </form>
      );
    } else if (action === "delete") {
      setPopupElement(
        <form onSubmit={handleDelete} noValidate className="row">
          <div className="col-12">
            <h3 className="text-center text-white pb-4">Enter Your Password</h3>
            <Input
              label={""}
              placeHolder={"Enter your Password ..."}
              name={"password"}
              id={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              status={""}
              required
            />
          </div>
          <div className="col-lg-6 col-12">
            <Button
              title={"Cancel"}
              action={() => {
                setOpenPopup(false);
              }}
              type={"button"}
              color={"warning"}
            />
          </div>
          <div className="col-lg-6 col-12">
            <Button
              title={"Delete Forever (This action can't be undo !"}
              action={() => {
                setOpenPopup(false);
              }}
              type={"submit"}
              color={"danger"}
            />
          </div>
        </form>
      );
    } else {
      setPopupElement(
        <form
          onSubmit={handleEdit}
          noValidate
          className="row justify-content-center"
        >
          <Loader isError={isError} isLoading={isLoading}>
            <h3 className="text-center text-white pb-4">Edit Channel</h3>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Channel Name"}
                placeHolder={"Enter your Channel Name ..."}
                name={"channelName"}
                id={"channelName"}
                type={"text"}
                value={inputs.channelName}
                handleChange={handleChange}
                status={status.channelName}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Channel Description"}
                placeHolder={"Enter your Channel Description ..."}
                name={"description"}
                id={"description"}
                type={"text"}
                value={inputs.description}
                handleChange={handleChange}
                status={status.description}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Channel Display Name"}
                placeHolder={"Enter your Channel Display Name ..."}
                name={"displayName"}
                id={"displayName"}
                type={"displayName"}
                value={inputs.displayName}
                handleChange={handleChange}
                status={status.displayName}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Channel Image"}
                placeHolder={"Enter your Channel Image ..."}
                name={"image"}
                id={"image"}
                type={"url"}
                value={inputs.image}
                handleChange={handleChange}
                status={status.image}
                required
              />
            </div>
            <div className="col-lg-6 col-12">
              <Button
                title={"Cancel"}
                action={() => {
                  setOpenPopup(false);
                }}
                type={"button"}
                color={"warning"}
              />
            </div>
            <div className="col-lg-6 col-12">
              <Button
                title={"Edit"}
                action={() => {
                  setOpenPopup(false);
                }}
                type={"submit"}
                color={"success"}
              />
            </div>
          </Loader>
        </form>
      );
    }
    setOpenPopup(true);
  }

  const { data, isLoading, isError } = useQuery(
    [getChannel.name, id],
    () => getChannel(id),
    { keepPreviousData: true }
  );
  const channel = data?.data?.data?.getChannel;

  useEffect(() => {
    setInputs({
      channelName: channel?.name || "",
      displayName: channel?.displayName || "",
      image: channel?.image || "",
      description: channel?.description || "",
    });
  }, [channel]);

  return (
    <>
      <Popup open={openPopup}>{popupElement}</Popup>
      <NavLink to={`/messages/${id}`} className={classes.ChannelView}>
        <img src={image} alt="" className={classes.ChannelView_Image} />
        <span className={classes.ChannelView__Title}>{name}</span>
        <div className={classes.ChannelView__ActionBox}>
          {isLoading ? (
            <div
              className={
                "w-100 h-100 d-flex justify-content-center align-items-center"
              }
            >
              <BeatLoader loading={true} color={"#00474b"} size={10} />
            </div>
          ) : (
            <>
              <div
                onClick={() => RenderPopup(channel, "add")}
                className={classes.ChannelView__ActionBox__ActionButton}
              >
                <Profile2User size="24" color="#697689" />
              </div>
              <div
                onClick={() => {
                  RenderPopup(channel, "edit");
                }}
                className={classes.ChannelView__ActionBox__ActionButton}
              >
                <Edit size="24" color="#697689" />
              </div>
              <div
                onClick={() => {
                  RenderPopup(channel, "delete");
                }}
                className={classes.ChannelView__ActionBox__ActionButton}
              >
                <MessageRemove size="24" color="#697689" />
              </div>
            </>
          )}
        </div>
      </NavLink>
    </>
  );
};

export default ChannelView;
