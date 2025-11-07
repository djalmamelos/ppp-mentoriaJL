import http from "k6/http";
import { pegarBaseURL } from "../utils/variables.js";
import { obterToken } from "./authk6.js";
import { obterPrizeID } from "./getIDk6.js"; 

export function obterUnitID() {
    const token = obterToken();
    const prizeID = obterPrizeID();
    const url = pegarBaseURL() + `/api/prizes/${prizeID}`;



    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const res = http.get(url, params);


    if (res.status !== 200 && res.status !== 201) {
        console.error("❌ Falha ao buscar prize!");
        return null;
    }

    const responseBody = res.json();


    if (!responseBody.units || responseBody.units.length === 0) {
        console.error("❌ Nenhuma unidade encontrada!");
        return null;
    }

    const unitID = responseBody.units[0].id; 
    console.log("Unit ID extraído:", unitID);

    return unitID;
}