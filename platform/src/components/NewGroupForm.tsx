import React, {FormEvent, useState} from "react";
import {Requests} from "../requests/Requests";
import {GroupResponse, NewGroup} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate} from "react-router-dom";
import '../style/newGroupForm.css';

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

    const cardStyle = {
        margin: "5% 0",
        minHeight: '600px',
        minWidth: '400px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    }

    return (<>
    <link rel="stylesheet" href="../style/newGroupForm.css"/>
    <form>
        <div className="card text-white bg-dark" style={cardStyle}>
            <label style={{margin: 0, textAlign: 'start'}}>
                <small> Nazwa </small>
                <input className="form-control" type="text" name="name" style={{marginBottom: "10%"}} maxLength={100} onChange={(e) => {
                    setNewGroup({...newGroup, name: e.target.value})}} />
            </label>
            <div className="form">
                <label style={{margin: 0, textAlign: 'start'}}>
                    <small> Opis </small>
                    <textarea className="form-control" id="description" name="description" value={newGroup.description} style={{marginBottom: "10%"}}
                              maxLength={1000} spellCheck="false" required onChange={(e) => {
                        setNewGroup({...newGroup, description: e.target.value})}}>
                    </textarea>
                </label>
            </div>
            <label>
                <small> Trudność </small>
                <select className="form-select form-select-sm" id="difficulty" name="difficulty" value={newGroup.difficulty}
                        onChange={(e) =>
                            setNewGroup({...newGroup, difficulty: Number(e.target.value)})}  style={{marginBottom: "30%"}}>
                     {options.map((o) => (
                         <option key={o.value} value={o.value}>{o.label}</option>))}
                </select>
            </label>

            <div className="form-check" style={{textAlign: "start"}}>
                <input className="form-check-input" type="checkbox" name="isPublic" checked={newGroup.isPublic} id="isPublic" onChange={(e) => {
                    if (e.target.value) setNewGroup({...newGroup, isPublic: e.target.checked})
                }}/>
                <label className="form-check-label" htmlFor="isPublic" >
                    Publiczna
                </label>
            </div>

            <div style={{justifyContent: "center", marginTop: "10%"}}>
                <button type="submit" onClick={handleSubmit} className="btn btn-outline-info">Dodaj grupę</button>
            </div>
        </div>
    </form>
    </>)
    }
