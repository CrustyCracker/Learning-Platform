import {Global} from "../Config";
import {Credentials, RegisterCredentials } from "../types/Credentials";
import {NewCard} from "../types/Cards";
import {NewGroup} from "../types/Groups";


function fetchPost(body: any, url: string){
    return fetch(Global.backendUrl + url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}
// pzsp2 tu nie ma żadnego error handlingu, a coś uniwersalnego typu zwracanie 'czy się udało' ma sens

export class Requests {
    static firstCard() {
        return fetch( Global.backendUrl + "/cards/first")
            .then(res => res.json())
    }

    static login(cred: Credentials){
        return fetchPost(cred, "/account/login")
            .then(res => res.json())
    }

    static register(cred: RegisterCredentials){
        return fetchPost(cred, "/account/register")
            .then(res => res.json())
    }

    static createCard(cardData: NewCard){
        return fetchPost(cardData, "/cards/create")
            .then(res => res.json())
    }

    static createGroup(groupData: NewGroup){
        return fetchPost(groupData, "/groups/create")
            .then(res => res.json())
    }
}
