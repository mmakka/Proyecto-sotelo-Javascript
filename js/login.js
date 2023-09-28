const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btnSubmit= document.querySelector("#btnIngresar");
const btnFinal = document.querySelector("#finalizar");

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


btnFinal.addEventListener("click",()=>{
        localStorage.clear()
        Swal.fire({
            title: 'Gracias por tu compra',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            ` })

});  