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

}

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
            }
        });
    });   
}