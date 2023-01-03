import {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {Group} from "../components/Group";
import Layout from "../components/Layout/Layout";

export default function GroupPage() {
    const [error, setError] = useState("");

    return (<>
        <Layout>
        <div className="App container-fluid pzsp2-card-page-cont">
            <ErrorAndInfo errorMsg={error} infoMsg={""} />
            <Group onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
        </div>
        </Layout>
    </>);
}