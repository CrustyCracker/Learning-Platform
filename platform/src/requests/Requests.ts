import {Global} from "../Config";
import {Credentials, LoginResponse, RegisterCredentials} from "../types/Credentials";
import {CardResponse, NewCard} from "../types/Cards";
import {GroupResponse, NewGroup} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function fetchPost(body: any, url: string) {
    return fetch(Global.backendUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${cookies.get("JWTTOKEN")}`
        },
        body: JSON.stringify(body)
    })
}

function fetchGet(url: string) {
    return fetch(Global.backendUrl + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${cookies.get("JWTTOKEN")}`
        }
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
        const response = await fetchGet("/cards/first")
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

    static async myCards(id: number = 1): Promise<GenericResponse<CardResponse[]>> {
        // pzsp2 tutaj powinno być branie id zalogowanego usera a nie sztywne id=1
        const response = await fetchGet("/cards/forUser/" + id)
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async myGroups(id: number = 1): Promise<GenericResponse<GroupResponse[]>>{
        // pzsp2 to samo co wyżej
        const response = await fetchGet("/groups/forUser/" + id)
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async allCards(): Promise<GenericResponse<CardResponse[]>> {
        const response = await fetchGet("/cards/all")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async CardId(id: number): Promise<GenericResponse<CardResponse>> {
        const response = await fetchGet("/cards/" + id)
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async GroupId(id: number): Promise<GenericResponse<GroupResponse>> {
        const response = await fetchGet("/groups/" + id)
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async CardsByGroupsId(id: number): Promise<GenericResponse<CardResponse[]>> {
        const response = await fetchGet("/cards/group/" + id)
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async editGroup(groupData: GroupResponse): Promise<GenericResponse<GroupResponse>> {
        const response = await fetchPost(groupData, "/groups/edit")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async editCard(cardData: CardResponse): Promise<GenericResponse<CardResponse>> {
        const response = await fetchPost(cardData, "/cards/edit")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async deleteCard(id: number):  Promise<GenericResponse<boolean>> {
        const response = await fetchGet("/cards/delete/" + id)
            .then(res => res.json())
        return setResponseOrError(response);
    }
}
