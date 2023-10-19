import { newEl } from "./helpers/newEl.js";
import { createMainLayout } from "./layout/createMainLayout.js";

function createLayout(){

    createMainLayout([
        newEl({type: 'h1', text: "Der opstod en fejl"}),
        newEl({type: 'p', text: 'Der kunne ikke oprettes forbindelse til denne side. Prøv igen senere'}) 
    ])
}

createLayout()