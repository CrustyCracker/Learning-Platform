import React, { useEffect, useState } from 'react';
import '../style/App.css';
import '../style/groupForm.css';
import { ErrorAndInfo } from "../components/ErrorAndInfo";
import { NewGroupForm } from "../components/NewGroupForm";
import Layout from "../components/layout/Layout";
import { SecurityHelper } from "../helpers/SecurityHelper";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CardResponse } from '../types/Cards';
import { Requests } from '../requests/Requests';
import {BackButton} from "../components/BackButton";

export default function NewGroupPage() {
    const [error, setError] = useState("");
    const [cards, setCards] = useState<CardResponse[]>([]);

    useEffect(() => {
        Requests.allCards().then(res => {
            if (res.err) {
                setCards([]);
                setError(res.err.userMessage);
            }
            else if (res.res) {
                setCards(res.res);
            }
        });
    }, [])

    if (!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Dodaj grupę</title>
        </Helmet>
        <Layout>
            <BackButton/>
            <div className="App container-fluid pzsp2-groupform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <NewGroupForm onSuccess={() => { }} onError={(res) => setError(res.userMessage)} cards={cards} />
            </div>
        </Layout>
    </>;
}