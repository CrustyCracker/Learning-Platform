import {useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";

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
        <h1>Wszystkie karty</h1>
        <table>
            <thead>
                <tr>
                    <th>Pytanie</th>
                    <th>Grupy</th>
                    <th>Tagi</th>
                    <th>Widoczność</th>
                </tr>
            </thead>
            <tbody>
                {cards && cards.map(card => {
                    return <tr key={card.id}>
                        <td>{card.question}</td>
                        <td>{card.groups}</td>
                        <td>{card.tags}</td>
                        <td>{isPublicToString(card.isPublic)}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>;
}