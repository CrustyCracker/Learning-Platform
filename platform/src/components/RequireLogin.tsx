import {Navigate} from 'react-router-dom'
import {SecurityHelper} from "../helpers/SecurityHelper";
import React, {FC} from "react";

export const RequireLogin: FC<{ children: React.ReactElement }> = ({ children}) => {
    if (!SecurityHelper.amILogged()) {
        return <Navigate to="/login"/>;
    }
    return children;
};



