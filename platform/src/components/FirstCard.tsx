import {useEffect, useState} from "react";
import {Requests} from "../requests/Requests";

export function FirstCard() {
    const [question, setQuestion] = useState("ERROR");
    const [answer, setAnswer] = useState("ERROR");

    useEffect(() => {
        Requests.firstCard()
            .then(r => {
                setQuestion(r.question);
                setAnswer(r.answer);
            })
    }, [])

    return <>
        <div>
            Pytanie: {question}
        </div>
        <div>
            Odpowiedź: {answer}
        </div>
    </>;
}