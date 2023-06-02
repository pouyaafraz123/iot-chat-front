import {RouteObject} from "react-router-dom";
import SamplePage from "../sample";
import Login from "../pages/login";
import FormLayout from "../components/layout/formlayout";
import Register from "../pages/register";
import EditProfile from "../pages/editprofile";
import ProtectedRoute from "./protectedroute.tsx";
import NewChannel from "../pages/newchannel";
import Chat from "../pages/chat";
import MainLayout from "../components/layout/mainlayout";
import Welcome from "../pages/welcome";

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
        element: <ProtectedRoute
            target={"/login"}><MainLayout><FormLayout><EditProfile/></FormLayout></MainLayout></ProtectedRoute>
        , path: "/edit-profile",
    },
    {
        element: <ProtectedRoute
            target={"/login"}><MainLayout><FormLayout><NewChannel/></FormLayout></MainLayout></ProtectedRoute>
        , path: "/create-channel",
    },
    {
        element: <ProtectedRoute target={"/login"}><MainLayout><Chat/></MainLayout></ProtectedRoute>
        , path: "/messages",
    },
    {
        element: <ProtectedRoute target={"/login"}><MainLayout><Chat/></MainLayout></ProtectedRoute>
        , path: "/messages/:id",
    },
    {
        element: <ProtectedRoute target={"/login"}><MainLayout><Welcome/></MainLayout></ProtectedRoute>
        , path: "/",
    },
];

