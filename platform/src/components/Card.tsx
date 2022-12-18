import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate, useParams} from "react-router-dom";
import '../style/card.css';

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
                setCard({...{} as CardResponse, question: res.err.message});
                setCard({...{} as CardResponse, answer: res.err.debugMessage});
                props.onError(res.err);
            }
            else if (res.res){
                setCard(res.res);
                props.onSuccess(res.res);
            }
        });
    }, [id])

    const EditCard = (e: FormEvent) => {
        e.preventDefault()
        navigate('/cards/'+ card.id + '/edit')
    }

    const DeleteCard = (e: FormEvent) => {
        e.preventDefault()
        // pzsp2 dorobić to
    }

    return <div className="container-fluid" style={{width: "80%"}}>
        <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12" style={{textAlign: "start"}}>
                Właściciel: {card.username}
            </div>
        </div>
        <div className="row gy-3">
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-white bg-dark" >
                    <div className="card-header">Pytanie</div>
                    <div className="card-body" style={{maxWidth: "90%"}}>
                        <small className="card-text" style={{wordWrap: "break-word"}}>
                            {card.question}
                        </small>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-white bg-dark" >
                    <div className="card-header">Odpowiedź</div>
                    <div className="card-body" style={{maxWidth: "90%"}}>
                        <small className="card-text" style={{wordWrap: "break-word"}}>
                            {card.answer}
                        </small>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-white bg-dark" >
                    <div className="card-header">Źródło</div>
                    <div className="card-body" style={{maxWidth: "90%"}}>
                        <small className="card-text" style={{wordWrap: "break-word"}}>
                            {card.source}
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div className="row" style={{ marginTop: "5%"}}>
            <div className="col-lg-6 col-md-6 col-sm-6" style={{textAlign: "start"}}>
                Tagi: {card.tags}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6" style={{textAlign: "end"}}>
                <form onSubmit={DeleteCard} style={{float: "right"}}>
                    <button type="submit" className="btn btn-outline-danger">Usuń</button>
                </form>
                <form onSubmit={EditCard} style={{float: "right", marginRight: "2%"}}>
                    <button type="submit" className="btn btn-outline-info">Edytuj</button>
                </form>
            </div>

        </div>
        <div className="row" style={{ marginTop: "2%", marginBottom: "2%"}}>
            <div className="col-lg-6 col-md-12 col-sm-12" style={{textAlign: "start"}}>
                Grupy: {card.groups}
            </div>
        </div>
    </div>
}