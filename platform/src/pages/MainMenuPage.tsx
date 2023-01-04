import {useState} from 'react';
import '../style/App.css';
import '../style/card.css';
import '../style/mainMenu.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {MainMenu} from "../components/MainMenu";
import Layout from "../components/Layout/Layout";
import {Navigate} from "react-router-dom";
import {TokenHelper} from "../helpers/TokenHelper";

export default function MainMenuPage() {
    const [error] = useState("");

    if(!TokenHelper.amILogged())
        return <Navigate to="/login" />

    return (<>
        <Layout>
            <div className="App container-fluid pzsp2-mainmenu-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <MainMenu/>
            </div>
        </Layout>
    </>);
}