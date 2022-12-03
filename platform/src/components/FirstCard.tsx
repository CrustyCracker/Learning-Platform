import {useEffect, useState} from "react";

export function FirstCard() {
    const [question, setQuestion] = useState("ERROR");
    const [answer, setAnswer] = useState("ERROR");

    useEffect(() => {
        fetch("http://localhost:8080/cards/first")
            .then(res => res.json())
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