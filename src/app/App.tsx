import React from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { TOAST_PROPS } from "../constant/toast";
import "react-toastify/dist/ReactToastify.css";
import { router } from "../constant/router";

function App() {
  const client = new QueryClient({
    defaultOptions: { queries: { keepPreviousData: true } },
  });

  return (
    <QueryClientProvider client={client}>
        <div className={clsx(classes.app)}>
          <Router />
        </div>
        <ToastContainer {...TOAST_PROPS} />
    </QueryClientProvider>
  );
}

const Router = () => {

  return (
    <Routes>
      {router.map((r) => <Route {...r} />)}
    </Routes>
  );
};

export default App;
