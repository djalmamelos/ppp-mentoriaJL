import http from "k6/http";
import { pegarBaseURL } from "../utils/variables.js";
import { obterToken } from "./authk6.js";

const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export function obterPrizeID() {
    const token = obterToken();
    const url = pegarBaseURL() + "/api/prizes";



    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const res = http.get(url, params);



    if (res.status !== 200 && res.status !== 201) {
        console.error("❌ Login falhou!");
        return null;
    }

    const responseBody = res.json();


    const id = responseBody[0].id;


    return id;
}