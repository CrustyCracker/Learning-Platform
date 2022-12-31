import {useState} from 'react';
import '../style/App.css';
import '../style/cardForm.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {NewCardForm} from "../components/NewCardForm";
import Layout from "../components/Layout/Layout";

export default function NewCardPage() {
    const [error, setError] = useState("");


    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-cardform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <NewCardForm onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>);
}