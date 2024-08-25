export default class Controller {
    #view;
    #service

    constructor({ view, service }) {
        this.#view = view;
        this.#service = service;
    }

    static init(deps) {
        var controller = new Controller(deps);
        controller
            .init()

        return controller
    }

    init() {
        this.#view.configureLoadListener(
            this.configureLoadListener.bind(this)
        )
    }

    configureLoadListener(params) {
        const token = sessionStorage.getItem("token");
        const code = params.get("code")

        // if (!token && code) {
        //     this.getToken(code);
        //     return;
        // }

        // this.redirectToKeycloak();
    }

    redirectToKeycloak() {
        const url = this.#service.getAuthorizationUrl();
        window.location.href = url;
    }

    async getToken(code) {
        const requestToken = this.#service.getTokenUrl(code);

        const data = await fetch(requestToken.url, {
            method: 'POST',
            headers: requestToken.headers,
            body: requestToken.body,
        });
    }
}