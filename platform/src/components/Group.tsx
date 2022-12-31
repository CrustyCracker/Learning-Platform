import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {ErrorResponse} from "../types/ErrorResponse";
import {Link, useParams, useNavigate} from "react-router-dom";
import {GroupResponse} from "../types/Groups";
import {CardResponse} from "../types/Cards";
import '../style/group.css';
import {isPublicToString} from "../helpers/NameHelpers";

interface GroupProps {
    onSuccess: (response: GroupResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function Group(props: GroupProps) {
    const [group, setGroup] = useState({} as GroupResponse);
    const [cards, setCards] = useState<CardResponse[]>([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Requests.GroupId(Number(id)).then(res => {
            if (res.err) {
                setGroup({} as GroupResponse);
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
        navigate('/groups/'+ group.id + '/edit')
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

    return (<>
        <link
            //pzsp2 -> zrobić ładny import bootstrapa
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
        />
        <div className="container-fluid pzsp2-group-info-cont">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 col-sm-12" >
                    <h1 className="pzsp2-group-name">
                        {group.name}
                    </h1>
                    <h4 className="pzsp2-group-user">
                        Właściciel: {group.username}
                    </h4>
                    <h4 className="pzsp2-group-diff">
                        Trudność: {group.difficulty}
                    </h4>
                    <h5 className="pzsp2-group-diff">
                    {isPublicToString(group.isPublic)}
                    </h5>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card text-black bg-light pzsp2-group-desc">
                        <div className="card-header">
                            Opis
                        </div>
                        <div className="card-body pzsp2-group-desc-body">
                            <small className="card-text pzsp2-group-desc-text">
                                {group.description}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12" >
                    <form className="pzsp2-group-learn-button" onSubmit={Learn}>
                        <button type="submit" className="btn btn-outline-warning">Ucz się</button>
                    </form>
                    <form className="pzsp2-group-test-button" onSubmit={Test}>
                        <button type="submit" className="btn btn-outline-danger">Test</button>
                    </form>
                </div>
            </div>
        </div>

        <table className={"table table-hover table-light pzsp2-group-cards-table"}>
            <thead>
            <tr>
                <th className="pzsp2-group-table-que">
                    Pytanie
                </th>
                <th className="pzsp2-group-table-ans">
                    Odpowiedź
                </th>
                <th className="pzsp2-group-table-src">
                    Źródło
                </th>
                <th className="pzsp2-group-table-lin"/>
            </tr>
            </thead>
            <tbody>
            {cards && cards.map(card => {
                return <tr key={card.id}>
                    <td className="pzsp2-group-td-wrap">
                        {card.question}
                    </td>
                    <td className="pzsp2-group-td-wrap">
                        {card.answer}
                    </td>
                    <td className="pzsp2-group-td-wrap">
                        {card.source}
                    </td>
                    <td><Link className="pzsp2-group-link" to={`/cards/${card.id}`}>{">"}</Link></td>
                </tr>
            })}
            </tbody>
        </table>
        <div className="container-fluid pzsp2-group-buttons-cont">
            <div className="row pzsp2-group-buttons-row">
                <div className="col-lg-12 col-md-12 col-sm-12 pzsp2-group-buttons-col">
                    <form className="pzsp2-group-delete-button" onSubmit={DeleteGroup}>
                        <button type="submit" className="btn btn-outline-danger">Usuń</button>
                    </form>
                    <form className="pzsp2-group-edit-button" onSubmit={EditGroup}>
                        <button type="submit" className="btn btn-outline-success">Edytuj</button>
                    </form>
                </div>
            </div>
        </div>
    </>)
}