import {RouteObject} from "react-router-dom";
import SamplePage from "../sample";
import Login from "../pages/login";
import FormLayout from "../components/layout/formlayout";
import Register from "../pages/register";
import EditProfile from "../pages/editprofile";
import ProtectedRoute from "./protectedroute.tsx";
import NewChannel from "../pages/newchannel";
import Chat from "../pages/chat";

export const router: RouteObject[] = [
    {
        element: <SamplePage/>
        , path: "/sample",
    },
    {
        element: <FormLayout><Login/></FormLayout>
        , path: "/login",
    },
    {
        element: <FormLayout><Register/></FormLayout>
        , path: "/register",
    },
    {
        element: <ProtectedRoute target={"/login"}><FormLayout><EditProfile/></FormLayout></ProtectedRoute>
        , path: "/edit-profile",
    },
    {
        element: <ProtectedRoute target={"/login"}><FormLayout><NewChannel/></FormLayout></ProtectedRoute>
        , path: "/new-channel",
    },
    {
        element: <ProtectedRoute target={"/login"}><Chat/></ProtectedRoute>
        , path: "/",
    },
];

