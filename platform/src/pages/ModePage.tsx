import React, {useEffect, useState} from "react";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {CardResponse} from "../types/Cards";
import BrowsingMode from "../components/modes/browse/BrowsingMode";
import TestingMode from "../components/modes/testing/TestingMode";
import {Helmet} from "react-helmet";
import {BackButton} from "../components/BackButton";
import Layout from "../components/layout/Layout";
import {ErrorAndInfo} from "../components/ErrorAndInfo";

export type ModePageState = {
    isBrowsing: boolean,
    cards: CardResponse[]
}

export default function ModePage () {
    const [error, ] = useState("");
    const [state, setState] = useState({} as ModePageState);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.cards && location.state)
            setState(location.state);
    }, [])

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    if(state === null || !state.cards || state.cards.length <= 0 ||  state.isBrowsing === undefined)
        navigate(-1);

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Tryb {state.isBrowsing ? "Przeglądania" : "Testowy"}</title>
        </Helmet>
        <Layout>
            <h2>Tryb {state.isBrowsing ? "Przeglądania" : "Testowy"}</h2>
            <div className="App container-fluid pzsp2-mainmenu-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                {state.isBrowsing ? <BrowsingMode cards={state.cards}/> : <TestingMode cards={state.cards}/>}
            </div>
            <BackButton/>
        </Layout>
    </>
}