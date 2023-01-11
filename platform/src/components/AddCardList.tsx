import React, { FormEvent, useEffect, useState } from "react";
import { CardResponse } from "../types/Cards";
import { TagsInput } from "react-tag-input-component";
import '../style/cardList.css';
import { Link } from "react-router-dom";
import { isPublicToString } from "../helpers/NameHelpers";

interface AddCardListProps {
    cards: CardResponse[],
    pub: boolean,
    add?: boolean,
    learn?: boolean,
    groupId?: String
}

export function AddCardList(props: AddCardListProps) {
    const [currCards, setCurrCards] = useState<CardResponse[]>([]);
    const [tags,] = useState<string[]>([]);

    useEffect(() => {
        setCurrCards(props.cards)
    }, [props])

    const filterByTags = (tags: string[]) => {
        if (tags.length) {
            let newCards: CardResponse[] = [];

            currCards.forEach((card) => {
                tags.forEach((tag) => {
                    if (card.tagNames.some(x => x.toLowerCase() === tag.toLowerCase())) {
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

        {/*//pzsp2 - dodać paginację*/}
        <table className={"table table-hover table-light pzsp2-cardlist-table"}>
            <thead>
                <tr>
                    <th className="pzsp2-cardlist-table-tag">Checked?</th> {/*//pzsp2 - zmienić className*/}
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
                    return <tr key={card.id}>
                        {props.groupId && <td><input type="checkbox" /></td>}
                        <td className="pzsp2-cardlist-td-wrap">{card.question}</td>
                        <td className="pzsp2-cardlist-td-wrap">{card.groupNames}</td>
                        <td className="pzsp2-cardlist-td-wrap">{card.tagNames}</td>
                        {!props.pub && <td className="hide-on-small">{isPublicToString(card.isPublic)}</td>}
                        {props.pub && <td className="hide-on-small">{card.username}</td>}
                        <td><Link className="pzsp2-link" to={`/cards/${card.id}`}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
    </>;
}