import KeycloakBuilder from "./keycloak.js";

export default class Service {
    #keycloak;

    constructor() {
        this.#init();
    }

    #init() {
        this.#keycloak = new KeycloakBuilder()
            .withClientId("vannila-js-front")
            .withClientSecret("xTFJtGno0j0rBUiaOsLQTy7ygBkB0Lai")
            .withRealm("vannila-js-identity")
            .withRedirectUri("http://localhost:3000")
            .withResponseType("code")
            .withScope("openid")
            .withUrl("http://localhost:18080")
            .build();
    }

    getAuthorizationUrl() {
        return this.#keycloak.getAuthorizationUrl();
    }

    getTokenUrl(code) {
        return this.#keycloak.getTokenUrl(code);
    }

}