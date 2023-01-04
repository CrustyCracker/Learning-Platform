import {useState} from 'react';
import '../style/App.css';
import '../style/cardList.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {CardList} from "../components/CardList";
import Layout from "../components/Layout/Layout";
import {TokenHelper} from "../helpers/TokenHelper";
import {Navigate} from "react-router-dom";

export default function MyCardsPage() {
    const [error, setError] = useState("");

    if(!TokenHelper.amILogged())
        return <Navigate to="/login" />

    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-mycards-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <CardList onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>);
}