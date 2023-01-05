import React, {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import '../style/mainMenu.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {MainMenu} from "../components/MainMenu";
import Layout from "../components/Layout/Layout";
import {Navigate} from "react-router-dom";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Helmet} from "react-helmet";

export default function MainMenuPage() {
    const [error] = useState("");

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Strona główna</title>
        </Helmet>
        <Layout>
            <div className="App container-fluid pzsp2-mainmenu-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <MainMenu/>
            </div>
        </Layout>
    </>;
}