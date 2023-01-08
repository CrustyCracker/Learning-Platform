import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse, NewCard} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate, useParams} from 'react-router-dom';
import '../style/cardForm.css';
import {GroupResponse} from "../types/Groups";
import {Link} from "react-router-dom";
import {SecurityHelper} from "../helpers/SecurityHelper";

interface CardFormProps {
    onSuccess: (response: CardResponse) => void,
    onError: (err: ErrorResponse) => void,
    edit: boolean
}

export function CardForm(props: CardFormProps) {
    const [newCard, setNewCard] = useState({} as NewCard);
    const [card, setCard] = useState({} as CardResponse);
    const [groups, setGroups] = useState<GroupResponse[]>([]);
    const [addedgroups, setAddedGroups] = useState<GroupResponse[]>([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let tempGroups: GroupResponse[] = [];
        let tempCard = {} as CardResponse;
        Requests.myGroups().then(res => {
            if (res.err) {
                setGroups([]);
                props.onError(res.err);
            }
            else if (res.res){
                setGroups(res.res);
                tempGroups = res.res;
                if (props.edit) {
                    Requests.CardId(Number(id)).then(res => {
                        if (res.err) {
                            setCard({} as CardResponse);
                            props.onError(res.err);
                        }
                        else if (res.res){
                            tempCard = res.res;
                            let cardGroups: GroupResponse[] = tempGroups.filter(gr =>
                                tempCard.groups.some((grName) => gr.name === grName));
                            setAddedGroups(cardGroups);
                            props.onSuccess(res.res);
                            let groupIds = cardGroups.map(group => group.id)
                            setCard({...res.res, groupIds: groupIds})
                        }
                    });
                }
            }
        });
    }, [])

    const updateGroups = (group: GroupResponse) => {
        if (!addedgroups.some(group_ => group.id === group_.id)) {
            let tempAdded: GroupResponse[] = addedgroups.concat(group)
            let groupIds = tempAdded.map(group => group.id)
            setAddedGroups(tempAdded)
            if (!props.edit)
                setNewCard({...newCard, groupIds: groupIds})
            else
                setCard({...card, groupIds: groupIds})
        } else {
            let tempAdded: GroupResponse[] = addedgroups.filter(group_ => group.id !== group_.id);
            let groupIds = tempAdded.map(group => group.id)
            setAddedGroups(tempAdded)
            if (!props.edit)
                setNewCard({...newCard, groupIds: groupIds})
            else
                setCard({...card, groupIds: groupIds})
        }
    }

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
            setNewCard({question: "", answer: "", source: "",isPublic: false, groupIds: [], tagIds: []})}
            else{setNewCard({question: "", answer: "", source: "",isPublic: true, groupIds: [], tagIds: []})}
        });
    }

    const EditCard = (e: FormEvent) => {
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

    return (
        <div className="container-fluid pzsp2-cardform-cont">
            <div className="row gy-3">
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark pzsp2-cardform-card">
                        <div className="card-header">
                            Pytanie
                        </div>
                        <div className="form w-100 h-100">
                            {!props.edit && <textarea value={newCard.question} className="form-control" id="question" name="question"
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setNewCard({...newCard, question: e.target.value})}}>
                            </textarea>}
                            {props.edit &&<textarea value={card.question} className="form-control" id="question" name="question"
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setCard({...card, question: e.target.value})}}>
                            </textarea>}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark pzsp2-cardform-card" >
                        <div className="card-header">
                            Odpowiedź
                        </div>
                        <div className="form w-100 h-100">
                            {!props.edit && <textarea value={newCard.answer}  className="form-control" id="answer" name="answer"
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setNewCard({...newCard, answer: e.target.value})}}>
                            </textarea>}

                            {props.edit && <textarea value={card.answer}  className="form-control" id="answer" name="answer"
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setCard({...card, answer: e.target.value})}}>
                            </textarea>}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark pzsp2-cardform-card" >
                        <div className="card-header">
                            Źródło
                        </div>
                        <div className="form w-100 h-100">
                            {!props.edit && <textarea value={newCard.source} className="form-control" id="source" name="source"
                                      maxLength={2000} spellCheck="false" required onChange={(e) => {
                                 setNewCard({...newCard, source: e.target.value})}}>
                            </textarea>}
                            {props.edit && <textarea value={card.source} className="form-control" id="source" name="source"
                                      maxLength={2000} spellCheck="false" required onChange={(e) => {
                                setCard({...card, source: e.target.value})}}>
                            </textarea>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-check pzsp2-cardform-pubcheck">
                {!props.edit && <input className="form-check-input pzsp2-pubcheck-input" type="checkbox" name="isPublic"
                       checked={newCard.isPublic} id="isPublic" onChange={(e) => {
                                         if (e.target.value) setNewCard({...newCard, isPublic: e.target.checked})}}/>}
                {props.edit && <input className="form-check-input pzsp2-pubcheck-input" type="checkbox" name="isPublic"
                       checked={card.isPublic} id="isPublic" onChange={(e) => {
                                        if (e.target.value) setCard({...card, isPublic: e.target.checked})}}/>}
                    <label className="form-check-label" htmlFor="isPublic">
                        Publiczna

                    </label>
            </div>
            <div className="pzsp2-cardform-group-dropdown">
                <div className="btn-group">
                    <button type="button" className="btn btn-secondary btn-lg">Wybierz grupy</button>
                    <button type="button" className="btn btn-secondary btn-lg dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"/>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        {groups && groups.map(group => {
                            return <li key={group.id} ><div className="dropdown-item pzsp2-cardform-dropdown-item"
                                                            onClick={() => updateGroups(group)}>{group.name}</div></li>})}
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><Link className="dropdown-item" to="/groups/new"><i className="bi bi-plus-circle"/> Dodaj grupę</Link></li>
                    </ul>
                </div>
                <div>
                    <p className="pzsp2-cardform-groups-header">
                        Grupy: {addedgroups && addedgroups.map(group => {
                            return <span key={group.id} className="pzsp2-cardform-groups">{`${group.name}, `}</span>}
                    )}
                    </p>
                </div>
            </div>
            <form>
                {!props.edit && <div className="row">
                    <div className="btn-group pzsp2-cardform-buttons" role="group">
                        <div className="pzsp2-cardform-add-button">
                            <button type="submit" onClick={AddCard} className="btn btn-outline-success">Dodaj fiszkę</button>
                        </div>
                        <div className="pzsp2-cardform-addplus-button">
                            <button type="submit" onClick={AddCardAndNext} className="btn btn-outline-success">Dodaj fiszkę + kolejną</button>
                        </div>
                    </div>
                </div>}
                {props.edit && (SecurityHelper.amIAdmin() || card.username === SecurityHelper.getContext()?.username) && <div className="row">
                    <div className="pzsp2-cardform-edit-button">
                        <button type="submit" onClick={EditCard} className="btn btn-outline-success">Edytuj fiszkę</button>
                    </div>
                </div>}
            </form>
        </div>)
}
