import classes from "./styles.module.scss";
import Input from "../../components/core/input";
import React, {useEffect, useState} from "react";
import Button from "../../components/core/button";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const { mutate } = useMutation(login);

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (localStorage.getItem("access") === "true") {
            navigate("/", {replace: true})
        }
    }, [])
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!event.currentTarget.checkValidity()) {
            event.preventDefault();
        } else {
            mutate({ username: inputs.username, password: inputs.password });
            // localStorage.setItem("access", "true");
            // navigate('/', {replace: true})
        }
    };
    return (
        <div className="container">
            <div className={classes.Login}>
                <h1 className="pb-5 text-white text-center">Login</h1>
                <form onSubmit={handleSubmit} noValidate className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-12">
                        <Input label={"Username"}
                               placeHolder={"Enter your Username ..."}
                               name={"username"} id={"username"} type={"text"}
                               value={inputs.username} handleChange={handleChange} status={''} required/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <Input label={"Password"} placeHolder={"Enter your Password ..."} name={"password"}
                               id={"password"}
                               type={"password"} value={inputs.password} handleChange={handleChange} status={''}
                               required/>
                    </div>
                    <div className="col-lg-4 col-md-8 col-12">
                        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
                        <Button title={"Login"} action={() => {
                        }} type={"submit"} color={"success"}/>
                        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
                        <Button title={"Create Account"} action={() => {
                            navigate("../register")
                        }} type={"submit"} color={"warning"}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
