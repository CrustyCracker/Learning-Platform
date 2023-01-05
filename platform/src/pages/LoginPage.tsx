import {useState} from 'react';
import '../style/App.css';
import {Link, Navigate, useNavigate} from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {LoginResponse} from "../types/Credentials";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Helmet} from "react-helmet";

export default function LoginPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const onLoginSuccess = (res: LoginResponse) => {
        SecurityHelper.setContext({...res, validTo: new Date()});
        navigate("/");
    }

    if(SecurityHelper.amILogged())
        return <Navigate to="/" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Zaloguj się</title>
        </Helmet>
        <div className="App container-fluid pzsp2-login-page">
            <div className="App pzsp2-login-page-cont">
                <div className="pzsp2-login-error">
                    <ErrorAndInfo errorMsg={error} infoMsg={""}/>
                </div>
                <LoginForm onSuccess={(res) => onLoginSuccess(res)} onError={(res) => setError(res.userMessage)}/>
                <small className="pzsp2-login-reglink-text">Nie masz konta? <Link className="pzsp2-link pzsp2-login-reglink" to="/register">Załóż konto</Link></small>
            </div>
        </div>
    </>
    ;
}