console.log("-------------------------------------- NEXT EN DESSOUS --------------------------------------");
const loginDiv = document.querySelector("#login");
const localStorage = window.localStorage;

loginDiv.addEventListener("submit", async event => {
    event.preventDefault();


    const loginMail = document.querySelector("#login #email");
    const loginPassword = document.querySelector("#login #password");

    const loginInput = document.querySelectorAll("#login input");


    loginInput.forEach(element => {
        if (!element.id) return
        if (element.value === "") return console.log(`La balise ${element.id} est vide`);
        else console.log(`La balise ${element.id} n'est pas vide`);
    });

    const email = loginMail.value;
    const password = loginPassword.value;

    console.log(email);
    console.log(password);

    // mail = sophie.bluel@test.tld
    // password = S0phie

    // token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4

    const properties = {
        email: email,
        password: password,
    };

    console.log(properties);


    const propertie = JSON.stringify(properties)

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: propertie


    });


    
    console.log(reponse);
});