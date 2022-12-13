import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import { TagsInput } from "react-tag-input-component";
import '../style/cardList.css';
import {Link} from "react-router-dom";

interface CardListProps {
    onSuccess: (response: CardResponse[]) => void,
    onError: (err: ErrorResponse) => void
}

export function CardList(props: CardListProps) {
    const [cards, setCards] = useState<CardResponse[]>([]);
    const [tags, setTags] = useState([]);

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

    const tableStyle = {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        tableLayout: "fixed" as unknown as undefined
    }

    const tdStyleWrap = {
        wordWrap: "break-word" as unknown as undefined
    }


    return <html>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
    />
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
    />

        <p>
            <h1>Moje fiszki</h1>
        </p>

        <TagsInput
            value={tags}
            // @ts-ignore
            // pzsp2 - znaleźć sposób jak ładniej pozbyć się tego błędu niż @ts-ignore
            onChange={setTags}
            name="tagi"
            placeHolder="Dodaj tag..."
        />
        <p style={{ margin: "0% 0% 2% 10%" ,textAlign: "left", fontSize: "12px"}}>
        <em>Wyszukaj po tagu... Kilknij ENTER, aby dodać nowy tag.</em>
        </p>



        <table style={tableStyle} className={"table table-dark center"}>
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
                        <td style={tdStyleWrap}>{card.question}</td>
                        <td style={tdStyleWrap}>{card.groups}</td>
                        <td style={tdStyleWrap}>{card.tags}</td>
                        <td>{isPublicToString(card.isPublic)}</td>

                        <td><Link to={""} style={{ textDecoration: 'none' }}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
    </html>;
}