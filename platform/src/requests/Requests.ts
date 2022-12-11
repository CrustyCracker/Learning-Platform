import {Global} from "../Config";
import {Credentials, LoginResponse, RegisterCredentials} from "../types/Credentials";
import {CardResponse, NewCard} from "../types/Cards";
import {GroupResponse, NewGroup} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";


function fetchPost(body: any, url: string){
    return fetch(Global.backendUrl + url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}

class GenericResponse <T>{
    res?: T = undefined
    err?: ErrorResponse = undefined
}

function setResponseOrError(response: any) {
    if (response.status && response.status !== 200)
        return {err: response};
    return {res: response};
}

export class Requests {
    static async firstCard(): Promise<GenericResponse<CardResponse>> {
        const response = await fetch(Global.backendUrl + "/cards/first")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async login(cred: Credentials): Promise<GenericResponse<LoginResponse>> {
        const response = await fetchPost(cred, "/account/login")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async register(cred: RegisterCredentials): Promise<GenericResponse<LoginResponse>> {
        const response = await fetchPost(cred, "/account/register")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async createCard(cardData: NewCard): Promise<GenericResponse<CardResponse>> {
        const response = await fetchPost(cardData, "/cards/create")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async createGroup(groupData: NewGroup): Promise<GenericResponse<GroupResponse>> {
        const response = await fetchPost(groupData, "/groups/create")
            .then(res => res.json())
        return setResponseOrError(response);
    }
}
