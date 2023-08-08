
import axios from "axios";


export const REST_ENDPOINT = "https://babiblackmarket.com/wp-json/api";

export const LoginEndpoint = async (username:string,password:string) => {
    try {
        const res = await axios.post(`${REST_ENDPOINT}/v1/token`, {username,password});
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const ValidateToken = async (token:string) => {
    try {
        const res = await axios.get(`${REST_ENDPOINT}/v1/token-validate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}