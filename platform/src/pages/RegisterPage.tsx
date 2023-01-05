import {useState} from 'react';
import '../style/App.css';
import {Link, Navigate, useNavigate} from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {TokenHelper} from "../helpers/TokenHelper";
import {Helmet} from "react-helmet";

export default function RegisterPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    if(TokenHelper.amILogged())
        return <Navigate to="/" />

    return (<>
            <Helmet>
                <title>Inżynierka w tydzień ∙ Zarejestruj się</title>
            </Helmet>
            <div className="App container-fluid pzsp2-register-page">
                <div className="App pzsp2-register-page-cont">
                    <div className="pzsp2-register-error">
                        <ErrorAndInfo errorMsg={error} infoMsg={""}/>
                    </div>
                    <RegisterForm onSuccess={() => navigate("/login")} onError={(res) => setError(res.userMessage)}/>
                    <small className="pzsp2-register-loglink-text">Masz już konto? <Link className="pzsp2-link pzsp2-register-loglink" to="/login">Zaloguj się</Link></small>
                </div>
            </div>
        </>
    );
}