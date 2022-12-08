import React from 'react';
import '../style/App.css';
import {FirstCard} from "../components/FirstCard";
import {LoginForm} from "../components/LoginForm";

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Pierwsza fiszka z bazy:
                </p>
                <FirstCard></FirstCard>
                <LoginForm setToken={(s) => {
                    console.log(s); //pzsp2 no tu oczywiście powinno być zapamiętanie w sesji
                }} />
            </header>
        </div>
    );
}