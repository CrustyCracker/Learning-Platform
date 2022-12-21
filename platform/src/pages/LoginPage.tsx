import {useState} from 'react';
import '../style/App.css';
import {Link, useNavigate} from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import {ErrorAndInfo} from "../components/ErrorAndInfo";

export default function LoginPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    return (
        <div className="App">
            <ErrorAndInfo errorMsg={error} infoMsg={""}/>
            <LoginForm onSuccess={() => navigate("/")} onError={(res) => setError(res.message)}/>
            <small>Nie masz konta? <Link to="/register">Załóż konto</Link></small>
        </div>
    );
}