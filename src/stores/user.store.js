import { observable, action } from 'mobx';

export default class UserStore {
    @observable email = null;

    constructor(authService) {
        this.authService = authService;
    }

    @action
    async signin(email, password) {
        this.email = await this.authService.signin(email, password);
    }

    @action
    async signup(email, password) {
        return this.authService.signup(email, password);
    }

    @action
    signout() {
        this.email = null;
        this.authService.removeToken();
    }
}
