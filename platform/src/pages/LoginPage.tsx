import {useState} from 'react';
import '../style/App.css';
import {Link, useNavigate} from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import {ErrorAndInfo} from "../components/ErrorAndInfo";

export default function LoginPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    return (
        <div className="App container-fluid pzsp2-login-page-cont">
            <div className="pzsp2-login-error">
                <ErrorAndInfo errorMsg={error} infoMsg={""}/>
            </div>
            <LoginForm onSuccess={() => navigate("/")} onError={(res) => setError(res.message)}/>
            <small className="pzsp2-login-reglink-text">Nie masz konta? <Link className="pzsp2-link pzsp2-login-reglink" to="/register">Załóż konto</Link></small>
        </div>
    );
}