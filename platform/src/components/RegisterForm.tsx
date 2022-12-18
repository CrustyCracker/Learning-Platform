import React, {ChangeEvent, FormEvent, useState} from 'react';
import {RegisterCredentials, RegisterResponse} from '../types/Credentials';
import {Requests} from "../requests/Requests";
import {ErrorResponse} from "../types/ErrorResponse";
import '../style/register.css';


interface RegisterFormProps {
    onSuccess: (response: RegisterResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function RegisterForm(props: RegisterFormProps) {
    const [credentials, setCredentials] = useState({} as RegisterCredentials);
    const [isConfirmedPassword, setConfirmedPassword] = useState(true);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!credentials)
            return;

        Requests.register(credentials).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res){
                props.onSuccess(res.res)

            }
        })
    }

    // pzsp2 error handling i walidacja

    const confirmPasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value)
            setCredentials({...credentials, confirmPassword: e.target.value})

        if (e.target.value !== credentials.password)
            setConfirmedPassword(false);
        else
            setConfirmedPassword(true);
    }

    const cardStyle = {
        margin: "5% 0",
        minHeight: '420px',
        minWidth: '600px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    }
    // pzsp2 max długość wpisywanego tesktu
    return <div>
        <form onSubmit={handleSubmit}>
            <div className="card text-white bg-dark" style={cardStyle}>
                 <label style={{margin: 0, textAlign: 'start', width: "70%"}}>
                    <small>Nazwa użytkownika</small>
                    <input className="form-control" type="text" name="username" style={{marginBottom: "4%"}} maxLength={100} required onChange={(e) => {
                        setCredentials({...credentials, username: e.target.value})
                    }} />
                </label>
                <label style={{margin: 0, textAlign: 'start', width: "70%"}}>
                    <small>Email</small>
                    <input className="form-control" type="text" name="email" style={{marginBottom: "4%"}} maxLength={100} required onChange={(e) => {
                        setCredentials({...credentials, email: e.target.value})
                    }} />
                </label>
                <label style={{margin: 0, textAlign: 'start', width: "70%"}}>
                    <small>Hasło</small>
                    <input className="form-control" type="password" name="password" style={{marginBottom: "4%"}} maxLength={100} required onChange={(e) => {
                        setCredentials({...credentials, password: e.target.value})
                    }} />
                </label>
                <label style={{margin: 0, textAlign: 'start', width: "70%"}}>
                <small>Powtórz hasło</small>
                    <input className="form-control" type="password" name="password" required onChange={confirmPasswordOnChange} />
                    {!isConfirmedPassword &&
                        <div><small>Hasła się różnią!!!</small></div>
                    }
                </label>
                <div style={{justifyContent: "center", marginTop: "4%"}}></div>
                <button type="submit" onClick={handleSubmit} className="btn btn-outline-info">Zarejestruj się</button>
            </div>
        </form>
    </div>
}
