import {action, observable} from "mobx";
import {museumClient} from "../utils/clients";
import {decodeToken} from "react-jwt";

class UserStore {

    @observable users = [];
    @observable currentUser = {};
    @observable openEditUserModal = false;
    @observable visible = false

    @action
    async signin(user) {
        try {
            const response = await museumClient.post('/signin', {email: user.email, password: user.password})
            const JWT = response.data.accessToken
            localStorage.setItem('JWT', JWT)
        } catch (e) {
            console.error(e)
        }
    }

    @action
    async signup(user) {
        try {
            const response = await museumClient.post('/signup', {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            })
            const JWT = response.data.accessToken
            localStorage.setItem('JWT', JWT)
        } catch (e) {
            console.error(e)
        }
    }

    @action
    async getUser() {
        try {
            const JWT = localStorage.getItem('JWT')
            const payload = decodeToken(JWT)
            const user = await museumClient.get(`/660/users/${payload.sub}`, {headers: {Authorization: `Bearer ${JWT}`}})
            this.currentUser = user.data
        } catch (e) {
            console.error(e)
        }
    }

    @action
    async updateUser(user) {
        try {
            const JWT = localStorage.getItem('JWT')
            const payload = decodeToken(JWT)
            await  museumClient.put(`/660/users/${payload.sub}`, user,{headers: {Authorization: `Bearer ${JWT}`}})
        } catch (e) {
            console.error(e);
        } finally {
            this.currentUser = {}
            await this.getUser()
            this.openEditUserModal = false
        }
    }

    @action
    async getUserAndEdit() {
        await this.getUser()
        this.openEditUserModal = true
    }

}

export const userStore = new UserStore();