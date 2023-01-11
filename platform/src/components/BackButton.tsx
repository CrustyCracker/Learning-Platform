import {useNavigate} from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();

    return <form className="pzsp2-card-back-button" onSubmit={(e) => {
            e.preventDefault();
            navigate(-1)}
        }>
        <button className="btn btn-danger">&laquo; Powrót</button>
    </form>
}