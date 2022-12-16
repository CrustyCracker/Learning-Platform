import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {ErrorResponse} from "../types/ErrorResponse";
import {Link, useParams} from "react-router-dom";
import {GroupResponse} from "../types/Groups";
import {CardResponse} from "../types/Cards";

interface GroupProps {
    onSuccess: (response: GroupResponse) => void,
    onError: (err: ErrorResponse) => void
}
// pzsp2 - przerobić useState na [card, setCard] zamiast rozbicia na mniejsze elementy
export function Group(props: GroupProps) {
    const [name, setName] = useState("");
    const [description, setDesctription] = useState("");
    const [difficulty, setDifficulty] = useState(-1);
    const [user, setUser] = useState("");
    const [cards, setCards] = useState<CardResponse[]>([]);
    const {id} = useParams();

    useEffect(() => {
        Requests.GroupId(Number(id)).then(res => {
            if (res.err) {
                setName(res.err.message)
                setDesctription(res.err.debugMessage)
                props.onError(res.err);
            }
            else if (res.res){
                setName(res.res.name);
                setDesctription(res.res.description);
                setDifficulty(res.res.difficulty);
                setUser(res.res.username);
                props.onSuccess(res.res);
            }
        });
    }, [props])

    const EditGroup = (e: FormEvent) => {
    }

    const DeleteGroup= (e: FormEvent) => {
    }

    const Learn = (e: FormEvent) => {
    }

    const Test = (e: FormEvent) => {
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
        <div className="container-fluid" style={{width: "80%"}}>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12" style={{textAlign: "start"}}>
                    <h1> {name} </h1>
                    <h4> Właściciel: {user} </h4>
                    <h4> Trudność: {difficulty} </h4>
                    <div>
                        <form onSubmit={Learn} style={{float: "left"}}>
                            <button type="submit" className="btn btn-outline-warning">Ucz się</button>
                        </form>
                        <form onSubmit={Test} style={{float: "left", marginLeft: "2%"}}>
                            <button type="submit" className="btn btn-outline-danger">Test</button>
                        </form>
                    </div>

                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card text-white bg-dark" style={{marginTop: "2%"}}>
                        <div className="card-header">
                            <small style={{textAlign: "start"}}>
                                Opis
                            </small>
                        </div>
                        <div className="card-body">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
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