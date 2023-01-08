import {useState} from 'react';
import '../style/App.css';
import '../style/cardForm.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import Layout from "../components/Layout/Layout";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {CardForm} from "../components/CardForm";

export default function EditCardPage() {
    const [error, setError] = useState("");

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Edytuj fiszkę</title>
        </Helmet>
        <Layout>
            <div className="App container-fluid pzsp2-cardform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <CardForm edit={true} onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>;
}