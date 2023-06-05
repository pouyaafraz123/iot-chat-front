import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Input from "../../components/core/input";
import Button from "../../components/core/button";
import Popup from "../../components/common/popup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUser, IUserParam, updateUser } from "../../api/user.ts";
import useProfile from "../../hooks/useProfile.tsx";
import Loader from "../../components/common/loader";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    bio: "",
    displayName: "",
    avatar: "",
    username: "",
    password: "",
  });
  const [status, setStatus] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    bio: "",
    displayName: "",
    avatar: "",
    username: "",
    password: "",
  });

  const client = useQueryClient();

  const profile = useProfile();
  const id = profile?.data?.data?.data?.getCurrentUser?._id;
  const { data, isLoading, isError } = useQuery(
    [getUser.name, id],
    () => getUser(id || ""),
    { enabled: !!id }
  );

  const { mutate, isLoading: isUpdating } = useMutation(
    [updateUser.name, id],
    (data: IUserParam) => updateUser(id || "", data),
    {
      onSuccess: () => {
        client.invalidateQueries();
        toast.success("User updated successfully.");
      },
    }
  );

  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
    [deleteUser.name, id],
    () => deleteUser(id || ""),
    {
      onSuccess: () => {
        client.invalidateQueries();
        toast.success("User deleted successfully.");
      },
    }
  );

  const user = data?.data?.data?.getUser;

  useEffect(() => {
    setInputs({
      age: user?.age?.toString() || "",
      bio: user?.bio || "",
      avatar: user?.avatar || "",
      displayName: user?.displayName || "",
      lastName: user?.lastname || "",
      email: user?.email || "",
      firstName: user?.firstname || "",
      password: user?.password || "",
      phone: user?.phone || "",
      username: user?.username || "",
    });
  }, [user]);

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
      mutate({
        username: inputs.username,
        password: inputs.password,
        displayName: inputs.displayName,
        phone: inputs.phone,
        email: inputs.email,
        avatar: inputs.avatar,
        bio: inputs.bio,
        age: Number(inputs.age),
        lastname: inputs.lastName,
        firstname: inputs.firstName,
      });
    }
  };

  return (
    <div className={classes.EditProfile}>
      <Popup open={openPopup}>
        <div className="row">
          <div className="col-12">
            <h3 className="text-center text-white pb-4">Enter Your Password</h3>
            <Input
              label={""}
              placeHolder={"Enter your Password ..."}
              name={"password"}
              id={"Password"}
              type={"password"}
              value={oldPassword}
              handleChange={(e) => setOldPassword(e.target.value)}
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
                deleteMutate();
                setOpenPopup(false);
              }}
              type={"button"}
              color={"danger"}
            />
          </div>
        </div>
      </Popup>
      <h1 className="pb-5 text-white text-center">Edit Profile</h1>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="row justify-content-center"
      >
        <Loader isError={isError} isLoading={isLoading}>
          <>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"FirstName"}
                placeHolder={"Enter your FirstName ..."}
                name={"firstName"}
                id={"FirstName"}
                type={"text"}
                value={inputs.firstName}
                handleChange={handleChange}
                status={status.firstName}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"LastName"}
                placeHolder={"Enter your LastName ..."}
                name={"lastName"}
                id={"LastName"}
                type={"text"}
                value={inputs.lastName}
                handleChange={handleChange}
                status={status.lastName}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Email"}
                placeHolder={"Enter your Email ..."}
                name={"email"}
                id={"Email"}
                type={"email"}
                value={inputs.email}
                handleChange={handleChange}
                status={status.email}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Phone"}
                placeHolder={"Enter your Phone ..."}
                name={"phone"}
                id={"Phone"}
                type={"tel"}
                value={inputs.phone}
                handleChange={handleChange}
                status={status.phone}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Age"}
                min={0}
                placeHolder={"Enter your Age ..."}
                name={"age"}
                id={"Age"}
                type={"number"}
                value={inputs.age}
                handleChange={handleChange}
                status={status.age}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Bio"}
                placeHolder={"Enter your Bio ..."}
                name={"bio"}
                id={"Bio"}
                type={"text"}
                value={inputs.bio}
                handleChange={handleChange}
                status={status.bio}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"DisplayName"}
                placeHolder={"Enter your DisplayName ..."}
                name={"displayName"}
                id={"DisplayName"}
                type={"text"}
                value={inputs.displayName}
                handleChange={handleChange}
                status={status.displayName}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Avatar"}
                placeHolder={"Enter your Avatar ..."}
                name={"avatar"}
                id={"Avatar"}
                type={"url"}
                value={inputs.avatar}
                handleChange={handleChange}
                status={status.avatar}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Username"}
                placeHolder={"Enter your Username ..."}
                name={"username"}
                id={"Username"}
                type={"text"}
                value={inputs.username}
                handleChange={handleChange}
                status={status.username}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <Input
                label={"Password"}
                placeHolder={"Enter your Password ..."}
                name={"password"}
                id={"Password"}
                type={"password"}
                value={inputs.password}
                handleChange={handleChange}
                status={status.password}
                required
              />
            </div>
            <div className="col-lg-4 col-md-8 col-12">
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <Button
                title={"Save Changes"}
                action={() => {
                  // navigate("/")
                }}
                type={"submit"}
                color={"success"}
                isLoading={isUpdating}
              />
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <Button
                title={"Delete Account"}
                action={() => {
                  setOpenPopup(true);
                }}
                isLoading={isDeleting}
                type={"button"}
                color={"danger"}
              />
            </div>
          </>
        </Loader>
      </form>
    </div>
  );
};

export default EditProfile;
