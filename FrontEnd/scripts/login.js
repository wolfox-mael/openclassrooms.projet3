import * as modules from "./main.js";

modules.startTests();

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

    // mail = sophie.bluel@test.tld
    // password = S0phie

    // token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"


    const bonMail = "sophie.bluel@test.tld";
    const bonPassword = "S0phie";

    // [a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+



    const properties = {
        email: email,
        password: password,
    };


    const propertie = JSON.stringify(properties)

    // if (bonMail !== email) return loginMail.setCustomValidity("L'adresse mail n'est pas bonne");
    // if (bonPassword !== password) return loginPassword.setCustomValidity("Le mot de passe n'est pas bon");

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: propertie
    });

    console.log(reponse.status);

    const errorText = document.querySelectorAll("#login #error");

    switch (reponse.status) {
        case 404:
            console.log("yap");
            errorText.forEach(element => {
                element.style.display = "inline";
            });
            break;
        case 200:
            console.log("Connecté");
            localStorage.setItem("token", token);
            window.location.href = "/FrontEnd/index.html";
            break;

        default:
            break;
    }





    console.log(reponse);
    console.log(reponse.ok);
    modules.isConnected();

});