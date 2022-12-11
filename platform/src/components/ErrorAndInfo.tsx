type ErrorAndInfoProps = {
    errorMsg : string
    infoMsg : string
}

export function ErrorAndInfo(props: ErrorAndInfoProps) {
    // pzsp2 to jest bardzo proste i brzydkie, trzeba zrobić coś na kształt bootstrapowych alertów
    return <div>
        {props.errorMsg &&
            <div>Błąd: {props.errorMsg}</div>
        }
        {props.infoMsg &&
            <div>Informacja: {props.infoMsg}</div>
        }
    </div>;
}