import * as projects from "./projects.js";
import * as login from "./log.js";

// lien Swagger API http://localhost:5678/api-docs/

projects.createProjets();
projects.createFilters();
login.isConnected();
login.listenLogoutLink();