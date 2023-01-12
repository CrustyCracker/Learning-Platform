import {CardResponse} from "../../../types/Cards";
import React, {useState} from "react";
import CardInBrowsing from "./CardInBrowsing";

type BrowsingModeProps = {
    cards: CardResponse[]
}

export default function BrowsingMode(props: BrowsingModeProps) {
    const [currCardIndex, setCurrCardIndex] = useState(0);
    const card = props.cards.at(currCardIndex) ?? {} as CardResponse;

    return <>
        {card && <CardInBrowsing card={card}/>}
        <div className="pzsp2-card-buttons">
            {currCardIndex < props.cards.length - 1 && <form className ="pzsp2-next-button" onClick={() => setCurrCardIndex(currCardIndex + 1)}>
                    <button type="button" className="btn btn-success">
                        Następna
                    </button>
                </form>
            }
            {currCardIndex > 0 && <form className ="pzsp2-prev-button" onClick={() => setCurrCardIndex(currCardIndex - 1)}>
                    <button type="button" className="btn btn-danger">
                        Poprzednia
                    </button>
                </form>
            }
        </div>
    </>
}