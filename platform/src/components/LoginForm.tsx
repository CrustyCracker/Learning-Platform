import React, {FormEvent, useState} from 'react';
import {Requests} from "../requests/Requests";
import {Credentials, LoginResponse} from "../types/Credentials";
import {ErrorResponse} from "../types/ErrorResponse";
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
            if (res?.res?.success){
                props.onSuccess(res.res);
            }
            else if (!res?.res?.success){
                props.onError({ message: "Niepoprawne hasło dla tego użytkownika.", debugMessage: "", status: 0, timestamp: new Date()})
            }
            else if (res.err) {
                props.onError(res.err);
            }
            else {
                props.onError({ message: "Błąd logowania.", debugMessage: "", status: 0, timestamp: new Date()})
            }
        });
    }

    return (
        <div className="container-fluid pzsp2-login-cont">
            <div className="row pzsp2-login-row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <form onSubmit={handleSubmit}>
                        <div className="card text-black bg-light pzsp2-login-card">
                            <label className="pzsp2-login-user">
                                <small>Nazwa użytkownika</small>
                                <input className="form-control" type="text" name="username" maxLength={100} required onChange={(e) => {
                                    setCredentials({...credentials, username: e.target.value})
                                }} />
                            </label>
                            <label className="pzsp2-login-pwd">
                                <small>Hasło</small>
                                <input className="form-control" type="password" name="password" maxLength={100} required onChange={(e) => {
                                    setCredentials({...credentials, password: e.target.value})
                                }} />
                            </label>
                            <div className="pzsp2-login-submit">
                                <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">Zaloguj się</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}
