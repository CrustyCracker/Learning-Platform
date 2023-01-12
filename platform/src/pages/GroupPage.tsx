import React, {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {Group} from "../components/Group";
import Layout from "../components/layout/Layout";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {BackButton} from "../components/BackButton";

export default function GroupPage() {
    const [error, setError] = useState("");

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Grupa</title>
        </Helmet>
        <Layout>
            <BackButton/>
            <div className="App container-fluid pzsp2-card-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <Group onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>;
}