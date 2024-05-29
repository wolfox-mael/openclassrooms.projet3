import * as modules from "./main.js";

// lien Swagger API http://localhost:5678/api-docs/
const listeProjets = await fetch("http://localhost:5678/api/works");
const projets = await listeProjets.json();

const listeCategories = await fetch("http://localhost:5678/api/categories");
const categories = await listeCategories.json();

modules.startTests()
modules.createProjets(projets);
modules.createFilters(categories, projets);
let isConnected = modules.isConnected();

modules.listenLogoutLink()
