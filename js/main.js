const total = document.querySelector(".cardTotal");
const vercarrito = document.querySelector(".ver-carrito");
const modalContent = document.querySelector(".modal-container");
const carrito= JSON.parse(localStorage.getItem("carrito")) || [];
const cantidadCarrito = document.getElementById("cantidadCarrito")
const cajaTarjetas = document.querySelector(".tarjetas");
const cajaCarrito = document.querySelector(".carrito");
const buscar = document.querySelector("#ingreso");
const search = document.querySelector("#btnSearch");
const nuevoProducto2 = new ProductosInfo( 11,"Crema facial hidratante","Revlon",1100,"articulo10.jpg");
const finalCompra = document.querySelector("#login");

function ProductosInfo(id,nombre,marca,precio,img){
    this.id = id;
    this.nombre = nombre;
    this.marca = marca;
    this.precio = parseFloat(precio);
    this.img = img;
};

function cargarArticulos(arr,element) {
    arr.push(element);
}

function crearHtml(arr) {
    let html = "";
    cajaTarjetas.innerHTML = "";
    for ( element of arr) {
    let {id, nombre, marca, precio,img } = 
        element ;
        html += `<div class = "tarjeta">
        <img src="../images/${img}" alt="">
        <h4>${nombre}</h4>
        <h6>${marca}</h6>
        <p>$${precio}</p>
        <button class= "btnCarrito" id ="btn-agregar${element.id}">Agregar</button>
        </div>`
    };
    cajaTarjetas.innerHTML += html;
    agregarFuncionAlBoton(arr);
    
};

function filtrarPorNombre(array){
    let nombre = buscar.value;
    let nombreC = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    if (!nombre) {
    return array;
    } else {
    return array.filter((e) => e.nombre.includes(nombreC));
    }
}

function agregarFuncionAlBoton(productos){
    productos.forEach(element =>{
        document.querySelector(`#btn-agregar${element.id}`).addEventListener("click",()=>{
            agregarAlCarrito(element);
            

        })
    }) 
};


function agregarAlCarrito(element){ 
    let existe = carrito.some( prod => prod.id === element.id);
    if (existe===false ) {
        element.cantidad = 1;
        carrito.push(element);
    } else {
        let prodFind = carrito.find( prod=> prod.id === element.id);
        prodFind.cantidad ++; 
    } 
 //   actualizarCarrito();
 //   sumarTotal();
};

function actualizarCarrito(){
    cajaCarrito.innerHTML = "";
    carrito.forEach(prod=>{
        cajaCarrito.innerHTML +=`<div class="carrito">
        <div>
        <h3>${prod.nombre}</h3>
        <h6>CANTIDAD:${prod.cantidad}</h6>
        <p>$${prod.precio * prod.cantidad}</p>
        <button id="btn-borrar${prod.id}"class="btnCarrito">Eliminar</button>
        </div>
        <div>`
    });
    localStorage.setItem("carrito",JSON.stringify(carrito))
    borrarProducto();
    sumarTotal();
};


function borrarProducto () {
    carrito.forEach(producto =>{
        document.querySelector(`#btn-borrar${producto.id}`).addEventListener("click",()=>{
        console.log("clickeaste");
            let indice = carrito.findIndex(element => element.id === producto.id);
            carrito.splice(indice -1,1);
            actualizarCarrito()
            })  
        })  
};


function sumarTotal () {
    let totalProductos = 0;
    cardTotal = document.querySelector("#cardTotal");
    carrito.forEach((prod) =>{
        const precio = carrito.reduce((acc,prod)=> acc + prod.precio, 0 );
        totalProductos = carrito.reduce ((acc,prod)=> acc + prod.precio * prod.cantidad , 0 );
        cardTotal.innerHTML =`
        <div>
        <h6>Total: $${totalProductos}</h6>
        </div>`
    });
};


const fetchApi = async ()=>{
const response = await fetch(`./js/data.json`);
const data = await response.json();
crearHtml(data);

vercarrito.addEventListener("click",()=>{
    actualizarCarrito();
    sumarTotal();
   });


search.addEventListener("click", ()=>{
    const filtro = filtrarPorNombre(data)
    crearHtml(filtro)
    });
}

finalCompra.addEventListener("click", ()=>{
    console.log("Clikeaste");
    cajaCarrito.style.display = "none";
    total.style.display = "none";
    finalCompra.style.display= "none";
});


fetchApi();
actualizarCarrito();
