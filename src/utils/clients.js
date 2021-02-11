import axios from "axios";

const museumClient = axios.create({
    baseURL: 'http://localhost:8001'
})

export {
    museumClient
}