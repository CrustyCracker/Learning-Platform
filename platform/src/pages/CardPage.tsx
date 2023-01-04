import {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {Card} from "../components/Card";
import Layout from "../components/Layout/Layout";
import {TokenHelper} from "../helpers/TokenHelper";
import {Navigate} from "react-router-dom";

export default function CardPage() {
    const [error, setError] = useState("");

    if(!TokenHelper.amILogged())
        return <Navigate to="/login" />

    return (<>
        <Layout>
        <div className="App container-fluid pzsp2-card-page-cont">
            <ErrorAndInfo errorMsg={error} infoMsg={""} />
            <Card onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
        </div>
        </Layout>
    </>);
}