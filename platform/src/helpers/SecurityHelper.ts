import {Global} from "../Config";

export class SecurityHelper {
    static key = "userData";
    static validMinutes: number = Global.cacheValidMinutes;

    static setContext(response: UserContext) {
        response.validTo = new Date()
        response.validTo.setMinutes(response.validTo.getMinutes() + this.validMinutes);
        localStorage.setItem(SecurityHelper.key, JSON.stringify((response)));
    }

    static clearContext() {
        localStorage.clear();
    }

    static getContext() : UserContext | null {
        const data = localStorage.getItem(SecurityHelper.key);
        if (!data)
            return null;

        let parsed = JSON.parse(data) as UserContext;

        if (parsed.validTo > new Date()) {
            SecurityHelper.clearContext();
            return null;
        }

        return parsed
    }

    static refreshContext() {
        const data = SecurityHelper.getContext();
        SecurityHelper.clearContext();
        if (data)
            SecurityHelper.setContext(data);
    }

    static amILogged() : boolean {
        return !!this.getContext()
    }

    static amIAdmin() : boolean {
        return !!this.getContext()?.isAdmin;
    }
}

type UserContext = {
    token : string
    username : string
    isAdmin : boolean
    validTo : Date
}