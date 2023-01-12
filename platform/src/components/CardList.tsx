import React, {FormEvent, useEffect, useState} from "react";
import {CardResponse} from "../types/Cards";
import { TagsInput } from "react-tag-input-component";
import '../style/cardList.css';
import {Link} from "react-router-dom";
import { isPublicToString } from "../helpers/NameHelpers";
import {GetListItemColor} from "../helpers/StyleHelpers";

interface CardListProps {
    cards: CardResponse[],
    pub: boolean,
    learn?: boolean

}

export function CardList(props: CardListProps) {
    const [currCards, setCurrCards] = useState<CardResponse[]>([]);
    const [searchPhrases, ] = useState<string[]>([]);

    useEffect(() => {
        setCurrCards(props.cards)
    }, [props])

    const filterByTagsAndGroup = (searchPhrases: string[]) => {
        if(searchPhrases.length) {
            let newCards:CardResponse[] = [];

            currCards.forEach((card) => {
                searchPhrases.forEach((searchPhrase) => {
                    if(card.tags.some(x => x.toLowerCase() === searchPhrase.toLowerCase())
                    || card.groups.some(x => x.toLowerCase() === searchPhrase.toLowerCase())){
                        newCards.push(card)
                    }
                })
            })

            setCurrCards(newCards);
        }
        else {
            setCurrCards(props.cards);
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
        <div className="pzsp2-cardlist-cont">
        <TagsInput
            value={searchPhrases}
            onChange={e => filterByTagsAndGroup(e || [])}
            name="tagi"
            placeHolder="Wyszukaj..."
        />
        <p className="pzsp2-cardlist-tagsearch">
            <em>Wyszukaj po tagu lub nazwie grupy... Kilknij ENTER, aby dodać nową frazę.</em>
        </p>
        </div>
        <div className="pzsp2-cardlist-cont">
            <div className="row pzsp2-cardlist-row-buttons">
                {props.learn && <div>
                    <form className="pzsp2-cardlist-learn-button" onSubmit={Learn}>
                        <button type="submit" className="btn btn-outline-warning">Ucz się</button>
                    </form>
                    <form className="pzsp2-cardlist-test-button" onSubmit={Test}>
                        <button type="submit" className="btn btn-outline-danger">Test</button>
                    </form>
                </div>}
            </div>
        </div>

        <table className={"table table-hover table-light pzsp2-cardlist-table"}>
            <thead>
                <tr>
                    <th className="pzsp2-cardlist-table-que">Pytanie</th>
                    <th className="pzsp2-cardlist-table-grp">Grupy</th>
                    <th className="pzsp2-cardlist-table-tag">Tagi</th>
                    {!props.pub && <th className="pzsp2-cardlist-table-vis hide-on-small">Widoczność</th>}
                    {props.pub && <th className="pzsp2-cardlist-table-vis hide-on-small">Właściciel</th>}
                    <th className="pzsp2-cardlist-table-lin "> </th>
                </tr>
            </thead>
            <tbody>
                {currCards && currCards.map(card => {
                    return <tr key={card.id} className={GetListItemColor(card.isPublic, false)}>
                        <td className="pzsp2-cardlist-td-wrap">{card.question}</td>
                        <td className="pzsp2-cardlist-td-wrap"><small>{card.groups.join(', ')}</small></td>
                        <td className="pzsp2-cardlist-td-wrap"><small>{card.tags.join(', ')}</small></td>
                        {!props.pub && <td className="hide-on-small">{isPublicToString(card.isPublic)}</td>}
                        {props.pub && <td className="hide-on-small">{card.username}</td>}
                        <td><Link className="pzsp2-link" to={`/cards/${card.id}`}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
    </>;
}