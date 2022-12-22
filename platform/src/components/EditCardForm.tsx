import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate, useParams} from 'react-router-dom';
import '../style/cardForm.css';

interface EditCardFormProps {
    onSuccess: (response: CardResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function EditCardForm(props: EditCardFormProps) {
    const [card, setCard] = useState({} as CardResponse);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Requests.CardId(Number(id)).then(res => {
            if (res.err) {
                setCard({} as CardResponse);
                props.onError(res.err);
            }
            else if (res.res){
                setCard(res.res);
                props.onSuccess(res.res);
            }
        });
    }, [id])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!card)
            return;
        Requests.editCard(card).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res){
                props.onSuccess(res.res)
            }
            navigate('/cards/'+ card.id)
        });
    }

    return (<div className="container-fluid" style={{width: "80%"}}>
        <div className="row gy-3">
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card text-white bg-dark" style={{paddingBottom: 0}}>
                    <div className="card-header">Pytanie</div>
                        <div className="form w-100 h-100">
                            <textarea className="form-control" id="question" name="question" value={card.question}
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setCard({...card, question: e.target.value})}}>
                            </textarea>
                        </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card text-white bg-dark" >
                    <div className="card-header">Odpowiedź</div>
                    <div className="form w-100 h-100">
                        <textarea className="form-control" id="answer" name="answer" value={card.answer}
                                  maxLength={500} spellCheck="false" required onChange={(e) => {
                            setCard({...card, answer: e.target.value})}}>
                        </textarea>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card text-white bg-dark" >
                    <div className="card-header">Źródło</div>
                    <div className="form w-100 h-100">
                        <textarea className="form-control" id="source" name="source" value={card.source}
                                  maxLength={2000} spellCheck="false" required onChange={(e) => {
                                             setCard({...card, source: e.target.value})}}>
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-check" style={{textAlign: "start"}}>
            <input className="form-check-input" type="checkbox" name="isPublic" checked={card.isPublic} id="isPublic" onChange={(e) => {
                                     if (e.target.value) setCard({...card, isPublic: e.target.checked})
                                 }}/>
                <label className="form-check-label" htmlFor="isPublic">
                    Publiczna
                </label>
        </div>
        <form>
        <div className="row">
            <div className="btn-group" role="group" style={{justifyContent: "center"}}>
                <div style={{justifyContent: "center", marginTop: "10%"}}>
                    <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">Edytuj fiszkę</button>
                </div>
            </div>
        </div>
        </form>
    </div>)
}