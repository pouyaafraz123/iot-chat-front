import { RouteObject } from "react-router-dom";
import SamplePage from "../sample";
import Login from "../pages/login";
import FormLayout from "../components/layout/formlayout";
import Register from "../pages/register";
import EditProfile from "../pages/editprofile";
import NewChannel from "../pages/newchannel";
import Chat from "../pages/chat";
import MainLayout from "../components/layout/mainlayout";
import Welcome from "../pages/welcome";
import { WithAuth } from "../hooks/useAuth.tsx";

export const router: RouteObject[] = [
  {
    element: <SamplePage />,
    path: "/sample",
  },
  {
    element: (
      <FormLayout>
        <Login />
      </FormLayout>
    ),
    path: "/login",
  },
  {
    element: (
      <FormLayout>
        <Register />
      </FormLayout>
    ),
    path: "/register",
  },
  {
    element: (
      <WithAuth>
        <MainLayout>
          <FormLayout>
            <EditProfile />
          </FormLayout>
        </MainLayout>
      </WithAuth>
    ),
    path: "/edit-profile",
  },
  {
    element: (
      <WithAuth>
        <MainLayout>
          <FormLayout>
            <NewChannel />
          </FormLayout>
        </MainLayout>
      </WithAuth>
    ),
    path: "/create-channel",
  },
  {
    element: (
      <WithAuth>
        <MainLayout>
          <Chat />
        </MainLayout>
      </WithAuth>
    ),
    path: "/messages",
  },
  {
    element: (
      <WithAuth>
        <MainLayout>
          <Chat />
        </MainLayout>
      </WithAuth>
    ),
    path: "/messages/:id",
  },
  {
    element: (
      <WithAuth>
        <MainLayout>
          <Welcome />
        </MainLayout>
      </WithAuth>
    ),
    path: "/",
  },
];
