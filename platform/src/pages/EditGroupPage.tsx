import {useState} from 'react';
import '../style/App.css';
import '../style/cardForm.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {EditGroupForm} from "../components/EditGroupForm";
import Layout from "../components/Layout/Layout";

export default function EditGroupPage() {
    const [error, setError] = useState("");


    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-cardform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <EditGroupForm onSuccess={() => {}} onError={(res) => setError(res.message)}/>
            </div>
        </Layout>
    </>);
}