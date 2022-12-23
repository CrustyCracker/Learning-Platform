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

    const confirmPasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value)
            setCredentials({...credentials, confirmPassword: e.target.value})
        if (e.target.value !== credentials.password)
            setConfirmedPassword(false);
        else
            setConfirmedPassword(true);
    }

    return (
        <div className="container-fluid pzsp2-register-cont">
            <div className="row pzsp2-register-row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <form onSubmit={handleSubmit}>
                        <div className="card text-black bg-light pzsp2-register-card">
                             <label className="pzsp2-register-user">
                                <small>Nazwa użytkownika</small>
                                <input className="form-control" type="text" name="username" maxLength={100} required onChange={(e) => {
                                    setCredentials({...credentials, username: e.target.value})
                                }} />
                            </label>
                            <label className="pzsp2-register-email">
                                <small>Email</small>
                                <input className="form-control" type="text" name="email" style={{marginBottom: "4%"}} maxLength={100} required onChange={(e) => {
                                    setCredentials({...credentials, email: e.target.value})
                                }} />
                            </label>
                            <label className="pzsp2-register-pwd">
                                <small>Hasło</small>
                                <input className="form-control" type="password" name="password" style={{marginBottom: "4%"}} maxLength={100} required onChange={(e) => {
                                    setCredentials({...credentials, password: e.target.value})
                                }} />
                            </label>
                            <label className="pzsp2-register-pwd">
                            <small>Powtórz hasło</small>
                                <input className="form-control" type="password" name="password" required onChange={confirmPasswordOnChange} />
                                {!isConfirmedPassword &&
                                    <div><small>Hasła się różnią!!!</small></div>
                                }
                            </label>
                            <div className="pzsp2-register-submit">
                            <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">Zarejestruj się</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}
