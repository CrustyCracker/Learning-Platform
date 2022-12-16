import React, {FormEvent, useState} from "react";
import {Requests} from "../requests/Requests";
import {GroupResponse, NewGroup} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate} from "react-router-dom";

interface NewCardFormProps {
    onSuccess: (response: GroupResponse) => void
    onError: (err: ErrorResponse) => void
}

export function NewGroupForm(props: NewCardFormProps) {
    const [newGroup, setNewGroup] = useState<NewGroup>(
        {name: "", difficulty: 1, description: "",isPublic: false, cardIds: []}
    );

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

    return (
        <>
            <link rel="stylesheet" href="../style/newGroupForm.css"/>

            <form>
                <div className="card text-white bg-dark" style={cardStyle}>
                    <label style={{margin: 0, textAlign: 'start'}}>
                        <small> Nazwa </small>
                        <input className="form-control" type="text" name="name" style={{marginBottom: "10%"}} onChange={(e) => {
                        setNewGroup({...newGroup, name: e.target.value})}} />
                    </label>
                    <div className="form">
                        <label style={{margin: 0, textAlign: 'start'}}>
                            <small> Opis </small>
                            <textarea className="form-control" id="description" name="description" value={newGroup.description} style={{marginBottom: "10%"}}
                                      maxLength={500} spellCheck="false" required onChange={(e) => {
                                setNewGroup({...newGroup, description: e.target.value})}}>
                            </textarea>
                        </label>
                    </div>
                    <label >
                        <small> Trudność </small>
                        <select className="form-select form-select-sm">
                             {options.map((o) => (
                                 <option key={o.value} onSelect={() =>
                                    setNewGroup({...newGroup, difficulty: o.value})
                                 } value={o.value}>{o.label}</option>))}
                        </select>
                    </label>
                    <div style={{justifyContent: "center", marginTop: "10%"}}>
                        <button type="submit" onClick={handleSubmit} className="btn btn-outline-info">Dodaj grupę</button>
                    </div>
                </div>
            </form>
        </>)
    }
