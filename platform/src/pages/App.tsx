import React, {useState} from 'react';
import '../style/App.css';
import {FirstCard} from "../components/FirstCard";
import {LoginForm} from "../components/LoginForm";
import {RegisterForm} from "../components/RegisterForm";
import {NewCardForm} from "../components/NewCardForm";
import {NewGroupForm} from "../components/NewGroupForm";
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {ErrorResponse} from "../types/ErrorResponse";
import {CardList} from "../components/CardList";

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
                <ErrorAndInfo errorMsg={error} infoMsg={info}/>
                <FirstCard></FirstCard>
                <LoginForm onSuccess={logToConsoleInfo} onError={logToConsoleErr} />
                <RegisterForm onSuccess={logToConsoleInfo} onError={logToConsoleErr}/>
                <NewCardForm onSuccess={logToConsoleInfo} onError={logToConsoleErr}/>
                <NewGroupForm onSuccess={logToConsoleInfo} onError={logToConsoleErr}/>
                <CardList onSuccess={logToConsoleInfo} onError={logToConsoleErr}/>
            </header>
        </div>
    );
}