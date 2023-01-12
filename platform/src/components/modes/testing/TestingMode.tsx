import {CardResponse} from "../../../types/Cards";
import React, {useEffect, useState} from "react";
import CardInTesting from "./CardInTesting";
import {useNavigate} from "react-router-dom";

type TestingModeProps = {
    cards: CardResponse[]
}

export default function TestingMode(props: TestingModeProps) {
    const [currCardIndex, setCurrCardIndex] = useState(0);
    const [answerValue, setAnswerValue] = useState(0);
    const [answered, setAnswered] = useState(false);
    const navigate = useNavigate();

    const card = props.cards.at(currCardIndex);

    useEffect(() => {
        if (props.cards && currCardIndex > 0 && currCardIndex === props.cards.length)
            navigate("/summary", {
                state: {score: answerValue, outOf: props.cards.length}
            })
    }, [currCardIndex, navigate])

    const addLastValue = (num: number) => {
        setAnswerValue(answerValue + num);
        setAnswered(true);
    }

    return <>
        {card && <CardInTesting card={card} onAnswer={addLastValue} />}
        <div className="container-fluid pzsp2-browse-cont">
            <div className="pzsp2-browse-buttons">
                {currCardIndex < props.cards.length && answered && <form className ="pzsp2-next-button"
                    onClick={() => {
                        setCurrCardIndex(currCardIndex + 1)
                        setAnswered(false);
                    }}>
                        <button type="button" className="btn btn-success">
                            {currCardIndex < props.cards.length - 1 ? "Następna" : "Podsumowanie"}
                        </button>
                    </form>
                }
                <div className="pzsp2-browse-count">
                    {currCardIndex + 1}/{props.cards.length}
                </div>
            </div>
        </div>
    </>
}