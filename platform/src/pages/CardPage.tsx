import {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {Card} from "../components/Card";
import Layout from "../components/Layout/Layout";

export default function CardPage() {
    const [error, setError] = useState("");

    return (<>
        <Layout>
        <div className="App container-fluid pzsp2-card-page-cont">
            <ErrorAndInfo errorMsg={error} infoMsg={""} />
            <Card onSuccess={() => {}} onError={(res) => setError(res.message)}/>
        </div>
        </Layout>
    </>);
}