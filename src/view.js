export default class View {
    #button = document.getElementById("keycloak-redirect");


    configureOnClickRedirectKeycloak(fn) {
        this.#button.addEventListener("click", (_) => {
            fn()
        })
    }
}

