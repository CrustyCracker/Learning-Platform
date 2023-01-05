import {useState} from 'react';
import '../style/App.css';
import '../style/groupForm.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {NewGroupForm} from "../components/NewGroupForm";
import Layout from "../components/Layout/Layout";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function NewGroupPage() {
    const [error, setError] = useState("");

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Dodaj grupę</title>
        </Helmet>
        <Layout>
            <div className="App container-fluid pzsp2-groupform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <NewGroupForm onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>;
}