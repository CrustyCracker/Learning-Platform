export function GetListItemColor(isPublic: boolean, isChecked: boolean = false) : string {
    let style = isPublic ? "pzsp2-cardlist-item-public" : "pzsp2-cardlist-item-private" ;
    return isChecked ? style + " pzsp2-active" : style;
}