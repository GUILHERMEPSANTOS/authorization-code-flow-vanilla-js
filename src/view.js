export default class View {
    configureLoadListener(fn) {
        window.addEventListener("load", () => {
            const params = new URLSearchParams(window.location.search);
            fn(params);
        })
    }

}

