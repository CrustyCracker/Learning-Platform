import React, {FormEvent, useState} from "react";
import {Requests} from "../requests/Requests";
import {GroupResponse, NewGroup} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate} from "react-router-dom";
import '../style/groupForm.css';

interface NewGroupFormProps {
    onSuccess: (response: GroupResponse) => void
    onError: (err: ErrorResponse) => void
}

export function NewGroupForm(props: NewGroupFormProps) {
    const [newGroup, setNewGroup] = useState({} as NewGroup);
    const navigate = useNavigate();

    let options = []
    for (let i=1; i <= 10; i++)
        options.push({label: i.toString(), value: i})

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
            else if (res.res){
                props.onSuccess(res.res)
            }
            navigate('/')
        });
    }

    // pzsp2 error handling i walidacja

    return (
        <div className="container-fluid pzsp2-groupform-cont">
            <div className="row pzsp2-groupform-row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <div className="card text-black bg-light pzsp2-groupform-card">
                        <label className="pzsp2-groupform-name">
                            <small> Nazwa </small>
                            <input className="form-control" type="text" name="name" value={newGroup.name} maxLength={100}
                                   onChange={(e) => {
                                setNewGroup({...newGroup, name: e.target.value})}} />
                        </label>
                        <label className="pzsp2-groupform-desc">
                            <small> Opis </small>
                            <textarea className="form-control" id="description" name="description" value={newGroup.description}
                                      maxLength={1000} spellCheck="false" required onChange={(e) => {
                                setNewGroup({...newGroup, description: e.target.value})}}>
                            </textarea>
                        </label>
                        <label className="pzsp2-groupform-diff">
                            <small> Trudność </small>
                            <select className="form-select form-select-sm pzsp2-groupform-select" id="difficulty" name="difficulty"
                                    value={newGroup.difficulty} onChange={(e) =>
                                        setNewGroup({...newGroup, difficulty: Number(e.target.value)})}>
                                 {options.map((o) => (
                                     <option key={o.value} value={o.value}>{o.label}</option>))}
                            </select>
                        </label>
                        <div className="form-check pzsp2-groupform-visibility">
                            <input className="form-check-input pzsp2-pubcheck-input" type="checkbox" name="isPublic" checked={newGroup.isPublic}
                                   id="isPublic" onChange={(e) => {
                                if (e.target.value) setNewGroup({...newGroup, isPublic: e.target.checked})
                            }}/>
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
            </div>
        </div>)
    }
