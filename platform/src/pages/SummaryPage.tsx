import {Helmet} from "react-helmet";
import {Summary} from "../components/modes/testing/Summary";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {SecurityHelper} from "../helpers/SecurityHelper";
import React, {useEffect, useState} from "react";

type SummaryPageState = {
    score: number
    outOf: number
}

export default function SummaryPage () {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState({} as SummaryPageState);

    useEffect(() => {
        if (!state.score && location.state)
            setState(location.state);
    }, [])

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    if(state.score === undefined)
        navigate("/");

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Zaloguj się</title>
        </Helmet>
        <div className="App container-fluid pzsp2-login-page">
            <div className="App pzsp2-login-page-cont">
                <Summary score={state.score} outOf={state.outOf}/>
            </div>
        </div>
    </>
}