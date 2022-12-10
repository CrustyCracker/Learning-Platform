import React, {FormEvent, useState} from "react";
import {Requests} from "../requests/Requests";
import {GroupResponse, NewGroup} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";

interface NewCardFormProps {
    onSuccess: (response: GroupResponse) => void
    onError: (err: ErrorResponse) => void
}

export function NewGroupForm(props: NewCardFormProps) {
    const [newGroup, setNewGroup] = useState<NewGroup>(
        {name: "", difficulty: 1, description: "",isPublic: false, cardIds: []}
    );

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
        });
    }

    // pzsp2 error handling i walidacja

    return <div>
        <h1>Nowa grupa</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Nazwa</p>
                <input type="text" name="name" required onChange={(e) => {
                    setNewGroup({...newGroup, name: e.target.value})
                }} />
            </label>
            <label>
                <p>Opis</p>
                <input type="text" name="description" onChange={(e) => {
                    setNewGroup({...newGroup, description: e.target.value})
                }} />
            </label>
            <label>
                <p>Trudność</p>
                <select>
                    {options.map((o) => (
                        <option onSelect={() =>
                            setNewGroup({...newGroup, difficulty: o.value})
                        } value={o.value}>{o.label}</option>
                    ))}
                </select>
            </label>
            <div>
                <label>
                    <input type="checkbox" name="isPublic" checked={newGroup.isPublic} onChange={(e) => {
                        setNewGroup({...newGroup, isPublic: e.target.checked})
                    }}/>
                    Publiczna
                </label>
            </div>
            <div>
                <button type="submit">Zapisz</button>
            </div>
        </form>
    </div>
}