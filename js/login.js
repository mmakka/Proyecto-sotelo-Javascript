const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btnSubmit= document.querySelector("#btnIngresar");


function almacenar(valor){
let user = {username : email.value , password : password.value}

if( valor == "sessionStorage"){
    sessionStorage.setItem("user", JSON.stringify(user));
}

if( valor == "localStorage"){
    localStorage.setItem("user", JSON.stringify(user));
}
 return user
}

function recuperar(datos){
    if (datos ){
        email.value = datos.username;
        password.value = datos.password;
    }
}

recuperar(JSON.parse(localStorage.getItem("user")));

btnSubmit.addEventListener("click", (e)=>{
    e.preventDefault();
    almacenar("localStorage")

});