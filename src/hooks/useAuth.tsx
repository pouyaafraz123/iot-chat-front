import { useMutation } from "@tanstack/react-query";
import { ILoginParam, login } from "../api/auth";
import React, { PropsWithChildren, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { setAxiosToken } from "../api";
import useProfile from "./useProfile.tsx";

export interface ILoginData {
  username: string;
  token: string;
}

const KEY = "current_user";

const AuthContext = React.createContext<{
  user: ILoginData | undefined;
  login: (data: ILoginParam) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLogging: boolean;
}>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: undefined,
  isLogging: false,
});

const readLoginStatus = () => {
  const temp = localStorage.getItem(KEY);
  if (!!temp && temp !== "undefined") {
    const data = JSON.parse(temp) as ILoginData;
    setAxiosToken(data?.token);
    return data;
  }

  return undefined;
};

function AuthProvider({ children }: PropsWithChildren<any>) {
  const [user, setUser] = useState<ILoginData | undefined>(readLoginStatus());
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const loginMutate = useMutation(login);

  const loginFunc = (d: ILoginParam) => {
    loginMutate.mutate(
      {
        username: d.username,
        password: d.password,
      },
      {
        onSuccess: (data) => {
          setUser(
            data?.data
              ? {
                  username: data?.data?.data?.login?.user?.username,
                  token: data?.data?.data?.login?.token,
                }
              : undefined
          );
          setAxiosToken(data?.data?.data?.login?.token);
          localStorage.setItem(
            KEY,
            JSON.stringify({
              username: data?.data?.data?.login?.user?.username,
              token: data?.data?.data?.login?.token,
            })
          );
          setIsLoggedIn(true);
        },
      }
    );
  };

  const logoutFunc = () => {
    setUser(undefined);
    localStorage.removeItem(KEY);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        logout: logoutFunc,
        login: loginFunc,
        isLoggedIn: isLoggedIn,
        isLogging: loginMutate.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

const WithAuth = ({ children }: PropsWithChildren<any>) => {
  const auth = useAuth();
  useProfile();

  if (!auth.isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export { useAuth, WithAuth, AuthProvider };
