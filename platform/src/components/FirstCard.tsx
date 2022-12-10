import {useEffect, useState} from "react";
import {Requests} from "../requests/Requests";

export function FirstCard() {
    const [question, setQuestion] = useState("ERROR");
    const [answer, setAnswer] = useState("ERROR");

    useEffect(() => {
        Requests.firstCard().then(res => {
            if (res.err) {
                setQuestion(res.err.message)
                setAnswer(res.err.debugMessage)
            }
            else if (res.res){
                setQuestion(res.res.question);
                setAnswer(res.res.answer);
            }
        });
    }, [])

    return <>
        <p>Pierwsza fiszka z bazy:</p>
        <div>
            Pytanie: {question}
        </div>
        <div>
            Odpowiedź: {answer}
        </div>
    </>;
}