//import * as modules from "./main.js";

import * as projects from "./projects.js";

import * as edit from "./edit.js";

import * as login from "./log.js";


// lien Swagger API http://localhost:5678/api-docs/
const listeProjets = await fetch("http://localhost:5678/api/works");
const projets = await listeProjets.json();

projects.startTests()

projects.createProjets(projets);
projects.createFilters();

login.isConnected();
login.listenLogoutLink();