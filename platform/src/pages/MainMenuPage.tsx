import {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import '../style/mainMenu.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {MainMenu} from "../components/MainMenu";
import Layout from "../components/Layout/Layout";

export default function MainMenuPage() {
    const [error, setError] = useState("");

    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-mainmenu-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <MainMenu/>
            </div>
        </Layout>
    </>);
}