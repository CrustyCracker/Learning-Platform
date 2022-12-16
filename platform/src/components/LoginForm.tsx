import React, {FormEvent, useState} from 'react';
import {Requests} from "../requests/Requests";
import {Credentials, LoginResponse} from "../types/Credentials";
import {ErrorResponse} from "../types/ErrorResponse";
import { Link } from "react-router-dom";

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

    // pzsp2 error handling i walidacja

    return <div>
        <h1>Zaloguj się</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Nazwa użytkownika</p>
                <input type="text" name="username" required onChange={(e) => {
                    setCredentials({...credentials, username: e.target.value})
                }} />
            </label>
            <label>
                <p>Hasło</p>
                <input type="password" name="password" required onChange={(e) => {
                    setCredentials({...credentials, password: e.target.value})
                }} />
            </label>
            <div>
                <button type="submit">Zaloguj</button>
            </div>
            <Link to="/register">Nie masz konta? Załóż</Link>
        </form>
    </div>
}
