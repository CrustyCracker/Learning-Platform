import React, {FormEvent, useState} from 'react';
import {Requests} from "../requests/Requests";
import {Credentials, LoginResponse} from "../types/Credentials";
import {ErrorResponse} from "../types/ErrorResponse";
import { Link } from "react-router-dom";
import '../style/login.css';

interface LoginFormProps {
    onSuccess: (response: LoginResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function LoginForm(props: LoginFormProps) {
    const [credentials, setCredentials] = useState<Credentials>({} as Credentials);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!credentials)
            return;
        Requests.login(credentials).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res){
                props.onSuccess(res.res);
            }
        });
    }


    const cardStyle = {
        margin: "5% 0",
        minHeight: '420px',
        minWidth: '420px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    }
    // pzsp2 error handling i walidacja
    // pzsp2 max długość wpisywanego tesktu
    return (<> <link rel="stylesheet" href="../style/login.css"/>
    
        <form onSubmit={handleSubmit}>
            <div className="card text-white bg-dark" style={cardStyle}>
                <label style={{margin: 0, textAlign: 'start', minWidth: "80%"}}>
                    <small>Nazwa użytkownika</small>
                    <input className="form-control" type="text" name="username" style={{marginBottom: "4%"}} maxLength={100} required onChange={(e) => {
                        setCredentials({...credentials, username: e.target.value})
                    }} />
                </label>
                <label style={{margin: 0, textAlign: 'start', minWidth: "80%"}}>
                    <small>Hasło</small>
                    <input className="form-control" type="text" name="password" style={{marginBottom: "4%"}} maxLength={100} required onChange={(e) => {
                        setCredentials({...credentials, password: e.target.value})
                    }} />
                </label>
                <div style={{justifyContent: "center", marginTop: "4%"}}></div>
                <button type="submit" onClick={handleSubmit} className="btn btn-outline-info">Zaloguj się</button>
                <div style={{justifyContent: "center", marginTop: "4%"}}></div>
                <small>Nie masz konta? <Link to="/register">Załóż konto</Link></small> 
            </div>
        </form>
    </>)
}
