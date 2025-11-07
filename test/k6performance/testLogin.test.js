import { obterToken } from "../../helpers/authk6.js";

export const options = {
  iterations: 1,
};

export default function () {
  console.log("=== TESTANDO LOGIN ===");
  const token = obterToken();
  console.log("Token final recebido:", token);
  console.log("Tipo do token:", typeof token);
  }