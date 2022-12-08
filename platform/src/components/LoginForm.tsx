import React, {FormEvent, useState} from 'react';
import {Credentials, Requests} from "../requests/Requests";

interface LoginFormProps {
    setToken: (token: string) => void
}

export function LoginForm(props: LoginFormProps) {
    const [credentials, setCredentials] = useState<Credentials>({username: "", password: ""});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (credentials)
            Requests.login(credentials)
                .then(r => {
                    if(r.success && r.token)
                        props.setToken(r.token)
                });
    }

    return <div>
        <h1>Zaloguj się</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Nazwa użytkownika</p>
                <input type="text" name="username" required onChange={(e) => {
                    if (e.target.value)
                        setCredentials({...credentials, username: e.target.value})
                }} />
            </label>
            <label>
                <p>Hasło</p>
                <input type="password" name="password" required onChange={(e) => {
                    if (e.target.value)
                        setCredentials({...credentials, password: e.target.value})
                }} />
            </label>
            <div>
                <button type="submit">Zaloguj</button>
            </div>
        </form>
    </div>
}
