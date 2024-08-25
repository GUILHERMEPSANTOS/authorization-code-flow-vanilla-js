class Keycloak {
    #url;
    #realm;
    #redirect_uri;
    #code_verifier;
    #code_challenge;
    #code_challenge_method;
    #client_id;
    #client_secret;
    #response_type;
    #scope;

    constructor(deps) {
        this.#url = deps.url;
        this.#realm = deps.realm;
        this.#redirect_uri = deps.redirect_uri;
        this.#client_id = deps.client_id;
        this.#client_secret = deps.client_secret;
        this.#response_type = deps.response_type;
        this.#scope = deps.scope;
        this.#init();
    }

    #init() {
        this.#code_verifier = this.#generateCodeVerifier();

        this.#generateCodeChallenge()
            .then(code_challenge => this.#code_challenge = code_challenge);

        this.#code_challenge_method = "S256";

        console.log({ code_challenge: this.#code_challenge, code_verifier: this.#code_verifier });
    }

    getTokenUrl(code) {
        const url = this.#url + "/realms" + `/${this.#realm}` + "/protocol/openid-connect/token"
        const body = new URLSearchParams()
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        body.append("client_id", this.#client_id);
        body.append("client_secret", this.#client_secret);
        body.append("redirect_uri", this.#redirect_uri);
        body.append("code_verifier", this.#code_verifier);
        body.append("grant_type", "authorization_code");
        body.append("code", code);

        return {
            url,
            body,
            headers
        }
    }

    getAuthorizationUrl() {
        const queryParams = this.#buildQueryParams({
            scope: this.#scope,
            response_type: this.#response_type,
            client_id: this.#client_id,
            client_secret: this.#client_secret,
            redirect_uri: this.#redirect_uri,
            code_challenge_method: this.#code_challenge_method,
            code_challenge: this.#code_challenge,
        });

        return this.#url + `/realms` + `/${this.#realm}` + `/protocol/openid-connect/auth?${queryParams}`
    }

    #buildQueryParams(params) {
        return Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
    }

    #generateCodeVerifier() {
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    async #sha256(plain) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return await window.crypto.subtle.digest('SHA-256', data);
    }

    async #generateCodeChallenge() {
        if (!this.#code_verifier) throw new Error("Code Verifier is null");

        const hash = await this.#sha256(this.#code_verifier);

        return btoa(String.fromCharCode.apply(null, new Uint8Array(hash)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
}

export default class KeycloakBuilder {
    #url;
    #realm;
    #redirect_uri;
    #client_id;
    #client_secret;
    #response_type;
    #scope;

    constructor() { }

    withUrl(url) {
        this.#url = url;
        return this;
    }

    withRealm(realm) {
        this.#realm = realm;
        return this;
    }

    withRedirectUri(redirectUri) {
        this.#redirect_uri = redirectUri;
        return this;
    }

    withClientId(clientId) {
        this.#client_id = clientId;
        return this;
    }

    withClientSecret(clientSecret) {
        this.#client_secret = clientSecret;
        return this;
    }

    withResponseType(responseType) {
        this.#response_type = responseType;
        return this;
    }

    withScope(scope) {
        this.#scope = scope;
        return this;
    }

    build() {
        return new Keycloak({
            url: this.#url,
            realm: this.#realm,
            redirect_uri: this.#redirect_uri,
            client_id: this.#client_id,
            client_secret: this.#client_secret,
            response_type: this.#response_type,
            scope: this.#scope
        });
    }
}