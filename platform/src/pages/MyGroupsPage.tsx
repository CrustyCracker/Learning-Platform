import {useState} from 'react';
import '../style/App.css';
import '../style/groupList.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {GroupList} from "../components/GroupList";
import Layout from "../components/Layout/Layout";

export default function MyGroupsPage() {
    const [error, setError] = useState("");

    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-mygroups-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <GroupList onSuccess={() => {}} onError={(res) => setError(res.message)}/>
            </div>
        </Layout>
    </>);
}