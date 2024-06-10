/* 

Ce fichier n'est plus utile.
Toutes les fonctions ont été déplacé dans d'autre fichiers

*/


/*

// Temporaire
export function startTests() {
    console.log("-------------------- NEXT EN DESSOUS ------------------");
    console.log("");
};

// Fonctions base du site

// Creation de la liste des projets
export async function createProjets() {
    const listeProjets = await fetch("http://localhost:5678/api/works");
    const projets = await listeProjets.json();

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

// Fonction d'écoute d'un clique sur chaque projet (possibilité d'ajouter des actions dans le futur)
function listenProjets() {
    const allProjets = document.querySelectorAll(".gallery figure");

    allProjets.forEach(element => {
        element.addEventListener("click", event => {
            console.log(element.dataset);

        });
    });
};

// Creation de la liste des filtres
export async function createFilters() {
    const listeProjets = await fetch("http://localhost:5678/api/works");
    const projets = await listeProjets.json();

    const listeCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await listeCategories.json();

    const divFiltres = document.querySelector("div.filtres");

    let filtre = document.createElement("h3");
    filtre.innerText = "Tous";
    filtre.dataset.id = 0;
    filtre.style.backgroundColor = "#1D6154";
    filtre.style.color = "white";
    filtre.dataset.active = "true";
    divFiltres.appendChild(filtre);

    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];

        filtre = document.createElement("h3");
        filtre.innerText = element.name;
        filtre.dataset.id = element.id;
        filtre.dataset.active = "false";
        divFiltres.appendChild(filtre);
    }

    listenFilters(projets);

};

// Fonction d'écoute de clique et d'hover pour chaque filtre (avec fonction pour filter les projets)
function listenFilters(projets) {
    const filtresButtons = document.querySelectorAll(".filtres h3");
    const filtresButtonss = document.getElementById("saucisse");

    if (filtresButtonss) filtresButtonss.style.color = "black";
    if (filtresButtonss) filtresButtonss.style.backgroundColor = "black";
    if (filtresButtonss) filtresButtonss.style.border = "1px solid black";



    filtresButtons.forEach(element => {
        //console.log(element);

        element.addEventListener("mouseover", event => {
            element.style.color = "white";
            element.style.backgroundColor = "#1D6154";
            element.style.border = "1px solid #1D6154";
        });

        element.addEventListener("mouseout", event => {
            if (element.dataset.active === "false") {
                element.style.color = "black";
                element.style.backgroundColor = "#FFFEF8";
                element.style.border = "1px solid #1D6154";
            };
        });

        element.addEventListener("click", event => {
            filtresButtons.forEach(element => {
                element.style.backgroundColor = "#FFFEF8";
                element.style.color = "black";
                element.dataset.active = "false"
            });

            element.style.backgroundColor = "#1D6154";
            element.style.color = "white";
            element.dataset.active = "true"


            if (element.dataset.id == 0) {
                const projetsFiltrees = projets;
                createProjets(projetsFiltrees);
            } else {
                const projetsFiltrees = projets.filter(function (projet) {
                    return projet.category.id == element.dataset.id;
                });
                createProjets(projetsFiltrees);
            };
        }, false);
    });
};

// Fonctions Login / Logout

// Création de la constante localStorage pour plus de facilité dans les différentes fonctions
const localStorage = window.localStorage;

// Création de la popup pour se déconnecter du site
export function askLogout() {
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

// Donne ou retire l'accès aux outils d'éditions des projets
export function editMode(boolean) {
    const editingModeDiv = document.querySelector("#editing-mode");
    const header = document.querySelector("header");
    let headerInnerHTML = header.innerHTML;
    const mesProjetsTitres = document.querySelector("#portfolio h2");
    let mesProjetsTitresInnerHTML = mesProjetsTitres.innerHTML;

    if (boolean) {
        header.innerHTML = '<div id="editing-mode"><h3><i class="fa-regular fa-pen-to-square"></i> Mode édition</h3></div>' + headerInnerHTML;
        mesProjetsTitres.innerHTML = mesProjetsTitresInnerHTML + '<span><i class="fa-regular fa-pen-to-square"></i>modifier</span>';
        header.style.paddingTop = "100px";
        listenEditProjects();
    } else {
        header.innerHTML = header.innerHTML.replace('<div id="editing-mode"><h3><i class="fa-regular fa-pen-to-square"></i> Mode édition</h3></div>', "");
        mesProjetsTitres.innerHTML = mesProjetsTitres.innerHTML.replace('<span><i class="fa-regular fa-pen-to-square"></i>modifier</span>', "");
        header.style.paddingTop = "40px";
    }
};

// Regarde si la personne est connecté pour changer le lien login en logout, ainsi que donner l'accès aux outils d'éditions
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

// Ecoute si le lien "logout" est cliqué, fait la demande de création de la popup de déconnection
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

// Fonction pour déconncter l'utilisateur
// Fait appel à la fonction pour vérifier si l'utilisateur est connecté afin de lui retirer l'accès aux outils d'éditions
export function logoutAccount(logoutCover) {
    logoutCover.remove();
    localStorage.removeItem("token");
    isConnected();
};

// Ecoute ce qu'il se passe dans la popup de déconnection
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

// Fonctions d'édition 

// Ecoute là ou clique l'utilisateur afin de fermer la popup d'édition ou d'ajouter / supprimer des projets
function editPopupListener() {
    const editCover = document.querySelector("#cover");
    const editButton = document.querySelector("#edit button");
    const editCloseIcon = document.querySelector("#edit #close-icon");
    const deleteIcon = document.querySelectorAll("#edit #allProjetcts i");

    deleteIcon.forEach(element => {
        element.addEventListener("click", event => {
            console.log(element.id);
            deleteProject(element);
        });
    });

    editCover.addEventListener("click", event => {
        if (event.target === editCover) editCover.remove();
    });

    editCloseIcon.addEventListener("click", event => {
        editCover.remove()
    });

    editButton.addEventListener("click", event => {
        createEditPopupAjoutPhoto();
    });
};

// Ecoute là ou clique l'utilisateur afin de fermer la popup d'édition de retour en arrière / envoie du formulaire
async function editPopupAddPhotoListener() {
    const editCover = document.querySelector("#cover");
    const editCloseIcon = document.querySelector("#edit #close-icon");
    const editBackIcon = document.querySelector("#edit #back-icon");
    const editAddPhotoDiv = document.querySelector("#image-div");
    const editFormDiv = document.querySelector("#form-div");
    const editForm = document.querySelector("#edit form");
    const editInput = document.querySelectorAll("#edit input");
    const editAddPhotoImg = document.querySelector("#image-div img");

    let imgValid = false;
    let titleValid = false;

    editFormDiv.addEventListener("input", event => {
        if (event.target.value === "") titleValid = false;
        if (event.target.value !== "") titleValid = true;
        isFormCompleted(imgValid, titleValid);
    });

    editAddPhotoDiv.addEventListener("click", async event => {
        const acceptedFiles = ["png", "jpeg"];
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = ".png, .jpeg";
        input.onchange = _ => {
            // you can use this method to get file and perform respective operations
            let files = Array.from(input.files);
            console.log(files[0]);

            let goodFileType = false;

            for (let i = 0; i < acceptedFiles.length; i++) {
                const element = acceptedFiles[i];
                if (files[0].type.endsWith(element)) goodFileType = true
            };

            console.log(goodFileType);

            const errorMessageExist = document.querySelector("#error-message");

            if (!errorMessageExist) {
                const errorMessage = document.createElement("p");
                errorMessage.setAttribute("id", "error-message");
                errorMessage.innerText = "Le type de fichier n'est pas bon."
                if (goodFileType === false) editForm.insertBefore(errorMessage, editFormDiv)
            };

            if (goodFileType === true) {
                if (errorMessageExist !== null) errorMessageExist.remove();
                const addProjectImage = document.createElement("img");
                let test = input.files[0].text()

                let fr = new FileReader();

                fr.onload = function () {
                    addProjectImage.src = fr.result
                }
                fr.readAsDataURL(files[0])
                editAddPhotoDiv.innerHTML = ""
                editAddPhotoDiv.appendChild(addProjectImage)
                imgValid = true
                isFormCompleted(imgValid, titleValid);

            };
        };
        input.click();

    });

    editCover.addEventListener("click", event => {
        if (event.target === editCover) editCover.remove();
    });

    editCloseIcon.addEventListener("click", event => {
        editCover.remove()
    });

    editBackIcon.addEventListener("click", event => {
        editPopup();
    });

};

async function sendProject(event) {
    const editCover = document.querySelector("#cover");
    const editCloseIcon = document.querySelector("#edit #close-icon");
    const editBackIcon = document.querySelector("#edit #back-icon");
    const editAddPhotoDiv = document.querySelector("#image-div");
    const editFormDiv = document.querySelector("#form-div");
    const editForm = document.querySelector("#edit form");
    const editInput = document.querySelector("#edit input");
    const editSelect = document.querySelector("#edit select");
    const editAddPhotoImg = document.querySelector("#image-div img");

    let category

    console.log(editForm);

    switch (editSelect.value.toLowerCase()) {
        case "objets":
            category = 1;
            break;
        case "appartements":
            category = 2;
            break;
        case "hotels & restaurants":
            category = 3;
            break;

        default:
            console.log("Il y'a une erreur dans la catégorie.");
            break;
    };

    console.log(editAddPhotoImg);

    const parameters = {
        image: editAddPhotoImg.src,
        title: editInput.value,
        category: category
    };

    console.log(parameters);


    console.log(localStorage.token);

    const response = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        body: {
            parameters
        }
    });
};

function isFormCompleted(imgStatus, titleStatus) {
    const validAddProject = document.querySelector("#edit button");
    validAddProject.style.backgroundColor = "grey";
    console.log("IMG : " + imgStatus);
    console.log("Titre : " + titleStatus);
    if (imgStatus === true && titleStatus === true) {
        validAddProject.style.backgroundColor = "#1D6154";
        validAddProject.style.cursor = "pointer";
        validAddProject.addEventListener("click", sendProject);
    };
};

// Créer la base de la popup d'édition
export async function editPopup() {


    let cover = document.querySelector("#cover");
    const mainDiv = document.querySelector("main");

    if (!cover) {

        const editPopupCover = document.createElement("div");
        editPopupCover.setAttribute("id", "cover");

        const editPopupDiv = document.createElement("div");
        editPopupDiv.setAttribute("id", "edit");
        editPopupDiv.setAttribute("class", "popup");
        editPopupCover.appendChild(editPopupDiv);

        mainDiv.appendChild(editPopupCover);
    }

    createEditPopupHome();

    // Juste pour les tests
    //createEditPopupAjoutPhoto();
};

// Affiche le premier slide de la popup d'édition
async function createEditPopupHome() {
    const listeProjets = await fetch("http://localhost:5678/api/works");
    const projets = await listeProjets.json();

    let cover = document.querySelector("#cover");

    const editPopupDiv = document.querySelector("#edit");

    editPopupDiv.innerHTML = "";

    let quitIcon = document.createElement("i");
    quitIcon.setAttribute("class", "fa-solid fa-xmark");
    quitIcon.setAttribute("id", "close-icon");
    editPopupDiv.appendChild(quitIcon);

    const editPopupH2 = document.createElement("h2");
    editPopupH2.innerText = "Galerie photo";
    editPopupDiv.appendChild(editPopupH2);

    const allProjetcts = document.createElement("div");
    allProjetcts.setAttribute("id", "allProjetcts");
    editPopupDiv.appendChild(allProjetcts);

    allProjetcts.innerHTML = "";

    for (let i = 0; i < projets.length; i++) {
        const element = projets[i];
        let figure = document.createElement("figure");
        figure.dataset.id = element.id;
        figure.dataset.category_id = element.category.id;

        let elementDiv = document.createElement("div");

        let deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "fa-solid fa-trash-can");
        deleteIcon.setAttribute("id", element.id)
        elementDiv.appendChild(deleteIcon);

        let image = document.createElement("img");
        image.setAttribute("src", element.imageUrl);
        elementDiv.appendChild(image);


        figure.appendChild(elementDiv);



        allProjetcts.appendChild(figure);
    };

    const editPopupAddPictureButton = document.createElement("button");
    editPopupAddPictureButton.setAttribute("id", "ajouter-photo");
    editPopupAddPictureButton.innerText = "Ajouter une photo";
    editPopupDiv.appendChild(editPopupAddPictureButton);

    cover = document.querySelector("#edit");

    editPopupListener();
};

// Affiche la slide ajout photo de la popup d'édition
async function createEditPopupAjoutPhoto() {
    const listeCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await listeCategories.json();

    const cover = document.querySelector("#cover");

    const editPopupDiv = document.querySelector("#edit");

    editPopupDiv.innerHTML = "";

    const backIcon = document.createElement("i");
    backIcon.setAttribute("class", "fa-solid fa-arrow-left");
    backIcon.setAttribute("id", "back-icon");
    editPopupDiv.appendChild(backIcon);

    const quitIcon = document.createElement("i");
    quitIcon.setAttribute("class", "fa-solid fa-xmark");
    quitIcon.setAttribute("id", "close-icon");
    editPopupDiv.appendChild(quitIcon);

    const editPopupH2 = document.createElement("h2");
    editPopupH2.innerText = "Ajout photo";
    editPopupDiv.appendChild(editPopupH2);

    const editPopupForm = document.createElement("form");

    const editPopupPictureDiv = document.createElement("div");
    editPopupPictureDiv.setAttribute("id", "image-div");
    const editPopupPictureDivIcon = document.createElement("i");
    editPopupPictureDivIcon.setAttribute("class", "fa-regular fa-image");
    editPopupPictureDiv.appendChild(editPopupPictureDivIcon);

    const editPopupPictureDivAddText = document.createElement("h4");
    editPopupPictureDivAddText.innerText = "+ Ajouter photo";
    editPopupPictureDiv.appendChild(editPopupPictureDivAddText);

    const editPopupPictureDivMaxSpace = document.createElement("p");
    editPopupPictureDivMaxSpace.innerText = "jpg, png : 4mo max";
    editPopupPictureDiv.appendChild(editPopupPictureDivMaxSpace);
    editPopupForm.appendChild(editPopupPictureDiv);


    const formDiv = document.createElement("div");
    formDiv.setAttribute("id", "form-div");

    const formDivTitle = document.createElement("div");
    formDivTitle.setAttribute("id", "form-title-div");
    const formDivTitleLabel = document.createElement("label");
    formDivTitleLabel.setAttribute("for", "title");
    formDivTitleLabel.innerText = "Titre";
    formDivTitle.appendChild(formDivTitleLabel);

    const formDivTitleInput = document.createElement("input");
    formDivTitleInput.setAttribute("type", "text");
    formDivTitleInput.setAttribute("name", "title");
    formDivTitleInput.setAttribute("id", "title");
    formDivTitle.appendChild(formDivTitleInput);
    formDiv.appendChild(formDivTitle);

    const formDivCategory = document.createElement("div");
    formDivCategory.setAttribute("id", "form-title-div");
    const formDivCategoryLabel = document.createElement("label");
    formDivCategoryLabel.setAttribute("for", "title");
    formDivCategoryLabel.innerText = "Catégorie";
    formDivCategory.appendChild(formDivCategoryLabel);

    const formDivCategorySelect = document.createElement("select");
    formDivCategorySelect.setAttribute("name", "category");
    formDivCategorySelect.setAttribute("id", "category");

    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        const option = document.createElement("option");
        option.setAttribute("value", element.name);
        option.innerHTML = element.name;
        formDivCategorySelect.appendChild(option)
    }

    /*const formDivCategoryInput = document.createElement("input");
    formDivCategoryInput.setAttribute("type", "text");
    formDivCategoryInput.setAttribute("name", "category");
    formDivCategoryInput.setAttribute("id", "category");
    formDivCategoryInput.setAttribute("list", "category-list");

    const formDivCategoryInputDatalist = document.createElement("datalist");
    formDivCategoryInputDatalist.setAttribute("id", "category-list");

    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        console.log(element);
        const option = document.createElement("option");
        option.setAttribute("value", element.name);
        option.innerHTML = element.name;
        formDivCategoryInputDatalist.appendChild(option)
    }

    formDivCategory.appendChild(formDivCategoryInputDatalist)
    formDivCategory.appendChild(formDivCategoryInput);//



    formDivCategory.appendChild(formDivCategorySelect)
    formDiv.appendChild(formDivCategory);

    const formDivButton = document.createElement("button");
    formDivButton.setAttribute("id", "valider");
    formDivButton.innerText = "Valider";

    editPopupForm.appendChild(formDiv);
    editPopupDiv.appendChild(editPopupForm);
    editPopupDiv.appendChild(formDivButton);

    editPopupAddPhotoListener();

};

// Ecoute si le bouton "modifier" est cliqué
export function listenEditProjects() {
    const editButton = document.querySelector("#portfolio h2 span");

    editButton.addEventListener("click", event => {
        editPopup();
    });
};

async function deleteProject(element) {
    console.log(element);

    const listeProjets = await fetch("http://localhost:5678/api/works");
    const projets = await listeProjets.json();

    const selectedProject = projets.filter(function (projet) {
        return projet.id == element.id;
    });

    console.log(selectedProject);

    const mainDiv = document.querySelector("main");

    const logoutCover = document.createElement("div");
    logoutCover.setAttribute("id", "cover");
    logoutCover.setAttribute("class", "delete-project-cover");

    const logoutDiv = document.createElement("div");
    logoutDiv.setAttribute("id", "delete-project");
    logoutDiv.setAttribute("class", "popup");
    logoutCover.appendChild(logoutDiv);

    const logoutH2 = document.createElement("h2");
    logoutH2.innerText = "Supprimer " + selectedProject[0].title;
    logoutDiv.appendChild(logoutH2);

    const logoutH3 = document.createElement("h3");
    logoutH3.innerText = "Êtes vous sûr de vouloir supprimer ce projet ?";
    logoutDiv.appendChild(logoutH3);

    const logoutButtonYes = document.createElement("button");
    logoutButtonYes.setAttribute("id", "delete-oui");
    logoutButtonYes.innerText = "Oui";
    logoutDiv.appendChild(logoutButtonYes);

    const logoutButtonNo = document.createElement("button");
    logoutButtonNo.setAttribute("id", "delete-non");
    logoutButtonNo.innerText = "Non";
    logoutDiv.appendChild(logoutButtonNo);

    mainDiv.appendChild(logoutCover);

    deleteProjectResponseListener(element.id);
};

function deleteProjectResponseListener(id) {
    const deleteProjectCover = document.querySelector(".delete-project-cover");
    const deleteProjectPopup = document.querySelector("#delete-project");
    const deleteProjectButtons = document.querySelectorAll("#delete-project button");

    deleteProjectCover.addEventListener("click", event => {
        if (event.target === deleteProjectCover) deleteProjectCover.remove();
    });

    deleteProjectButtons.forEach(element => {
        element.addEventListener("click", event => {
            if (element.innerText.toLowerCase() === "non") deleteProjectCover.remove();
            if (element.innerText.toLowerCase() === "oui") {
                removeProject(id);
                createEditPopupHome();
                createProjets()
            };
        });
    });
};

async function removeProject(id) {
    console.log(localStorage.getItem("token"));
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    console.log(response);
};

*/