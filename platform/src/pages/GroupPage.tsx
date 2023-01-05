import {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {Group} from "../components/Group";
import Layout from "../components/Layout/Layout";
import {TokenHelper} from "../helpers/TokenHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function GroupPage() {
    const [error, setError] = useState("");

    if(!TokenHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Grupa</title>
        </Helmet>
        <Layout>
            <div className="App container-fluid pzsp2-card-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <Group onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>;
}