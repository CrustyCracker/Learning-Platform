import React, { useState } from 'react';
import '../style/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { NewCardForm } from "../components/NewCardForm";
import { NewGroupForm } from "../components/NewGroupForm";
import { ErrorAndInfo } from "../components/ErrorAndInfo";
import { ErrorResponse } from "../types/ErrorResponse";
import { CardList } from "../components/CardList";
import { GroupList } from "../components/GroupList";
import { Card } from "../components/Card";
import {MainPage} from "../components/MainPage"

export default function App() {
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const logToConsoleErr = (o: ErrorResponse) => {
        console.log(o);
        setError(o.message)
    }
    const logToConsoleInfo = (o: any) => {
        console.log(o);
        setInfo(o.toString())
    }

    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/cards" element={<CardList onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/cards/:id" element={<Card onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/cards/new" element={<NewCardForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/groups" element={< GroupList onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/groups/new" element={<NewGroupForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/login" element={<LoginForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                        <Route path="/register" element={<RegisterForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />} />
                    </Routes>
                </BrowserRouter>
            </header>
        </div>
    );
}