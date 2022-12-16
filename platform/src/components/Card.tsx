import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import { useParams } from "react-router-dom";
import '../style/card.css';

interface CardProps {
    onSuccess: (response: CardResponse) => void,
    onError: (err: ErrorResponse) => void
}
// pzsp2 - przerobić useState na [card, setCard] zamiast rozbicia na mniejsze elementy
export function Card(props: CardProps) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [source, setSource] = useState("");
    const [tags, setTags] = useState<string[]>([""]);
    const [groups, setGroups] = useState<string[]>([""]);
    const [user, setUser] = useState("");
    const {id} = useParams();

    useEffect(() => {
        Requests.CardId(Number(id)).then(res => {
            if (res.err) {
                setQuestion(res.err.message)
                setAnswer(res.err.debugMessage)
                props.onError(res.err);
            }
            else if (res.res){
                setQuestion(res.res.question);
                setAnswer(res.res.answer);
                setSource(res.res.source);
                setTags(res.res.tags);
                setGroups(res.res.groups);
                setUser(res.res.username)
                props.onSuccess(res.res);
            }
        });
    }, [props])

    const EditCard = (e: FormEvent) => {
    }

    const DeleteCard = (e: FormEvent) => {
    }

    return <div className="container-fluid" style={{width: "80%"}}>
            <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12" style={{textAlign: "start"}}>
                    Właściciel: {user}
                </div>
            </div>
            <div className="row gy-3">
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card h-100 text-white bg-dark" >
                        <div className="card-header">Pytanie</div>
                        <div className="card-body">
                                {question}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card h-100 text-white bg-dark" >
                        <div className="card-header">Odpowiedź</div>
                        <div className="card-body">
                                {answer}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card h-100 text-white bg-dark" >
                        <div className="card-header">Źródło</div>
                        <div className="card-body">
                                {source}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: "5%"}}>
                <div className="col-lg-6 col-md-6 col-sm-6" style={{textAlign: "start"}}>
                    Tagi: {tags}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6" style={{textAlign: "end"}}>
                    <form onSubmit={EditCard} style={{float: "right"}}>
                        <button type="submit" className="btn btn-outline-danger">Usuń</button>
                    </form>
                    <form onSubmit={DeleteCard} style={{float: "right", marginRight: "2%"}}>
                        <button type="submit" className="btn btn-outline-info">Edytuj</button>
                    </form>
                </div>

            </div>
            <div className="row" style={{ marginTop: "2%", marginBottom: "2%"}}>
                <div className="col-lg-6 col-md-12 col-sm-12" style={{textAlign: "start"}}>
                    Grupy: {groups}
                </div>
            </div>
        </div>
}