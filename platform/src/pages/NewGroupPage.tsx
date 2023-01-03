import {useState} from 'react';
import '../style/App.css';
import '../style/groupForm.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {NewGroupForm} from "../components/NewGroupForm";
import Layout from "../components/Layout/Layout";

export default function NewGroupPage() {
    const [error, setError] = useState("");


    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-groupform-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <NewGroupForm onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>);
}