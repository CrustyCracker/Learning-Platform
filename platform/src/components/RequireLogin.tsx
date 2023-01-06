import {Navigate, Outlet} from 'react-router-dom'
import {SecurityHelper} from "../helpers/SecurityHelper";
import React from "react";

export const RequireLogin = () => {
    if (!SecurityHelper.amILogged()) {
        return <Navigate to="/login"/>;
    }
    return <Outlet/>;
};



