import {useState} from 'react';
import '../style/App.css';
import {Link, useNavigate} from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import {ErrorAndInfo} from "../components/ErrorAndInfo";

export default function RegisterPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate()

    return (
        <div className="App">
            <ErrorAndInfo errorMsg={error} infoMsg={""}></ErrorAndInfo>
            <RegisterForm onSuccess={() => navigate("/")} onError={(res) => setError(res.message)}/>
            <div style={{justifyContent: "center", marginTop: "4%"}}></div>
            <small>Masz już konto? <Link to="/login">Zaloguj się</Link></small>
        </div>
    );
}