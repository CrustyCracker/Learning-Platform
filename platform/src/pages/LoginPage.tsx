import {useState} from 'react';
import '../style/App.css';
import {Link, useNavigate} from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {Credentials, LoginResponse} from "../types/Credentials";
import Cookies from 'universal-cookie';

export default function LoginPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate()


    const onLoginSuccess = (res: LoginResponse) => {
        const cookies = new Cookies();
        cookies.set('JWTTOKEN', res.token, { path: '/' });
        navigate("/");
    }

    return (
        <div className="App container-fluid pzsp2-login-page-cont">
            <div className="pzsp2-login-error">
                <ErrorAndInfo errorMsg={error} infoMsg={""}/>
            </div>
            <LoginForm onSuccess={(res) => onLoginSuccess(res)} onError={(res) => setError(res.message)}/>
            <small className="pzsp2-login-reglink-text">Nie masz konta? <Link className="pzsp2-link pzsp2-login-reglink" to="/register">Załóż konto</Link></small>
        </div>
    );
}