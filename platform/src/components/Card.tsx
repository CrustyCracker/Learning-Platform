import {useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import { useParams } from "react-router-dom";

interface CardProps {
    onSuccess: (response: CardResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function Card(props: CardProps) {
    const [question, setQuestion] = useState("ERROR");
    const [answer, setAnswer] = useState("ERROR");
    const {id} = useParams();

    useEffect(() => {
        Requests.CardId(Number(id)).then(res => {
            if (res.err) {
                setQuestion(res.err.message)
                setAnswer(res.err.debugMessage)
                props.onError(res.err);
            }
            else if (res.res){
                setQuestion(res.res.question);
                setAnswer(res.res.answer);
                props.onSuccess(res.res);
            }
        });
    }, [props])

    return <>
        <p>Fiszka o id {id}:</p>
        <div>
            Pytanie: {question}
        </div>
        <div>
            Odpowiedź: {answer}
        </div>
    </>;
}