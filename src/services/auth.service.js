import { post } from 'axios';
import BaseHttpService from './base-http.service';

export default class AuthService extends BaseHttpService {
    async signin(email, password) {
        const result = await post(`${this.BASE_URL}/auth/signin`, { email, password });
        const accessToken = result.data.accessToken;
        this.saveToken(accessToken);
        return result.data.email;
    }

    async signup(email, password) {
        await post(`${this.BASE_URL}/auth/signup`, { email, password });
    }

    async signout() {
        this.removeToken();
    }
}
