import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Requests } from "../requests/Requests";
import { GroupResponse, NewGroup } from "../types/Groups";
import { ErrorResponse } from "../types/ErrorResponse";
import { useNavigate } from "react-router-dom";
import '../style/groupForm.css';
import { CardResponse } from "../types/Cards";
import { isPublicToString } from "../helpers/NameHelpers";

interface NewGroupFormProps {
    onSuccess: (response: GroupResponse) => void
    onError: (err: ErrorResponse) => void
    cards: CardResponse[]
}

export function NewGroupForm(props: NewGroupFormProps) {
    const [newGroup, setNewGroup] = useState({} as NewGroup);
    const navigate = useNavigate();
    const [currCards, setCurrCards] = useState<CardResponse[]>([]);

    useEffect(() => {
        setCurrCards(props.cards)
        setNewGroup({ name: "", description: "", cardIds: [], difficulty: 1, isPublic: false })
    }, [props])

    let options = []
    for (let i = 1; i <= 10; i++)
        options.push({ label: i.toString(), value: i })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!newGroup)
            return;
        if (newGroup.difficulty === undefined)
            newGroup.difficulty = 1;
        Requests.createGroup(newGroup).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res) {
                props.onSuccess(res.res)
            }
            navigate('/')
        });
    }
    const handleCheckboxChange = (e: any) => {
        const { value, checked } = e.target;
        if (checked) {
            setNewGroup({ ...newGroup, cardIds: [...newGroup.cardIds, Number(value)] })
        } else {
            // delete value from array
            setNewGroup({ ...newGroup, cardIds: newGroup.cardIds.filter((id) => id !== Number(value)) })
        }
    }

    // pzsp2 error handling i walidacja

    return (
        <div className="row">
            <div className="col-lg-3 col-md-6 col-lg-3 p-3">
                <div className="card text-black bg-light pzsp2-groupform-card">
                    <label className="pzsp2-groupform-name">
                        <small> Nazwa </small>
                        <input className="form-control" type="text" name="name" value={newGroup.name} maxLength={100}
                            onChange={(e) => {
                                setNewGroup({ ...newGroup, name: e.target.value })
                            }} />
                    </label>
                    <label className="pzsp2-groupform-desc">
                        <small> Opis </small>
                        <textarea className="form-control" id="description" name="description" value={newGroup.description}
                            maxLength={1000} spellCheck="false" required onChange={(e) => {
                                setNewGroup({ ...newGroup, description: e.target.value })
                            }}>
                        </textarea>
                    </label>
                    <label className="pzsp2-groupform-diff">
                        <small> Trudność </small>
                        <select className="form-select form-select-sm pzsp2-groupform-select" id="difficulty" name="difficulty"
                            value={newGroup.difficulty} onChange={(e) =>
                                setNewGroup({ ...newGroup, difficulty: Number(e.target.value) })}>
                            {options.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>))}
                        </select>
                    </label>
                    <div className="form-check pzsp2-groupform-visibility">
                        <input className="form-check-input pzsp2-pubcheck-input" type="checkbox" name="isPublic" checked={newGroup.isPublic}
                            id="isPublic" onChange={(e) => {
                                if (e.target.value) {
                                    setNewGroup({ ...newGroup, isPublic: e.target.checked })
                                    if (e.target.checked) { setNewGroup({ ...newGroup, isPublic: e.target.checked, cardIds: newGroup.cardIds.filter((id) => currCards.some(card => card.id === id && card.isPublic)) }) }
                                }
                            }} />
                        <label className="form-check-label" htmlFor="isPublic" >
                            Publiczna
                        </label>
                    </div>
                    <form>
                        <div className="pzsp2-groupform-submit">
                            <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">
                                Dodaj grupę
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="col-lg-3 col-md-6 col-lg-9 p-3">
                <table className={"table table-hover table-light"}>
                    <thead>
                        <tr>
                            <th className="pzsp2-cardlist-table-tag">Fiszka</th>
                            <th className="pzsp2-cardlist-table-que">Pytanie</th>
                            <th className="pzsp2-cardlist-table-grp">Grupy</th>
                            <th className="pzsp2-cardlist-table-tag">Tagi</th>
                            <th className="pzsp2-cardlist-table-vis hide-on-small">Widoczność</th>
                            <th className="pzsp2-cardlist-table-vis hide-on-small">Właściciel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currCards && currCards.map(card => {

                            return (card.isPublic || !card.isPublic && !newGroup.isPublic) && < tr key={card.id} >
                                < td className="pzsp2-cardlist-td-wrap"> <input className="pzsp2-groupform-checkbox" type="checkbox" value={card.id} id={card.id.toString()} onChange={handleCheckboxChange} checked={newGroup?.cardIds.some((id) => id == card.id) ?? false} /></td>
                                <td className="pzsp2-cardlist-td-wrap">{card.question}</td>
                                <td className="pzsp2-cardlist-td-wrap">{card.groupNames}</td>
                                <td className="pzsp2-cardlist-td-wrap">{card.tagNames}</td>
                                <td className="hide-on-small">{isPublicToString(card.isPublic)}</td>
                                <td className="hide-on-small">{card.username}</td>
                            </tr>
                        })}
                    </tbody>
                </table >
            </div>
        </div>
    )
}
