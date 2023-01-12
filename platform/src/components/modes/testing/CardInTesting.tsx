import {CardResponse} from "../../../types/Cards";
import React, {useEffect, useState} from "react";

export default function CardInTesting(props: {card: CardResponse, onAnswer: (num: number) => void}) {
    const [confirmed, setConfirmed] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const card = props.card;

    useEffect(() => {
        setConfirmed(false);
        setUserAnswer("");
    }, [props.card])

    return <>
    <div className="container-fluid pzsp2-card-cont">
        <div className="row">
            <div className="card h-100 text-black bg-light pzsp2-card-card" style={{marginBottom: "2%"}} >
                <div className="card-header">
                    <strong>Pytanie</strong>
                </div>
                <div className="card-body">
                    <small className="card-text pzsp2-card-card-text">
                        {card.question}
                    </small>
                </div>
            </div>
        </div>
        <div className="row gy-3">
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card text-white bg-dark pzsp2-cardform-card">
                    <div className="card-header">
                        Twoja odpowiedź
                    </div>
                    <div className="form w-100 h-100">
                        <textarea className="form-control" id="question" name="question" value={userAnswer}
                            maxLength={500} spellCheck="false" onChange={(e) => {
                                setUserAnswer(e.target.value)
                            }} readOnly={confirmed}>
                        </textarea>
                    </div>
                </div>
                {!confirmed ? <form className ="pzsp2-prev-button" onClick={() => setConfirmed(true)}>
                        <button type="button" className="btn btn-outline-success">
                            Zatwierdź odpowiedź
                        </button>
                    </form> :
                    <div className ="pzsp2-prev-button">
                        <button type="button" className="btn btn-success">
                            Odpowiedź zatwierdzona
                        </button>
                    </div>
                }
            </div>
            {confirmed && <>
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark pzsp2-cardform-card test-mode-color" >
                        <div className="card-header">
                            Poprawna odpowiedź
                        </div>
                        <div className="form w-100 h-100">
                        <textarea value={card.answer} className="form-control" id="answer" name="answer"
                              maxLength={500} spellCheck="false" readOnly />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark pzsp2-cardform-card test-mode-color" >
                        <div className="card-header">
                            Źródło
                        </div>
                        <div className="form w-100 h-100">
                        <textarea value={card.source} className="form-control" id="source" name="source"
                              maxLength={500} spellCheck="false" readOnly />
                        </div>
                    </div>
                </div>
            </>}
        </div>
        <div className="row">
            {confirmed && <>
                <h4>Jak sobie poradziłeś?</h4>
                <div className="btn-group-lg" role="group">
                    <button type="button" className="btn btn-outline-danger pzsp2-item-button"
                        onClick={() => props.onAnswer(0)}>Oblane</button>
                    <button type="button" className="btn btn-outline-secondary pzsp2-item-button"
                        onClick={() => props.onAnswer(0.5)}>Średnio na jeża</button>
                    <button type="button" className="btn btn-outline-primary pzsp2-item-button"
                        onClick={() => props.onAnswer(1)}>Świetnie</button>
                </div>
            </>}
        </div>
    </div>
    </>
}