import Controller from "./controller.js";
import View from "./view.js";
import Service from "./service.js";

const view = new View();
const service = new Service()

Controller.init({
    view,
    service,
})