import {Global} from "../Config";
import {Credentials, LoginResponse, RegisterCredentials} from "../types/Credentials";
import {CardResponse, EditCard, NewCard} from "../types/Cards";
import {GroupResponse, NewGroup} from "../types/Groups";
import {ErrorResponse} from "../types/ErrorResponse";
import {SecurityHelper} from "../helpers/SecurityHelper";


function fetchPost(body: any, url: string) {
    const token = SecurityHelper.getContext()?.token;
    return fetch(Global.backendUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token ?? ""}`
        },
        body: JSON.stringify(body)
    })
}

function fetchGet(url: string) {
    const token = SecurityHelper.getContext()?.token;
    return fetch(Global.backendUrl + url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token ?? ""}`
        }
    })
}

class GenericResponse <T>{
    res?: T = undefined
    err?: ErrorResponse = undefined
}

function setResponseOrError(response: any) {
    if (response && response.status && response.status !== 200)
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

    static async myCards(): Promise<GenericResponse<CardResponse[]>> {
        const response = await fetchGet("/cards/owned")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async myGroups(): Promise<GenericResponse<GroupResponse[]>>{
        const response = await fetchGet("/groups/owned")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async allCards(): Promise<GenericResponse<CardResponse[]>> {
        const response = await fetchGet("/cards/all")
            .then(res => res.json())
        return setResponseOrError(response);
    }

    static async allGroups(): Promise<GenericResponse<GroupResponse[]>>{
        const response = await fetchGet("/groups/all")
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

    static async editCard(cardData: EditCard): Promise<GenericResponse<CardResponse>> {
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
