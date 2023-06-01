import {Navigate} from "react-router-dom";
import React from "react";

const ProtectedRoute = ({target, children}: any) => {
    const isAuth = localStorage.getItem("access");
    if (isAuth !== 'true') {
        return <Navigate to={target} replace/>
    } else {
        return children
    }
}

export default ProtectedRoute;