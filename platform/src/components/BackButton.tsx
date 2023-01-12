import {useNavigate} from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();

    return <form className="pzsp2-card-back-button" onSubmit={(e) => {
            e.preventDefault();
            navigate(-1)}
        }>
        <button className="btn btn-outline-secondary pzsp2-backbutton">&laquo; Powrót</button>
    </form>
}