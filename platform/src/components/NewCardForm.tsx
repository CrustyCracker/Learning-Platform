import React, {FormEvent, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse, NewCard} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate} from 'react-router-dom';
import '../style/newCardForm.css';

interface NewCardFormProps {
    onSuccess: (response: CardResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function NewCardForm(props: NewCardFormProps) {
    const [newCard, setNewCard] = useState({} as NewCard);
    const navigate = useNavigate();

    const AddCard = (e: FormEvent) => {
        e.preventDefault();
        if (!newCard)
            return;
        Requests.createCard(newCard).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res){
                props.onSuccess(res.res)
            }
            navigate('/')
        });
    }

    const AddCardAndNext = (e: FormEvent) => {
        e.preventDefault();
        if (!newCard)
            return;
        Requests.createCard(newCard).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res){
                props.onSuccess(res.res)
            }
            if(newCard.isPublic == false){
            setNewCard({question: "", answer: "", source: "",isPublic: false, groupIds: [], tagIds: []})}
            else{setNewCard({question: "", answer: "", source: "",isPublic: true, groupIds: [], tagIds: []})}
        });
    }

    // pzsp2 error handling i walidacja

    return (<div className="container-fluid" style={{width: "80%"}}>
        <form>
        <div className="row gy-3">
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card text-white bg-dark" style={{paddingBottom: 0}}>
                    <div className="card-header">Pytanie</div>
                        <div className="form w-100 h-100">
                            <textarea value={newCard.question} className="form-control" id="question" name="question"
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setNewCard({...newCard, question: e.target.value})}}>
                            </textarea>
                        </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card text-white bg-dark" >
                    <div className="card-header">Odpowiedź</div>
                    <div className="form w-100 h-100">
                        <textarea value={newCard.answer}  className="form-control" id="answer" name="answer"
                                  maxLength={500} spellCheck="false" required onChange={(e) => {
                            setNewCard({...newCard, answer: e.target.value})}}>
                        </textarea>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card text-white bg-dark" >
                    <div className="card-header">Źródło</div>
                    <div className="form w-100 h-100">
                        <textarea value={newCard.source} className="form-control" id="source" name="source"
                                  maxLength={2000} spellCheck="false" required onChange={(e) => {
                                             setNewCard({...newCard, source: e.target.value})}}>
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-check" style={{textAlign: "start"}}>
            <input className="form-check-input" type="checkbox" name="isPublic" checked={newCard.isPublic} id="isPublic" onChange={(e) => {
                                     if (e.target.value) setNewCard({...newCard, isPublic: e.target.checked})
                                 }}/>
                <label className="form-check-label" htmlFor="isPublic">
                    Publiczna
                </label>
        </div>
        <div className="row">
            <div className="btn-group" role="group" aria-label="Basic example" style={{justifyContent: "center"}}>
                <div style={{float: "left", marginRight: "2%"}}>
                    <button type="submit" onClick={AddCard} className="btn btn-outline-info">Dodaj fiszkę</button>
                </div>
                <div style={{float: "right", marginRight: "2%"}}>
                    <button type="submit" onClick={AddCardAndNext} className="btn btn-outline-info">Dodaj fiszkę + kolejną</button>
                </div>
            </div>
        </div>
        </form>
    </div>)
}