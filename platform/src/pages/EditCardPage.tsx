import {useState} from 'react';
import '../style/App.css';
import '../style/cardForm.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {EditCardForm} from "../components/EditCardForm";
import Layout from "../components/Layout/Layout";

export default function EditCardPage() {
    const [error, setError] = useState("");


    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-cardform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <EditCardForm onSuccess={() => {}} onError={(res) => setError(res.message)}/>
            </div>
        </Layout>
    </>);
}