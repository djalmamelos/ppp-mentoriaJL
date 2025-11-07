import http from "k6/http";
import { pegarBaseURL } from "../utils/variables.js";

const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export function obterToken() {
    const url = pegarBaseURL() + "/api/auth/login";
    
    const payload = JSON.stringify(postLogin);
    

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    
    const res = http.post(url, payload, params);
    

    
    if (res.status !== 200 && res.status !== 201) {
        console.error("❌ Login falhou!");
        return null;
    }
    
    const responseBody = res.json();
   
    
    const token = responseBody.token;

    
    return token;
}