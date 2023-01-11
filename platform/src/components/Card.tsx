import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate, useParams} from "react-router-dom";
import '../style/card.css';
import {isPublicToString} from "../helpers/NameHelpers";
import {SecurityHelper} from "../helpers/SecurityHelper";

interface CardProps {
    onSuccess: (response: CardResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function Card(props: CardProps) {
    const [card, setCard] = useState({} as CardResponse)
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
    }, [id, props])

    const EditCard = (e: FormEvent) => {
        e.preventDefault()
        navigate('/cards/'+ card.id + '/edit')
    }

    const DeleteCard = (e: FormEvent) => {
        e.preventDefault()
        Requests.deleteCard({id: card.id}).then(res => {
            if (res.err) {
                props.onError(res.err)
            }
            else if (res.res){
                navigate(-1);
                // pzsp2 powinno jeszcze wyświetlić komunikat, że usunięto
            }
        })
    }

    return <div className="container-fluid pzsp2-card-cont">
        <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 pzsp2-card-owner-text">
                <h1>
                Właściciel: {card.username}
                </h1>
                <h4>
                    {isPublicToString(card.isPublic)}
                </h4>
            </div>
        </div>
        <div className="row gy-3">
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-black bg-light pzsp2-card-card" >
                    <div className="card-header">
                        Pytanie
                    </div>
                    <div className="card-body">
                        <small className="card-text pzsp2-card-card-text">
                            {card.question}
                        </small>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-black bg-light pzsp2-card-card" >
                    <div className="card-header">
                        Odpowiedź
                    </div>
                    <div className="card-body">
                        <small className="card-text pzsp2-card-card-text">
                            {card.answer}
                        </small>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-black bg-light pzsp2-card-card" >
                    <div className="card-header">
                        Źródło
                    </div>
                    <div className="card-body">
                        <small className="card-text pzsp2-card-card-text">
                            {card.source}
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div className="row pzsp2-card-row-tag">
            <div className="col-lg-6 col-md-6 col-sm-6 pzsp2-card-tag-text">
                <h3>
                Tagi: {card.tagNames}
                </h3>
            </div>
            {(SecurityHelper.amIAdmin() || card.username === SecurityHelper.getContext()?.username) &&
                <div className="col-lg-6 col-md-6 col-sm-6 pzsp2-card-buttons">
                <form  className ="pzsp2-card-delete-button" onSubmit={DeleteCard}>
                    <button type="submit" className="btn btn-outline-danger">
                        Usuń
                    </button>
                </form>
                <form className ="pzsp2-card-edit-button" onSubmit={EditCard}>
                    <button type="submit" className="btn btn-outline-success">
                        Edytuj
                    </button>
                </form>
            </div>}
        </div>
        <div className="row pzsp2-card-row-grp">
            <div className="col-lg-6 col-md-12 col-sm-12 pzsp2-card-grp-text">
                <h3>
                    Grupy: {card.groupNames}
                </h3>
            </div>
        </div>
    </div>
}