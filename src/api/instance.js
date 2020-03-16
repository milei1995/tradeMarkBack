import axios from 'axios';
import {
    getCookie
} from "../utils/CookieUtils";
import router from './../router';


let BASE_URL = "";
switch (process.env.NODE_ENV) {
    case 'dev':
        //开发环境url
        BASE_URL = "http://trademark.hnmykj.vip/";
        break;
    case 'serve':
        //生产环境url
        BASE_URL = "https://www.tmwww.net/api";
        break;
}


export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

instance.interceptors.request.use(config => {
    let user = getCookie("user");
    user = JSON.parse(user);
    if (user && user.jwtToken) {
        console.log(user);
        config.headers = {
            "ACCESS_TOKEN": user.jwtToken
        };
    }
    return config;
}, err => {
    return Promise.reject(err);
});

instance.interceptors.response.use(response => {
    if (response.data.code === 501) {
        router.push("/login");
    }
    return response;
}, err => {
    return Promise.reject(err);
});

export default BASE_URL;