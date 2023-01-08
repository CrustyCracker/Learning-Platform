import {Global} from "../Config";
import {Credentials, LoginResponse, RegisterCredentials} from "../types/Credentials";
import {CardResponse, DeleteCard, EditCard, NewCard} from "../types/Cards";
import {DeleteGroup, EditGroup, GroupResponse, NewGroup} from "../types/Groups";
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

function fetchDelete(body: any, url: string) {
    const token = SecurityHelper.getContext()?.token;
    return fetch(Global.backendUrl + url, {
        method: 'DELETE',
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

async function handleResponse(response: Response) {
    console.log(response);
    SecurityHelper.refreshContext()

    if (response.status === 401){
        if (response.bodyUsed) {
            const json = await response.json()
            return {err: json};
        }
        else
            return {err: {status: response.status, infoMessage: "Brak uprawnień", timestamp: new Date(), message: ""}};
    }

    const json = await response.json()

    if (response.status === 200)
        return {res: json};
    return {err: json};
}

export class Requests {
    static async firstCard(): Promise<GenericResponse<CardResponse>> {
        const response = await fetchGet("/cards/first")
        return handleResponse(response);
    }

    static async login(cred: Credentials): Promise<GenericResponse<LoginResponse>> {
        const response = await fetchPost(cred, "/account/login")
        if (response.status !== 200)
            SecurityHelper.clearContext();
        return handleResponse(response);
    }

    static async register(cred: RegisterCredentials): Promise<GenericResponse<LoginResponse>> {
        const response = await fetchPost(cred, "/account/register")
        return handleResponse(response);
    }

    static async createCard(cardData: NewCard): Promise<GenericResponse<CardResponse>> {
        const response = await fetchPost(cardData, "/cards/create")
        return handleResponse(response);
    }

    static async createGroup(groupData: NewGroup): Promise<GenericResponse<GroupResponse>> {
        const response = await fetchPost(groupData, "/groups/create")
        return handleResponse(response);
    }

    static async myCards(): Promise<GenericResponse<CardResponse[]>> {
        const response = await fetchGet("/cards/owned")
        return handleResponse(response);
    }

    static async myGroups(): Promise<GenericResponse<GroupResponse[]>>{
        const response = await fetchGet("/groups/owned")
        return handleResponse(response);
    }

    static async allCards(): Promise<GenericResponse<CardResponse[]>> {
        const response = await fetchGet("/cards/all")
        return handleResponse(response);
    }

    static async allGroups(): Promise<GenericResponse<GroupResponse[]>>{
        const response = await fetchGet("/groups/all")
        return handleResponse(response);
    }

    static async CardId(id: number): Promise<GenericResponse<CardResponse>> {
        const response = await fetchGet("/cards/" + id)
        return handleResponse(response);
    }

    static async GroupId(id: number): Promise<GenericResponse<GroupResponse>> {
        const response = await fetchGet("/groups/" + id)
        return handleResponse(response);
    }

    static async CardsByGroupsId(id: number): Promise<GenericResponse<CardResponse[]>> {
        const response = await fetchGet("/cards/group/" + id)
        return handleResponse(response);
    }

    static async editGroup(groupData: EditGroup): Promise<GenericResponse<GroupResponse>> {
        const response = await fetchPost(groupData, "/groups/edit")
        return handleResponse(response);
    }

    static async editCard(cardData: EditCard): Promise<GenericResponse<CardResponse>> {
        const response = await fetchPost(cardData, "/cards/edit")
        return handleResponse(response);
    }

    static async deleteCard(id: DeleteCard):  Promise<GenericResponse<boolean>> {
        const response = await fetchDelete(id, "/cards/delete")
        return handleResponse(response);
    }

    static async deleteGroup(id: DeleteGroup):  Promise<GenericResponse<boolean>> {
        const response = await fetchDelete(id, "/groups/delete")
        return handleResponse(response);
    }
}
