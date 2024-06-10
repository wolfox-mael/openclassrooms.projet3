let files;
let file;

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

// Ecoute si le bouton "modifier" est cliqué
export function listenEditProjects() {
    const editButton = document.querySelector("#portfolio h2 span");

    editButton.addEventListener("click", event => {
        editPopup();
    });
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
            if (element.innerText.toLowerCase() === "oui") removeProject(id); //console.log("Cette option n'est pas encore disponible.");
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
    editPopupForm.setAttribute("enctype", "multipart/form-data");
    editPopupForm.setAttribute("method", "post");
    editPopupForm.setAttribute("name", "new-project");
    

    // ICI

    const editPopupPictureDiv = document.createElement("div");
    editPopupPictureDiv.setAttribute("id", "image-div");

    const editPopupInput = document.createElement("input");
    editPopupInput.setAttribute("type", "file");
    editPopupPictureDiv.appendChild(editPopupInput);

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


    /*
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

    // ICI */


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
    formDivCategory.appendChild(formDivCategoryInput);*/
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
        isFormCompleted(imgValid, titleValid, file);
    });

    editAddPhotoDiv.addEventListener("click", async event => {
        const acceptedFiles = ["png", "jpeg"];
        const input = document.querySelector("#image-div input");
        input.type = 'file';
        input.accept = ".png, .jpeg";
        input.onchange = _ => {
            files = Array.from(input.files);
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
                file = fr.readAsDataURL(files[0])
                editAddPhotoDiv.innerHTML = ""
                editAddPhotoDiv.appendChild(addProjectImage)
                imgValid = true
                isFormCompleted(imgValid, titleValid);

            };
        };
        input.click();


        {
            /*
                    const propertie = {
                        title: "",
                        imageUrl: "",
                        categoryId: ""
                    }
                    const listeProjets = await fetch("http://localhost:5678/api/works", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: propertie
                    });
                    //const projets = await listeProjets.json();
                    
                    console.log("wow");
                    */
        }

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

function isFormCompleted(imgStatus, titleStatus) {
    const validAddProject = document.querySelector("#edit button");
    validAddProject.style.backgroundColor = "grey";
    if (imgStatus === true && titleStatus === true) {
        validAddProject.style.backgroundColor = "#1D6154";
        validAddProject.style.cursor = "pointer";
        validAddProject.addEventListener("click", sendProject);
    };
};

async function sendProject() {
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
      
        // on construit un objet FormData qui déclenche
        // l'évènement formdata
        new FormData(editForm);



        console.log("formdata déclenché");
      
        // On récupère les données du formulaire depuis
        // l'objet représentant l'évènement
        const data = formData;
        for (const value of data.values()) {
          console.log(value);
        }
      
        await fetch(`http://localhost:5678/api/works`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
                },
                //*
            body: {
                data
            }
            //*/
        }).then(response => console.log(response));


    return;


    console.log(editAddPhotoImg);

    let parameters = {
        image: editAddPhotoImg.src,
        title: editInput.value,
        category: category
    };

    console.log(parameters);


    console.log(typeof parameters);


    const response = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
            },
            //*
        body: {
            image: editAddPhotoImg.src,
            title: "editInput.value",
            category: category
        }
        //*/
    }).then(response => console.log(response));
};