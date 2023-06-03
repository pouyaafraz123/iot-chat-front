import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Input from "../../components/core/input";
import Button from "../../components/core/button";
import { useMutation } from "@tanstack/react-query";
import { createChannel } from "../../api/channel.ts";
import { toast } from "react-toastify";

const NewChannel = () => {
  const navigate = useNavigate();
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

  const { mutate, isLoading } = useMutation(createChannel);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      mutate(
        {
          name: inputs.channelName,
          image: inputs.image,
          displayName: inputs.displayName,
          description: inputs.description,
        },
        {
          onSuccess: () => {
            toast.success("Channel created successfully");
            navigate("/");
          },
        }
      );
    }
  };
  return (
    <div className={classes.NewChannel}>
      <h1 className="pb-5 text-white text-center">Create Channel</h1>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="row justify-content-center"
      >
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
        <div className="col-lg-4 col-md-8 col-12">
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Button
            title={"Create"}
            action={() => {
              // navigate("/")
            }}
            type={"submit"}
            color={"success"}
            isLoading={isLoading}
          />
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <Button
            title={"Cancel"}
            action={() => {
              navigate("/");
            }}
            type={"button"}
            color={"warning"}
          />
        </div>
      </form>
    </div>
  );
};

export default NewChannel;
