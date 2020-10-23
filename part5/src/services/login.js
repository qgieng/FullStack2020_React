import axios from 'axios';
const baseURL = '/api/login';

let token = null;

const setToken = newToken =>{
    token = `bearer ${newToken}`;
}

const login = async credentials =>{
    const response = await axios.post(baseURL, credentials)
    return response.data
}


export default {login};