export default class Controller {
    #view;
    #service

    constructor({ view, service }) {
        this.#view = view;
        this.#service = service;
    }

    static init(deps) {
        var controller = new Controller(deps);
        controller.init();
        return controller
    }

    init() {
        this.#view.configureOnClickRedirectKeycloak(
            this.configureOnClickRedirectKeycloak.bind(this)
        )
    }

    configureOnClickRedirectKeycloak() {
        window.location.href = this.#service.getAuthUrl();
    }
}