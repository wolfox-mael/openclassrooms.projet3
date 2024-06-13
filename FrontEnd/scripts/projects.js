// Temporaire
export function startTests() {
    console.log("-------------------- NEXT EN DESSOUS ------------------");
    console.log("");
};

// Fonctions base du site

// Creation de la liste des projets
export async function createProjets(projets) {
    const listeProjets = await fetch("http://localhost:5678/api/works");

    if (!projets) projets = await listeProjets.json();
    
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
        });
    });
};

// Creation de la liste des filtres
export async function createFilters() {
    const divFiltres = document.querySelector("div.filtres");

    const listeProjets = await fetch("http://localhost:5678/api/works");
    const projets = await listeProjets.json();

    const listeCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await listeCategories.json();



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


    filtresButtons.forEach(element => {

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