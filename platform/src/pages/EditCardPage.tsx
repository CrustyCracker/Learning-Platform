import {useState} from 'react';
import '../style/App.css';
import '../style/cardForm.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {EditCardForm} from "../components/EditCardForm";
import Layout from "../components/Layout/Layout";
import {TokenHelper} from "../helpers/TokenHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function EditCardPage() {
    const [error, setError] = useState("");

    if(!TokenHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Edytuj fiszkę</title>
        </Helmet>
        <Layout>
            <div className="App container-fluid pzsp2-cardform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <EditCardForm onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>;
}