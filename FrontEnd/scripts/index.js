import * as modules from "./main.js";

// lien Swagger API http://localhost:5678/api-docs/
const listeProjets = await fetch("http://localhost:5678/api/works");
const projets = await listeProjets.json();

const listeCategories = await fetch("http://localhost:5678/api/categories");
const categories = await listeCategories.json();

console.log("-------------------------------------- NEXT EN DESSOUS --------------------------------------");
console.log("");
modules.createProjets(projets);
modules.createFilters(categories, projets);