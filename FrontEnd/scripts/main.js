export function startTests() {
    console.log("-------------------- NEXT EN DESSOUS ------------------");
    console.log("");
};

export function createProjets(projets) {
    const galleryPortfolio = document.querySelector(".gallery");

    galleryPortfolio.innerHTML = "";

    for (let i = 0; i < projets.length; i++) {
        const element = projets[i];
        let figure = document.createElement("figure");
        figure.dataset.id = element.id;
        figure.dataset.category_id = element.category.id;

        let image = document.createElement("img");
        image.setAttribute("src", element.imageUrl);

        figure.appendChild(image);

        let figcaption = document.createElement("figcaption");
        figcaption.innerText = element.title;
        figure.appendChild(figcaption);

        galleryPortfolio.appendChild(figure);
    };
    listenProjets();

};

function listenProjets() {
    const allProjets = document.querySelectorAll(".gallery figure");

    allProjets.forEach(element => {
        //console.log(element);
        element.addEventListener("click", event => {
            console.log(element.dataset);

        });
    });
};

export async function createFilters(categories, projets) {
    const divFiltres = document.querySelector("div.filtres");



    let filtre = document.createElement("h3");
    filtre.innerText = "Tous";
    filtre.dataset.id = 0;
    divFiltres.appendChild(filtre);

    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];

        filtre = document.createElement("h3");
        filtre.innerText = element.name;
        filtre.dataset.id = element.id;
        divFiltres.appendChild(filtre);
    }

    listenFilters(projets);

};

function listenFilters(projets) {
    const filtresButtons = document.querySelectorAll(".filtres h3");

    filtresButtons.forEach(element => {
        //console.log(element);
        element.addEventListener("click", event => {
            //galleryPortfolio.innerHTML = "";

            if (element.dataset.id == 0) {
                const projetsFiltrees = projets;
                createProjets(projetsFiltrees);
            } else {
                const projetsFiltrees = projets.filter(function (projet) {
                    return projet.category.id == element.dataset.id;
                });
                createProjets(projetsFiltrees);
            };
        });
    });
};

// Login / Logout

const loginDiv = document.querySelector("#login");
const localStorage = window.localStorage;

const nav = document.querySelectorAll("nav li");
const navLink = document.querySelectorAll("nav a");
let loginNav = undefined;
let loginNavLink = undefined;

nav.forEach(element => {
    if (element.innerText === "login") {
        loginNav = element;
    }
});

navLink.forEach(element => {
    if (element.innerText === "login") {
        loginNavLink = element;
    }
});

export function askLogout() {
    const mainDiv = document.querySelector("main");

    const logoutCover = document.createElement("div");
    logoutCover.setAttribute("id", "cover");

    const logoutDiv = document.createElement("div");
    logoutDiv.setAttribute("id", "logout");
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

export function editMode(boolean) {
    const header = document.querySelector("header");
    const editingModeDiv = document.querySelector("#editing-mode");
    const testeu = document.querySelector("header");
    let innerTest = testeu.innerHTML

    if (boolean) {
        testeu.innerHTML = '<div id="editing-mode"><h3><i class="fa-regular fa-pen-to-square"></i> Mode édition</h3></div>' + innerTest;
        header.style.paddingTop = "100px";
    } else {
        testeu.innerHTML = testeu.innerHTML.replace('<div id="editing-mode"><h3><i class="fa-regular fa-pen-to-square"></i> Mode édition</h3></div>', "");
        header.style.paddingTop = "40px";
    }
}

export function isConnected() {
    const editingModeDiv = document.querySelector("#editing-mode");
    const nav = document.querySelectorAll("nav li");
    const navLink = document.querySelectorAll("nav a");
    let loginNav = undefined;
    let loginNavLink = undefined;

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
        loginNavLink.href = "/FrontEnd/pages/login.html";
        editMode(false)
        return false
    } else {
        loginNav.innerText = "logout";
        loginNavLink.href = "javascript:";
        editMode(true)
        return true
    };

};

export function listenLogoutLink() {
    const nav = document.querySelectorAll("nav li");
    const navLink = document.querySelectorAll("nav a");
    let loginNav = undefined;
    let loginNavLink = undefined;

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

export function logoutAccount(logoutCover) {
    console.log("Je suis dans logoutAccount");
    logoutCover.remove();
    localStorage.removeItem("token");
    isConnected();
};

export function listenLogout() {
    const logoutCover = document.querySelector("#cover");
    const logoutDiv = document.querySelector("#logout");
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