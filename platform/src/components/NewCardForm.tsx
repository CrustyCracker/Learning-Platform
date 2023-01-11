import React, {FormEvent, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse, NewCard} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate} from 'react-router-dom';
import '../style/cardForm.css';

interface CardFormProps {
    onSuccess: (response: CardResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function NewCardForm(props: CardFormProps) {
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
            if(!newCard.isPublic){
            setNewCard({question: "", answer: "", source: "",isPublic: false, groupsIds: [], tagIds: []})}
            else{setNewCard({question: "", answer: "", source: "",isPublic: true, groupsIds: [], tagIds: []})}
        });
    }

    return (
        <div className="container-fluid pzsp2-cardform-cont">
            <div className="row gy-3">
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark pzsp2-cardform-card">
                        <div className="card-header">
                            Pytanie
                        </div>
                        <div className="form w-100 h-100">
                            <textarea value={newCard.question} className="form-control" id="question" name="question"
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setNewCard({...newCard, question: e.target.value})}}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark pzsp2-cardform-card" >
                        <div className="card-header">
                            Odpowiedź
                        </div>
                        <div className="form w-100 h-100">
                            <textarea value={newCard.answer}  className="form-control" id="answer" name="answer"
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setNewCard({...newCard, answer: e.target.value})}}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark pzsp2-cardform-card" >
                        <div className="card-header">
                            Źródło
                        </div>
                        <div className="form w-100 h-100">
                            <textarea value={newCard.source} className="form-control" id="source" name="source"
                                      maxLength={2000} spellCheck="false" required onChange={(e) => {
                                                 setNewCard({...newCard, source: e.target.value})}}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        <div className="form-check pzsp2-cardform-pubcheck">
            <input className="form-check-input pzsp2-pubcheck-input" type="checkbox" name="isPublic"
                   checked={newCard.isPublic} id="isPublic" onChange={(e) => {
                                     if (e.target.value) setNewCard({...newCard, isPublic: e.target.checked})}}/>
                <label className="form-check-label" htmlFor="isPublic">
                    Publiczna
                </label>
        </div>
        <form>
        <div className="row">
            <div className="btn-group pzsp2-cardform-buttons" role="group">
                <div className="pzsp2-cardform-add-button">
                    <button type="submit" onClick={AddCard} className="btn btn-outline-success">Dodaj fiszkę</button>
                </div>
                <div className="pzsp2-cardform-addplus-button">
                    <button type="submit" onClick={AddCardAndNext} className="btn btn-outline-success">Dodaj fiszkę + kolejną</button>
                </div>
            </div>
        </div>
        </form>
    </div>)
}