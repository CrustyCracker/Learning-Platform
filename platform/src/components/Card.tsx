import {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import {useNavigate, useParams} from "react-router-dom";
import '../style/card.css';
import {CardView} from "./CardView";

interface CardProps {
    onSuccess: (response: CardResponse) => void,
    onError: (err: ErrorResponse) => void
}

export function Card(props: CardProps) {
    const [card, setCard] = useState({} as CardResponse)
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Requests.CardId(Number(id)).then(res => {
            if (res.err) {
                setCard({} as CardResponse);
                props.onError(res.err);
            }
            else if (res.res){
                setCard(res.res);
                props.onSuccess(res.res);
            }
        });
    }, [id, props])

    const EditCard = (e: FormEvent) => {
        e.preventDefault()
        navigate('/cards/'+ card.id + '/edit')
    }

    const DeleteCard = (e: FormEvent) => {
        e.preventDefault()
        Requests.deleteCard({id: card.id}).then(res => {
            if (res.err) {
                props.onError(res.err)
            }
            else if (res.res){
                navigate(-1);
                // pzsp2 powinno jeszcze wyświetlić komunikat, że usunięto
            }
        })
    }

    return CardView(card, DeleteCard, EditCard);
}