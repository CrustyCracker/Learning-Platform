import React, {ChangeEvent, FormEvent, useState} from 'react';
import {RegisterCredentials, RegisterResponse} from '../types/Credentials';
import {Requests} from "../requests/Requests";
import {ErrorResponse} from "../types/ErrorResponse";

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
                {!isConfirmedPassword &&
                    <div>Hasła się różnią</div>
                }
            </label>
            <div>
                <button type="submit">Zarejestruj</button>
            </div>
        </form>
    </div>
}
