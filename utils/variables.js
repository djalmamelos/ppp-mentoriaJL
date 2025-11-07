const configLocal = JSON.parse(open('../fixtures/config.local.json')) // ✅ Relativo ao arquivo

export function pegarBaseURL() {
    const baseURL = __ENV.BASE_URL || configLocal.baseUrl;
    return baseURL
}