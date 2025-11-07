import http from "k6/http";
import { sleep, check } from "k6";
import { pegarBaseURL } from "../../utils/variables.js";
import { obterToken } from "../../helpers/authk6.js";
import { obterPrizeID } from "../../helpers/getIDk6.js"

const patchPrize = JSON.parse(open('../../fixtures/patchPrizes.json'));

export const options = {
    // iterations: 1,
    stages: [
      { duration: '5s', target: 10 },
      { duration: '20s', target: 10 },
      { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01'],
    }
};

export default function () {
    const id = obterPrizeID();
    const token = obterToken();
    const url = pegarBaseURL() + `/api/prizes/${id}`;

    const payload = JSON.stringify(patchPrize);

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const resposta = http.patch(url, payload, params);

    check(resposta, {

    })
    check(resposta, {
        "Validar que o Status é 200": (r) => r.status === 200,
    
    });

    sleep(1);
}
