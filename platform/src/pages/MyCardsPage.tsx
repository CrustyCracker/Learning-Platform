import {useState} from 'react';
import '../style/App.css';
import '../style/cardList.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {CardList} from "../components/CardList";
import Layout from "../components/Layout/Layout";

export default function MyCardsPage() {
    const [error, setError] = useState("");

    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-mycards-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <CardList onSuccess={() => {}} onError={(res) => setError(res.userMessage)}/>
            </div>
        </Layout>
    </>);
}