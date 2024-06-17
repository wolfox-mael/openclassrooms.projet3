import { editMode } from "./edit.js";

// Fonctions Login / Logout

// Création de la constante localStorage pour plus de facilité dans les différentes fonctions
const localStorage = window.localStorage;

export function login() {
    const loginDiv = document.querySelector("#login");
    const localStorage = window.localStorage;

    const nav = document.querySelectorAll("nav li");
    const navLink = document.querySelectorAll("nav a");

    if (localStorage.token !== undefined) window.location.href = "../index.html";

    loginDiv.addEventListener("submit", async event => {
        event.preventDefault();


        const loginMail = document.querySelector("#login #email");
        const loginPassword = document.querySelector("#login #password");

        const loginInput = document.querySelectorAll("#login input");


        loginInput.forEach(element => {
            if (!element.id) return;
        });

        const email = loginMail.value;
        const password = loginPassword.value;

        const properties = {
            email: email,
            password: password,
        };

        const propertie = JSON.stringify(properties);

        try {
            const reponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: propertie
            });

            const errorText = document.querySelectorAll("#error");

            switch (reponse.status) {
                case 200:
                    reponse.json().then(data => localStorage.setItem("token", data.token));
                    window.location.href = "../index.html";
                    break;
                default:
                    errorText.forEach(element => {
                        element.style.display = "inline";
                    });
                    break;
            };
        } catch (error) {
            console.log(error);
        }
    });
};

// Regarde si la personne est connecté pour changer le lien login en logout, ainsi que donner l'accès aux outils d'éditions
export function isConnected() {
    const nav = document.querySelectorAll("nav li");
    const navLink = document.querySelectorAll("nav a");
    let loginNav;
    let loginNavLink;

    nav.forEach(element => {
        if (element.innerText === "logout" || element.innerText === "login") {
            loginNav = element;
        }
    });

    navLink.forEach(element => {
        if (element.innerText === "logout" || element.innerText === "login") {
            loginNavLink = element;
        }
    });

    if (!localStorage.getItem("token")) {
        loginNav.innerText = "login";
        loginNavLink.href = "pages/login.html";
        editMode(false);
        return false;
    } else {
        loginNav.innerText = "logout";
        loginNavLink.href = "javascript:";
        editMode(true);
        return true;
    };

};

// Création de la popup pour se déconnecter du site
function askLogout() {
    const mainDiv = document.querySelector("main");

    const logoutCover = document.createElement("div");
    logoutCover.setAttribute("id", "cover");

    const logoutDiv = document.createElement("div");
    logoutDiv.setAttribute("id", "logout");
    logoutDiv.setAttribute("class", "popup");
    logoutCover.appendChild(logoutDiv);

    const logoutH2 = document.createElement("h2");
    logoutH2.innerText = "Log Out";
    logoutDiv.appendChild(logoutH2);

    const logoutH3 = document.createElement("h3");
    logoutH3.innerText = "Êtes vous sûr de vouloir vous déconnecter ?";
    logoutDiv.appendChild(logoutH3);

    const logoutButtonYes = document.createElement("button");
    logoutButtonYes.setAttribute("id", "logout-oui");
    logoutButtonYes.innerText = "Oui";
    logoutDiv.appendChild(logoutButtonYes);

    const logoutButtonNo = document.createElement("button");
    logoutButtonNo.setAttribute("id", "logout-non");
    logoutButtonNo.innerText = "Non";
    logoutDiv.appendChild(logoutButtonNo);

    mainDiv.appendChild(logoutCover);

    listenLogout();
};

// Ecoute ce qu'il se passe dans la popup de déconnection
function listenLogout() {
    const logoutCover = document.querySelector("#cover");
    const logoutButtons = document.querySelectorAll("#logout button");

    logoutCover.addEventListener("click", event => {
        if (event.target === logoutCover) logoutCover.remove();
    });

    logoutButtons.forEach(element => {
        element.addEventListener("click", event => {
            if (element.innerText.toLowerCase() === "non") logoutCover.remove();
            if (element.innerText.toLowerCase() === "oui") logoutAccount(logoutCover);
        });
    });
};

// Fonction pour déconncter l'utilisateur
// Fait appel à la fonction pour vérifier si l'utilisateur est connecté afin de lui retirer l'accès aux outils d'éditions
function logoutAccount(logoutCover) {
    logoutCover.remove();
    localStorage.removeItem("token");
    isConnected();
};

// Ecoute si le lien "logout" est cliqué, fait la demande de création de la popup de déconnection
export function listenLogoutLink() {
    const nav = document.querySelectorAll("nav li");
    const navLink = document.querySelectorAll("nav a");
    let loginNav;
    let loginNavLink;

    nav.forEach(element => {
        if (element.innerText === "logout" || element.innerText === "login") {
            loginNav = element;
        }
    });

    navLink.forEach(element => {
        if (element.innerText === "logout" || element.innerText === "login") {
            loginNavLink = element;
        }
    });

    loginNavLink.addEventListener("click", event => {
        if (loginNav.innerText !== "logout") return;
        askLogout();
    });
};