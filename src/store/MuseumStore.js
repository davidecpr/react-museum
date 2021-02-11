import {
    observable,
    action
} from "mobx";
import {museumClient} from "../utils/clients";
import {decodeToken} from "react-jwt";

class MuseumStore {

    @observable museums = []
    @observable currentMuseum = null
    @observable museumDetails = null
    @observable openAddMuseumModal = false
    @observable loading = false

    @action
    async listMuseum() {
        try {
            this.loading = true
            this.museums = []
            const response = await museumClient.get('/museums');
            this.museums = response.data
        } catch (e) {
            console.error(e)
        } finally {
            this.loading = false
        }
    }

    @action
    async getUserMuseums() {
        try {
            this.loading = true
            this.museums = []
            const JWT = localStorage.getItem('JWT')
            const payload = decodeToken(JWT)
            const response = await museumClient.get(`/600/museums?userId=${payload.sub}`, {headers: {Authorization: `Bearer ${JWT}`}})
            this.museums = response.data
        } catch (e) {
            console.error(e)
        } finally {
            this.loading = false
        }
    }

    @action
    async addEditMuseum(museum) {
        try {
            const JWT = localStorage.getItem('JWT')
            if (!museum.id) {
                await museumClient.post('/660/museums', museum, {headers: {Authorization: `Bearer ${JWT}`}})
                this.openAddMuseumModal = false
            } else {
                await museumClient.put(`/660/museums/${museum.id}`, museum, {headers: {Authorization: `Bearer ${JWT}`}})
                this.openAddMuseumModal = false
            }
        } catch (e) {
            console.error(e)
        }

    }

    @action
    async getMuseumDetails(id) {
        try {
            const response = await museumClient.get(`/museums/${id}`)
            this.museumDetails = response.data
        } catch (e) {
            console.error(e)
        }
    }

    @action
    openEditMuseum(museum) {
        this.openAddMuseumModal = true
        this.currentMuseum = museum
    }

    @action
    resetMuseum() {
        this.currentMuseum = null
        this.openAddMuseumModal = false
    }
}

export const museumStore = new MuseumStore()