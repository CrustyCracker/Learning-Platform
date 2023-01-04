import Cookies from "universal-cookie";

export class TokenHelper {
    static cookies = new Cookies();
    static setToken(token: string) {
        TokenHelper.cookies.set('JWTTOKEN', token, {path: '/', maxAge: 3600});
    }

    static deleteToken() {
        TokenHelper.cookies.remove('JWTTOKEN');
    }

    static refreshToken() {
        const token = TokenHelper.cookies.get('JWTTOKEN');
        TokenHelper.setToken(token);
    }

    static amILogged() : boolean {
        return !!TokenHelper.cookies.get('JWTTOKEN');
    }

    static getToken() : string {
        return TokenHelper.cookies.get('JWTTOKEN');
    }
}