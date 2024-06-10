const loginDiv = document.querySelector("#login");
const localStorage = window.localStorage;

const nav = document.querySelectorAll("nav li");
const navLink = document.querySelectorAll("nav a");
let loginNav = undefined;
let loginNavLink = undefined;

if (localStorage.token !== undefined) window.location.href = "/FrontEnd/index.html";

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



loginDiv.addEventListener("submit", async event => {
    event.preventDefault();


    const loginMail = document.querySelector("#login #email");
    const loginPassword = document.querySelector("#login #password");

    const loginInput = document.querySelectorAll("#login input");


    loginInput.forEach(element => {
        if (!element.id) return
    });

    const email = loginMail.value;
    const password = loginPassword.value;

    // [a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+

    const properties = {
        email: email,
        password: password,
    };


    const propertie = JSON.stringify(properties)

    // if (bonMail !== email) return loginMail.setCustomValidity("L'adresse mail n'est pas bonne");
    // if (bonPassword !== password) return loginPassword.setCustomValidity("Le mot de passe n'est pas bon");

    let responseCode
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: propertie
    }).then(response => response.json()).then(data => {
        responseCode = 200;
        localStorage.setItem("token", data.token);
    })

    const errorText = document.querySelectorAll("#login #error");

    switch (responseCode) {
        case 200:
            window.location.href = "/FrontEnd/index.html";
            break;
        default:
            errorText.forEach(element => {
                element.style.display = "inline";
            });
            break;
    };
});