import React, { FormEvent, useEffect, useState } from "react";
import { Requests } from "../requests/Requests";
import { GroupResponse } from "../types/Groups";
import { ErrorResponse } from "../types/ErrorResponse";
import { useNavigate, useParams } from "react-router-dom";
import { SecurityHelper } from "../helpers/SecurityHelper";
import { CardResponse } from "../types/Cards";
import { isPublicToString } from "../helpers/NameHelpers";
import {GetListItemColor} from "../helpers/StyleHelpers";

interface EditGroupFormProps {
    onSuccess: (response: GroupResponse) => void
    onError: (err: ErrorResponse) => void
    cards: CardResponse[]
}

export function EditGroupForm(props: EditGroupFormProps) {
    const [group, setGroup] = useState({} as GroupResponse);
    const { id } = useParams();
    const navigate = useNavigate();
    const [currCards, setCurrCards] = useState<CardResponse[]>([]);
    useEffect(() => {
        Requests.GroupId(Number(id)).then(res => {
            if (res.err) {
                setGroup({} as GroupResponse);
                props.onError(res.err);
            }
            else if (res.res) {
                setGroup(res.res);
                props.onSuccess(res.res);
            }
        });
        setCurrCards(props.cards)
    }, [id, props])

    let options = []
    for (let i = 1; i <= 10; i++)
        options.push({ label: i.toString(), value: i })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!group)
            return;
        Requests.editGroup(group).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res) {
                props.onSuccess(res.res)
                navigate('/groups/' + group.id)
            }
        });
    }

    const handleCheckboxChange = (e: any) => {
        const { value, checked } = e.target;
        if (checked) {
            setGroup({ ...group, cardIds: [...group.cardIds, Number(value)] })
        } else {
            // delete value from array
            setGroup({ ...group, cardIds: group.cardIds.filter((id) => id !== Number(value)) })
        }
    }

    return <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-8 p-3">
                <div className="card text-black bg-light pzsp2-groupform-card">
                    <label className="pzsp2-groupform-name">
                        <small> Nazwa </small>
                        <input className="form-control" type="text" name="name" value={group.name} maxLength={100}
                            onChange={(e) => {
                                setGroup({ ...group, name: e.target.value })
                            }} />
                    </label>
                    <label className="pzsp2-groupform-desc">
                        <small> Opis </small>
                        <textarea className="form-control" id="description" name="description" value={group.description}
                            maxLength={1000} spellCheck="false" required onChange={(e) => {
                                setGroup({ ...group, description: e.target.value })
                            }}>
                        </textarea>
                    </label>
                    <label className="pzsp2-groupform-diff">
                        <small> Trudność </small>
                        <select className="form-select form-select-sm pzsp2-groupform-select" id="difficulty" name="difficulty"
                            value={group.difficulty} onChange={(e) =>
                                setGroup({ ...group, difficulty: Number(e.target.value) })}>
                            {options.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>))}
                        </select>
                    </label>
                    <div className="form-check pzsp2-groupform-visibility">
                        <input className="form-check-input pzsp2-pubcheck-input" type="checkbox" name="isPublic" checked={group.isPublic}
                            id="isPublic" onChange={(e) => {
                                if (e.target.value) {
                                    setGroup({ ...group, isPublic: e.target.checked })
                                    if (e.target.checked) { setGroup({ ...group, isPublic: e.target.checked, cardIds: group.cardIds.filter((id) => currCards.some(card => card.id === id && card.isPublic)) }) }
                                }
                            }} />
                        <label className="form-check-label" htmlFor="isPublic" >
                            Publiczna
                        </label>
                    </div>
                    {(SecurityHelper.amIAdmin() || group.username === SecurityHelper.getContext()?.username) && <form>
                        <div className="pzsp2-groupform-submit">
                            <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">
                                Edytuj grupę
                            </button>
                        </div>
                    </form>}
                </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 p-3">
                <table className="table table-hover table-light pzsp2-groupform-table">
                    <thead>
                        <tr>
                            <th className="pzsp2-cardlist-table-tag">Fiszka</th>
                            <th className="pzsp2-cardlist-table-que">Pytanie</th>
                            <th className="pzsp2-cardlist-table-grp">Grupy</th>
                            <th className="pzsp2-cardlist-table-tag">Tagi</th>
                            <th className="pzsp2-cardlist-table-vis hide-on-large">Widoczność</th>
                            <th className="pzsp2-cardlist-table-vis hide-on-medium">Właściciel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currCards && currCards.map(card => {
                            const checked = group?.cardIds.some((id) => id === card.id) ?? false;

                            return (!group.isPublic || card.isPublic) && < tr key={card.id}
                                      className={GetListItemColor(card.isPublic, checked)}>
                                <td className="pzsp2-cardlist-td-wrap">
                                    <input className="pzsp2-groupform-checkbox" type="checkbox" value={card.id}
                                           id={card.id.toString()} onChange={handleCheckboxChange}
                                           checked={checked}
                                    />
                                </td>
                                <td className="pzsp2-cardlist-td-wrap">{card.question}</td>
                                <td className="pzsp2-cardlist-td-wrap">{card.groups}</td>
                                <td className="pzsp2-cardlist-td-wrap">{card.tags}</td>
                                <td className="hide-on-large">{isPublicToString(card.isPublic)}</td>
                                <td className="hide-on-medium">{card.username}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}
