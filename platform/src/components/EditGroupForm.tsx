import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {GroupResponse} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate, useParams} from "react-router-dom";
import '../style/editGroupForm.css';

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

    const cardStyle = {
        // pzsp2 wywalić do css
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
                <input className="form-control" type="text" name="name" value={group.name} style={{marginBottom: "10%"}} maxLength={100} onChange={(e) => {
                    setGroup({...group, name: e.target.value})}} />
            </label>
            <div className="form">
                <label style={{margin: 0, textAlign: 'start'}}>
                    <small> Opis </small>
                    <textarea className="form-control" id="description" name="description" value={group.description} style={{marginBottom: "10%"}}
                              maxLength={1000} spellCheck="false" required onChange={(e) => {
                        setGroup({...group, description: e.target.value})}}>
                    </textarea>
                </label>
            </div>
            <label>
                <small> Trudność </small>
                <select className="form-select form-select-sm" id="difficulty" name="difficulty" value={group.difficulty}
                        onChange={(e) =>
                            setGroup({...group, difficulty: Number(e.target.value)})}  style={{marginBottom: "30%"}}>
                     {options.map((o) => (
                         <option key={o.value} value={o.value}>{o.label}</option>))}
                </select>
            </label>

            <div className="form-check" style={{textAlign: "start"}}>
                <input className="form-check-input" type="checkbox" name="isPublic" checked={group.isPublic} id="isPublic" onChange={(e) => {
                    if (e.target.value) setGroup({...group, isPublic: e.target.checked})
                }}/>
                <label className="form-check-label" htmlFor="isPublic" >
                    Publiczna
                </label>
            </div>

            <div style={{justifyContent: "center", marginTop: "10%"}}>
                <button type="submit" onClick={handleSubmit} className="btn btn-outline-success">Edytuj grupę</button>
            </div>
        </div>
    </form>
    </>)
    }
