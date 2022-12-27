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


    //pzsp2 - dodać animację dla każdego rzędu w tabeli, oddzielny fadeIn z delayem np 100ms
    return <>
        <link
            //pzsp2 -> zrobić ładny import bootstrapa
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
        />

        <h1 className="pzsp2-cardlist-title">Moje fiszki</h1>
        <div className="pzsp2-cardlist-cont">
        <TagsInput
            value={tags}
            onChange={e => filterByTags(e || [])}
            name="tagi"
            placeHolder="Dodaj tag..."
        />
        <p className="pzsp2-cardlist-tagsearch">
            <em>Wyszukaj po tagu... Kilknij ENTER, aby dodać nowy tag.</em>
        </p>
        </div>
        <div className="pzsp2-cardlist-cont">
            <div className="row pzsp2-cardlist-row-buttons">
                <div>
                    <form className="pzsp2-cardlist-learn-button" onSubmit={Learn}>
                        <button type="submit" className="btn btn-outline-warning">Ucz się</button>
                    </form>
                    <form className="pzsp2-cardlist-test-button" onSubmit={Test}>
                        <button type="submit" className="btn btn-outline-danger">Test</button>
                    </form>
                </div>
            </div>
        </div>

        {/*//pzsp2 - dodać paginację i zaokrąglone kąty tabeli*/}
        <table className={"table table-hover table-light pzsp2-cardlist-table"}>
            <thead>
                <tr>
                    <th className="pzsp2-cardlist-table-que">Pytanie</th>
                    <th className="pzsp2-cardlist-table-grp">Grupy</th>
                    <th className="pzsp2-cardlist-table-tag">Tagi</th>
                    <th className="pzsp2-cardlist-table-vis hide-on-small">Widoczność</th>
                    <th className="pzsp2-cardlist-table-lin "> </th>
                </tr>
            </thead>
            <tbody>
                {currCards && currCards.map(card => {
                    return <tr key={card.id}>
                        <td className="pzsp2-cardlist-td-wrap">{card.question}</td>
                        <td className="pzsp2-cardlist-td-wrap">{card.groups}</td>
                        <td className="pzsp2-cardlist-td-wrap">{card.tags}</td>
                        <td className="hide-on-small">{isPublicToString(card.isPublic)}</td>

                        <td><Link className="pzsp2-link" to={`${card.id}`}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
    </>;
}