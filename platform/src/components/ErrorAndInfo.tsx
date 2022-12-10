type ErrorAndInfoProps = {
    errorMsg : string
    infoMsg : string
}

export function ErrorAndInfo(props: ErrorAndInfoProps) {
    return <div>
        {props.errorMsg.trim() &&
            <div>{props.errorMsg}</div>
        }
        {props.infoMsg.trim() &&
            <div>{props.infoMsg}</div>
        }
    </div>;
}