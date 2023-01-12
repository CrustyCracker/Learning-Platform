import {CardResponse} from "../../../types/Cards";
import React, {useState} from "react";
import CardInTesting from "./CardInTesting";
import {Summary} from "./Summary";

type TestingModeProps = {
    cards: CardResponse[]
}

export default function TestingMode(props: TestingModeProps) {
    const [currCardIndex, setCurrCardIndex] = useState(0);
    const [answerValue, setAnswerValue] = useState(0);
    const [answered, setAnswered] = useState(false);
    const card = props.cards.at(currCardIndex);

    const addLastValue = (num: number) => {
        setAnswerValue(answerValue + num);
        setAnswered(true);
    }

    return <>
        {card && <CardInTesting card={card} onAnswer={addLastValue} />}
        {!card && <Summary score={answerValue} outOf={props.cards.length} />}
        {currCardIndex < props.cards.length && answered && <div className ="pzsp2-next-testing"
            onClick={() => {
                setCurrCardIndex(currCardIndex + 1)
                setAnswered(false);
            }}>
                <button type="button" className="btn btn-success">
                    {currCardIndex < props.cards.length - 1 ? "Następna" : "Podsumowanie"}
                </button>
            </div>
        }
    </>
}