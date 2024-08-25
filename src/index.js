import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

const view = new View();
const service = new Service()

Controller.init({
    view,
    service,
})