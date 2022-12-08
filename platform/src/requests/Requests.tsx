import {Global} from "../Config";


function fetchPost(body: any, url: string){
    return fetch(Global.backendUrl + url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body) // pzsp2 nie działa
    })
}

export class Requests {
    static firstCard(){
        return fetch( Global.backendUrl + "/cards/first")
            .then(res => res.json());
    }

    static login(cred: Credentials){
        return fetchPost(cred, "/account/login")
            .then(res => res.json())
    }
}

export type Credentials = {
    username: string
    password: string
}