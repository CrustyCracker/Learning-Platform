
import 'bootstrap/dist/css/bootstrap.min.css';

type ErrorAndInfoProps = {
    errorMsg : string
    infoMsg : string
}

export function ErrorAndInfo(props: ErrorAndInfoProps) {
    // pzsp2 teraz to jest bootstrapowy alert pozdro
    return<div>
        {props.errorMsg &&
            <div className="alert alert-danger" role="alert"><small>Błąd: {props.errorMsg}</small></div>
        }
        {props.infoMsg &&
            <div className="alert alert-info" role="alert"><small>Informacja: {props.infoMsg}</small></div>
        }
    </div>;
}