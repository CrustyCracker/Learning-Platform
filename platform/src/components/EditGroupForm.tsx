import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {GroupResponse} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate, useParams} from "react-router-dom";

interface EditGroupFormProps {
    onSuccess: (response: GroupResponse) => void
    onError: (err: ErrorResponse) => void
}

export function EditGroupForm(props: EditGroupFormProps) {
    const [group, setGroup] = useState({} as GroupResponse);
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
    }, [id])


    let options = []
    for (let i=1; i <= 10; i++)
        options.push({label: i.toString(), value: i})

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!group)
            return;
        Requests.editGroup(group).then(res => {
            if (res.err) {
                props.onError(res.err);
            }
            else if (res.res){
                props.onSuccess(res.res)
            }
            navigate('/groups/'+ group.id)
        });
    }

    return (
        <div className="container-fluid pzsp2-groupform-cont">
            <div className="row pzsp2-groupform-row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <div className="card text-black bg-light pzsp2-groupform-card">
                        <label className="pzsp2-groupform-name">
                            <small> Nazwa </small>
                            <input className="form-control" type="text" name="name" value={group.name} maxLength={100}
                                   onChange={(e) => {
                                setGroup({...group, name: e.target.value})}} />
                        </label>
                        <label className="pzsp2-groupform-desc">
                            <small> Opis </small>
                            <textarea className="form-control" id="description" name="description" value={group.description}
                                      maxLength={1000} spellCheck="false" required onChange={(e) => {
                                setGroup({...group, description: e.target.value})}}>
                            </textarea>
                        </label>
                        <label className="pzsp2-groupform-diff">
                            <small> Trudność </small>
                            <select className="form-select form-select-sm pzsp2-groupform-select" id="difficulty" name="difficulty"
                                    value={group.difficulty} onChange={(e) =>
                                setGroup({...group, difficulty: Number(e.target.value)})}>
                                {options.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>))}
                            </select>
                        </label>
                        <div className="form-check">
                            <input className="form-check-input pzsp2-pubcheck-input" type="checkbox" name="isPublic" checked={group.isPublic}
                                   id="isPublic" onChange={(e) => {
                                if (e.target.value) setGroup({...group, isPublic: e.target.checked})
                            }}/>
                            <label className="form-check-label" htmlFor="isPublic" >
                                Publiczna
                            </label>
                        </div>
                        <form>
                            <div className="pzsp2-groupform-submit">
                                <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">
                                    Edytuj grupę
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
}

