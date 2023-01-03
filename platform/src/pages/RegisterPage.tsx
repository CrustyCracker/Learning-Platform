import {useState} from 'react';
import '../style/App.css';
import {Link, useNavigate} from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import {ErrorAndInfo} from "../components/ErrorAndInfo";

export default function RegisterPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    return (
        <div className="App container-fluid pzsp2-register-page-cont">
            <div className="pzsp2-register-error">
                <ErrorAndInfo errorMsg={error} infoMsg={""}/>
            </div>
            <RegisterForm onSuccess={() => navigate("/login")} onError={(res) => setError(res.userMessage)}/>
            <small className="pzsp2-register-loglink-text">Masz już konto? <Link className="pzsp2-link pzsp2-register-loglink" to="/login">Zaloguj się</Link></small>
        </div>
    );
}