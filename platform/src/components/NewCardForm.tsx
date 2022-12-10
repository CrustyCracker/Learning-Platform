import React, {FormEvent, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse, NewCard} from "../types/Cards";

interface NewCardFormProps {
    onSuccess: (response: CardResponse) => void
}

export function NewCardForm(props: NewCardFormProps) {
    const [newCard, setNewCard] = useState<NewCard>(
        {question: "", answer: "", source: "",isPublic: false, groupIds: [], tagIds: []}
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (newCard)
            Requests.createCard(newCard).then(r => props.onSuccess(r));
    }

    // pzsp2 error handling i walidacja

    return <div>
        <h1>Nowa fiszka</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Pytanie</p>
                <input type="text" name="question" required onChange={(e) => {
                    setNewCard({...newCard, question: e.target.value})
                }} />
            </label>
            <label>
                <p>Odpowiedź</p>
                <input type="text" name="answer" required onChange={(e) => {
                    setNewCard({...newCard, answer: e.target.value})
                }} />
            </label>
            <label>
                <p>Źródła</p>
                <input type="text" name="source" onChange={(e) => {
                    setNewCard({...newCard, source: e.target.value})
                }} />
            </label>
            <div>
                <label>
                    <input type="checkbox" name="isPublic" checked={newCard.isPublic} onChange={(e) => {
                        if (e.target.value) setNewCard({...newCard, isPublic: e.target.checked})
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