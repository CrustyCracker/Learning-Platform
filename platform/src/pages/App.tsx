import React from 'react';
import '../style/App.css';
import {FirstCard} from "../components/FirstCard";
import {LoginForm} from "../components/LoginForm";
import {RegisterForm} from "../components/RegisterForm";
import {NewCardForm} from "../components/NewCardForm";

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <FirstCard></FirstCard>
                <LoginForm onSuccess={(s) => {
                    console.log(s); //pzsp2 no tu oczywiście powinno być zapamiętanie w sesji
                }} />
                <RegisterForm onSuccess={(s) => {
                    console.log(s); //pzsp2 no tu oczywiście powinno być zapamiętanie w sesji
                }} />
                <NewCardForm onSuccess={(response) => console.log(response)}/>
            </header>
        </div>
    );
}