import React, {FormEvent, useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {CardResponse} from "../types/Cards";
import {ErrorResponse} from "../types/ErrorResponse";
import { TagsInput } from "react-tag-input-component";
import '../style/cardList.css';
import {Link} from "react-router-dom";
import { isPublicToString } from "../helpers/NameHelpers";

interface CardListProps {
    onSuccess: (response: CardResponse[]) => void,
    onError: (err: ErrorResponse) => void
}

export function CardList(props: CardListProps) {
    const [cards, setCards] = useState<CardResponse[]>([]);
    const [currCards, setCurrCards] = useState<CardResponse[]>([]);
    const [tags, ] = useState<string[]>([]);

    useEffect(() => {
        Requests.allCards().then(res => {
            if (res.err) {
                setCards([]);
                setCurrCards([])
                props.onError(res.err);
            }
            else if (res.res){
                setCards(res.res);
                setCurrCards(res.res);
                props.onSuccess(res.res);
            }
        });
    }, [])

    const filterByTags = (tags: string[]) => {
        if(tags.length) {
            let newCards:CardResponse[] = [];

            cards.forEach((card) => {
                tags.forEach((tag) => {
                    if(card.tags.some(x => x.toLowerCase() === tag.toLowerCase())){
                        newCards.push(card)
                    }
                })
            })

            setCurrCards(newCards);
        }
        else{
            setCurrCards(cards);
        }
    };

    const Learn = (e: FormEvent) => {
        e.preventDefault();
    }

    const Test = (e: FormEvent) => {
        e.preventDefault();
    }

    return <>
        <link
            //pzsp2 -> zrobić ładny import bootstrapa
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
        />
        <h1>Moje fiszki</h1>
        <div className="container-fluid" style={{width: "80%", padding: "0"}}>
        <TagsInput
            value={tags}
            onChange={e => filterByTags(e || [])}
            name="tagi"
            placeHolder="Dodaj tag..."
        />
        <p style={{ marginTop: "0.5%", textAlign: "left", fontSize: "12px"}}>
            <em>Wyszukaj po tagu... Kilknij ENTER, aby dodać nowy tag.</em>
        </p>
        </div>
        <div className="container-fluid" style={{width: "80%", padding: "0"}}>
            <div className="row" style={{ marginBottom: "1%"}}>
                <div>
                    <form onSubmit={Learn} style={{float: "left"}}>
                        <button type="submit" className="btn btn-outline-warning">Ucz się</button>
                    </form>
                    <form onSubmit={Test} style={{float: "left", marginLeft: "1%"}}>
                        <button type="submit" className="btn btn-outline-danger">Test</button>
                    </form>
                </div>
            </div>
        </div>

        <table className={"table table-dark center pzsp-table"} style={{ width: "80%" }}>
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
                {currCards && currCards.map(card => {
                    return <tr key={card.id}>
                        <td className="pzsp-td-wrap">{card.question}</td>
                        <td className="pzsp-td-wrap">{card.groups}</td>
                        <td className="pzsp-td-wrap">{card.tags}</td>
                        <td>{isPublicToString(card.isPublic)}</td>

                        <td><Link to={`${card.id}`} style={{ textDecoration: 'none' }}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
    </>;
}