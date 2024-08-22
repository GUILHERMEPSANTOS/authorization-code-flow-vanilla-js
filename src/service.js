import KeycloakBuilder from "./keycloak.js";

export default class Service {
    #keycloak;

    constructor() {
        this.#init();
    }

    #init() {
        this.#keycloak = new KeycloakBuilder()
            .withClientId("")
            .withClientSecret("")
            .withRealm("")
            .withRedirectUri("")
            .withResponseType("")
            .withScope("")
            .withUrl()
            .build();

        this.#keycloak.getAuthUrl(
            this.getAuthUrl.bind(this)
        )
    }

    getAuthUrl(url) {
        return url;
    }

}