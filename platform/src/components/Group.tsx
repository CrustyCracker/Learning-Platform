import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {ErrorResponse} from "../types/ErrorResponse";
import {Link, useParams} from "react-router-dom";
import {GroupResponse} from "../types/Groups";
import {CardResponse} from "../types/Cards";
import '../style/group.css';

interface GroupProps {
    onSuccess: (response: GroupResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function Group(props: GroupProps) {
    const [group, setGroup] = useState({} as GroupResponse);
    //pzsp2 - zaimplementować wczytywanie listy fiszek
    const [cards, setCards] = useState<CardResponse[]>([]);
    const {id} = useParams();

    useEffect(() => {
        Requests.GroupId(Number(id)).then(res => {
            if (res.err) {
                setGroup({...{} as GroupResponse, name: res.err.message})
                setGroup({...{} as GroupResponse, description: res.err.debugMessage})
                props.onError(res.err);
            }
            else if (res.res){
                setGroup(res.res);
                props.onSuccess(res.res);
            }
        });
        Requests.CardsByGroupsId(Number(id)).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res){
                setCards(res.res);
            }
        });
    }, [id])

    const EditGroup = (e: FormEvent) => {
        e.preventDefault()
    }

    const DeleteGroup= (e: FormEvent) => {
        e.preventDefault()
    }

    const Learn = (e: FormEvent) => {
        e.preventDefault()
    }

    const Test = (e: FormEvent) => {
        e.preventDefault()
    }

    const tableStyle = {
        width: "80%",
        marginLeft: "auto",
        marginTop: "1%",
        marginRight: "auto",
        tableLayout: "fixed" as unknown as undefined
    }

    const tdStyleWrap = {
        wordWrap: "break-word" as unknown as undefined
    }

    return (<>
        <link
            //pzsp2 -> zrobić ładny import bootstrapa
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
        />
        <div className="container-fluid" style={{width: "80%", padding: "0"}}>
            <div className="row" >
                <div className="col-lg-6 col-md-12 col-sm-12" >
                    <h1 style={{wordWrap: "break-word", textAlign: "center"}}> {group.name} </h1>
                    <h4 style={{textAlign: "center"}}> Właściciel: {group.username} </h4>
                    <h4 style={{textAlign: "center"}}> Trudność: {group.difficulty} </h4>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark" style={{marginTop: "2%"}}>
                        <div className="card-header">Opis</div>
                        <div className="card-body" style={{maxWidth: "90%", lineHeight: 1}}>
                            <small className="card-text" style={{wordWrap: "break-word", fontSize: "15px"}}>
                                {group.description}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={Learn} style={{float: "left", margin: "0%, 0%, 0%, 0%"}}>
                <button type="submit" className="btn btn-outline-warning">Ucz się</button>
            </form>
            <form onSubmit={Test} style={{float: "left", marginLeft: "1%"}}>
                <button type="submit" className="btn btn-outline-danger">Test</button>
            </form>
        </div>
        <table style={tableStyle} className={"table table-dark center"}>
            <thead>
            <tr>
                <th style={{ width: "25%" }}>Pytanie</th>
                <th style={{ width: "25%" }}>Odpowiedź</th>
                <th style={{ width: "25%" }}>Źródło</th>
                <th style={{ width: "5%" }}> </th>
            </tr>
            </thead>
            <tbody>
            {cards && cards.map(card => {
                return <tr key={card.id}>
                    <td style={tdStyleWrap}>{card.question}</td>
                    <td style={tdStyleWrap}>{card.answer}</td>
                    <td style={tdStyleWrap}>{card.source}</td>
                    <td><Link to={`/cards/${card.id}`} style={{ textDecoration: 'none' }}>{">"}</Link></td>
                </tr>
            })}
            </tbody>
        </table>
        <div className="container-fluid" style={{width: "80%"}}>
            <div className="row" style={{ marginTop: "5%"}}>
                <div className="col-lg-12 col-md-12 col-sm-12" style={{textAlign: "end"}}>
                    <form onSubmit={EditGroup} style={{float: "right"}}>
                        <button type="submit" className="btn btn-outline-danger">Usuń</button>
                    </form>
                    <form onSubmit={DeleteGroup} style={{float: "right", marginRight: "2%"}}>
                        <button type="submit" className="btn btn-outline-info">Edytuj</button>
                    </form>
                </div>
            </div>
        </div>
    </>)
}