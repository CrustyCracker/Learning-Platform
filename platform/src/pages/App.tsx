import React, {useCallback, useState} from 'react';
import '../style/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorResponse } from "../types/ErrorResponse";
import LoginPage from "./LoginPage";
import RegisterPage from './RegisterPage';
import CardPage from "./CardPage";
import MyCardsPage from "./MyCardsPage";
import MainMenuPage from "./MainMenuPage";
import MyGroupsPage from "./MyGroupsPage";
import GroupPage from "./GroupPage";
import NewCardPage from "./NewCardPage";
import EditCardPage from "./EditCardPage";
import NewGroupPage from "./NewGroupPage";
import EditGroupPage from "./EditGroupPage";
import PubCardsPage from "./PubCardsPage"
import PubGroupsPage from "./PubGroupsPage"
import ModePage from "./ModePage";
import SummaryPage from "./SummaryPage";

export default function App() {
    const [, setError] = useState("");
    const [, setInfo] = useState("");
    const logToConsoleErr = useCallback((o: ErrorResponse) => {
        console.log("error");
        console.log(o);
        setError(o.userMessage)
    }, [])
    const logToConsoleInfo = useCallback((o: any) => {
        console.log("info");
        console.log(o);
        setInfo(o.toString())
    },[])

    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainMenuPage />} />
                        <Route path="/cards" element={<MyCardsPage />} />
                        <Route path="/cards/pub" element={<PubCardsPage />} />
                        <Route path="/cards/:id" element={<CardPage />} />
                        <Route path="/cards/new" element={<NewCardPage />} />
                        <Route path="/cards/:id/edit" element={<EditCardPage />} />
                        <Route path="/groups" element={< MyGroupsPage />} />
                        <Route path="/groups/pub" element={<PubGroupsPage />} />
                        <Route path="/groups/:id" element={<GroupPage />} />
                        <Route path="/groups/:id/edit" element={<EditGroupPage />} />
                        <Route path="/groups/new" element={<NewGroupPage />} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/mode" element={<ModePage/>} />
                        <Route path="/summary" element={<SummaryPage/>} />
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}
