import React, { useEffect, useState } from 'react';
import '../style/App.css';
import '../style/cardList.css';
import { ErrorAndInfo } from "../components/ErrorAndInfo";
import { CardList } from "../components/CardList";
import Layout from "../components/Layout/Layout";
import { SecurityHelper } from "../helpers/SecurityHelper";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Requests } from "../requests/Requests";
import { CardResponse } from "../types/Cards";
import {BackButton} from "../components/BackButton";

export default function MyCardsPage() {
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
            <title>Inżynierka w tydzień ∙ Publiczne fiszki</title>
        </Helmet>
        <Layout>
            <BackButton/>
            <div className="App container-fluid pzsp2-mycards-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <h1 className="pzsp2-cardlist-title">Publiczne fiszki</h1>
                <CardList cards={cards} pub={true} />
            </div>
        </Layout>
    </>;
}