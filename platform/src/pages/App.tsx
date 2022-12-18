import React, {useCallback, useState} from 'react';
import '../style/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import { NewCardForm } from "../components/NewCardForm";
import { NewGroupForm } from "../components/NewGroupForm";
import { ErrorResponse } from "../types/ErrorResponse";
import { CardList } from "../components/CardList";
import { GroupList } from "../components/GroupList";
import { Card } from "../components/Card";
import {MainPage} from "../components/MainPage"
import {Group} from "../components/Group";
import {EditGroupForm} from "../components/EditGroupForm";
import {EditCardForm} from "../components/EditCardForm";
import LoginPage from "./LoginPage";
import RegisterPage from './RegisterPage';

export default function App() {
    const [, setError] = useState("");
    const [, setInfo] = useState("");
    const logToConsoleErr = useCallback((o: ErrorResponse) => {
        console.log("error");
        console.log(o);
        setError(o.message)
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
                        <Route path="/" element={<MainPage />} />
                        <Route path="/cards" element={<CardList onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/cards/:id" element={<Card onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/cards/new" element={<NewCardForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/cards/:id/edit" element={<EditCardForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/groups" element={< GroupList onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/groups/:id" element={<Group onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/groups/:id/edit" element={<EditGroupForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/groups/new" element={<NewGroupForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}
