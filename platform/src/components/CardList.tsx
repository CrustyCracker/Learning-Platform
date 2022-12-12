import {useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import '../style/cardList.css';

interface CardListProps {
    onSuccess: (response: CardResponse[]) => void,
    onError: (err: ErrorResponse) => void
}

export function CardList(props: CardListProps) {
    const [cards, setCards] = useState<CardResponse[]>([]);

    useEffect(() => {
        Requests.allCards().then(res => {
            if (res.err) {
                setCards([]);
                props.onError(res.err);
            }
            else if (res.res){
                setCards(res.res);
                props.onSuccess(res.res);
            }
        });
    }, [props])

    const isPublicToString = (isPublic: boolean) : string => {
        return isPublic ? "Publiczna" : "Prywatna";
    };

    return <div>
        <p>
            <h1>Wszystkie fiszki</h1>
        </p>
        <table className={"table table-dark center"}>
            <thead>
                <tr>
                    <th style={{ width: "40%" }}>Pytanie</th>
                    <th style={{ width: "15%" }}>Grupy</th>
                    <th style={{ width: "10%" }}>Tagi</th>
                    <th style={{ width: "10%" }}>Widoczność</th>
                    <th style={{ width: "5%" }}> </th>
                </tr>
            </thead>
            <tbody>
                {cards && cards.map(card => {
                    return <tr key={card.id}>
                        <td>{card.question}</td>
                        <td>{card.groups}</td>
                        <td>{card.tags}</td>
                        <td>{isPublicToString(card.isPublic)}</td>
                        <td>{">"}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}