import {useEffect, useState} from "react";

export function FirstCard() {
    const [question, setQuestion] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/cards")
            .then(res => res.json())
            .then(r => {
                setQuestion(r.question);
            })
    }, [])

    return <div>{question}</div>;
}