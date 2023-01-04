import {useState} from 'react';
import '../style/App.css';
import '../style/groupList.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {GroupList} from "../components/GroupList";
import Layout from "../components/Layout/Layout";
import {TokenHelper} from "../helpers/TokenHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";

export default function MyGroupsPage() {
    const [error, setError] = useState("");

    if(!TokenHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Moje grupy</title>
        </Helmet>
        <Layout>
            <div className="App container-fluid pzsp2-mygroups-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <GroupList onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>;
}