import React, {ChangeEvent, FormEvent, useState} from 'react';
import { RegisterCredentials } from '../types/Credentials';
import {Requests} from "../requests/Requests";

interface RegisterFormProps {
    onSuccess: (token: string) => void
}

export function RegisterForm(props: RegisterFormProps) {
    const [credentials, setCredentials] = useState<RegisterCredentials>({confirmPassword: "", password: "", username: "", email: ""});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (credentials)
            Requests.register(credentials)
                .then(r => {
                    if(r.success && r.token)
                        props.onSuccess(r.token)
                });
    }

    // pzsp2 error handling i walidacja

    const confirmPasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value)
            setCredentials({...credentials, confirmPassword: e.target.value})

        // pzsp2 walidacja w real time czy zgodne z password
    }

    return <div>
        <h1>Zarejestruj się</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Nazwa użytkownika</p>
                <input type="text" name="username" required onChange={(e) => {
                    if (e.target.value)
                        setCredentials({...credentials, username: e.target.value})
                }} />
            </label>
            <label>
                <p>Email</p>
                <input type="text" name="email" required onChange={(e) => {
                    if (e.target.value)
                        setCredentials({...credentials, email: e.target.value})
                }} />
            </label>
            <label>
                <p>Hasło</p>
                <input type="password" name="password" required onChange={(e) => {
                    if (e.target.value)
                        setCredentials({...credentials, password: e.target.value})
                }} />
            </label>
            <label>
                <p>Powtórz Hasło</p>
                <input type="password" name="password" required onChange={confirmPasswordOnChange} />
            </label>
            <div>
                <button type="submit">Zarejestruj</button>
            </div>
        </form>
    </div>
}
