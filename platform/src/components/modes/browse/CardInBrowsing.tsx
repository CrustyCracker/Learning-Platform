import {CardResponse} from "../../../types/Cards";
import {CardView} from "../../CardView";

export default function CardInBrowsing(props: {card: CardResponse}) {
    return CardView(props.card, null, null);
}