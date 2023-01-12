import React, {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {Card} from "../components/Card";
import Layout from "../components/Layout/Layout";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {BackButton} from "../components/BackButton";

export default function CardPage() {
    const [error, setError] = useState("");

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Fiszka</title>
        </Helmet>
        <Layout>
            <BackButton/>
            <div className="App container-fluid pzsp2-card-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <Card onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>;
}