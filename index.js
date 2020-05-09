import {
    App
} from "./src/App.js";

const app = new App();

document.addEventListener("DOMContentLoaded", () => {
    app.mount();
});

document.addEventListener("unload", () => {
    app.unmount();
});