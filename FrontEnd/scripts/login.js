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
        if (!element.id) return
    });

    const email = loginMail.value;
    const password = loginPassword.value;

    const properties = {
        email: email,
        password: password,
    };

    const propertie = JSON.stringify(properties)

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
                reponse.json().then(data => localStorage.setItem("token", data.token))
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