import React, {useState} from 'react';
import '../style/App.css';
import '../style/cardForm.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {CardForm} from "../components/CardForm";
import Layout from "../components/layout/Layout";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {BackButton} from "../components/BackButton";

export default function NewCardPage() {
    const [error, setError] = useState("");

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Dodaj fiszkę</title>
        </Helmet>
        <Layout>
            <BackButton/>
            <div className="App container-fluid pzsp2-cardform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <CardForm edit={false} onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>;
}