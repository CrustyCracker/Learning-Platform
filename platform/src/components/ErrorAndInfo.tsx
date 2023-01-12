import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";

type ErrorAndInfoProps = {
    errorMsg : string
    infoMsg : string
}

export function ErrorAndInfo(props: ErrorAndInfoProps) {
    const [clicked, setClicked] = useState(false);

    useEffect(() => setClicked(false), [props])

    return <div>
        {props.errorMsg && !clicked &&
            <div className="alert alert-danger" role="alert" onClick={() => setClicked(true)}>
                <small>Błąd: {props.errorMsg}</small>
            </div>
        }
        {props.infoMsg && !clicked &&
            <div className="alert alert-info" role="alert" onClick={() => setClicked(true)}>
                <small>Informacja: {props.infoMsg}</small>
            </div>
        }
    </div>;
}