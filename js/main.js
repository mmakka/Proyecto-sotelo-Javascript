
 /*function productosUsuario(){
    let producto;
    do{
        producto= prompt("Eleji tu producto \n 1)rimmel \n 2) labial \n 3) Crema")}
        while(producto != 1 && producto != 2 && producto !=3);
        switch (producto){
            case "1":
                return "rimmel";
            case "2" :
                return "labial";
            case "3":
                return "crema";
        }
    } */


let ingreso = prompt("Ingresa un producto para mejorar tu busqueda");

const productos = [
    {id: 1, nombre : "Labial 24hs matte" , marca : "Maybelline", precio : 1500},
    {id: 2, nombre : "Labial 24 hs" , marca : "Maybelline", precio :1600},
    {id: 3, nombre : "Labial matte" , marca : "Maybelline", precio :1300},
    {id: 4, nombre : "Labial hidratante" , marca : "Maybelline", precio :1000},
    {id: 5, nombre : "Labial perlado" , marca : "Maybelline", precio :1100},
    {id: 6, nombre : "Mascara de pestañas" , marca : "Maybelline", precio :1500},
    {id: 7, nombre : "Mascara de pestañas a prueba de agua" , marca : "Maybelline", precio :1600},
    {id: 8, nombre : "Mascara de pestañas" , marca : "Maybelline", precio :1100},
    {id: 9, nombre : "Mascara de pestañas larga duracion" , marca : "Maybelline", precio :1500},
];

function ProductosInfo(id,nombre,marca,precio){
    this.id = id;
    this.nombre = nombre;
    this.marca = marca;
    this.precio = parseFloat(precio);
};

const nuevoProducto = new ProductosInfo( 10,"Crema facial hidratante", "Avon",800);
const nuevoProducto2 = new ProductosInfo( 11,"Crema facial hidratante","Revlon",1100);
const nuevoProducto3 = new ProductosInfo( 12,"Crema facial hidratante", "Cicatricure",900);
const nuevoProducto4 = new ProductosInfo( 13,"Crema facial hidratante", "Nivea",850);
const nuevoProducto5 = new ProductosInfo( 14,"Crema facial hidratante", "Pons",800);
const nuevoProducto6= new ProductosInfo ( 15,"Crema facial anti-edad", "Avon",1100);
const nuevoProducto7 = new ProductosInfo( 16,"Crema facial hidratante", "Natura",100);
const nuevoProducto8 = new ProductosInfo( 17,"Crema facial hidratante", "Dermaglos",1300);
const nuevoProducto9 = new ProductosInfo( 18,"Crema facial anti-arrugas","Dermaglos",800);
const nuevoProducto10 = new ProductosInfo( 19,"Crema facial hidratante", "La roche",800);

console.log(productos);

function cargarArticulos(arr,element) {
    arr.push(element);
}

cargarArticulos(productos,nuevoProducto);
cargarArticulos(productos,nuevoProducto2);
cargarArticulos(productos,nuevoProducto3);
cargarArticulos(productos,nuevoProducto4);
cargarArticulos(productos,nuevoProducto5);
cargarArticulos(productos,nuevoProducto6);
cargarArticulos(productos,nuevoProducto7);
cargarArticulos(productos,nuevoProducto8);
cargarArticulos(productos,nuevoProducto9);
cargarArticulos(productos,nuevoProducto10);

function busquedaporNombre(arr,filtro) {
    const nombreBusqueda = arr.filter ((el) => {
        return el.nombre.includes(filtro)
    });
    return nombreBusqueda;
} 

const resultado = busquedaporNombre(productos,ingreso);
console.log(resultado);


//Primer paso para el carrito de compras

carrito = [];

for (const element of resultado){
    carrito.push(element);
}

busquedaporNombre(carrito,resultado);
console.log(carrito);

let filtroprecio = prompt("Selecciona una opcion para mejorar tu busqueda: \n 1) Menor precio \n2) Mayor precio");

function filtrarporPrecio(arr,filtro){
   return arr.filter ((element) =>{
    switch (filtro) {
        case "1":
            return element.precio < 1000;
        case "2":
            return element.precio > 1000;
    }
   });
}

const precio = filtrarporPrecio(productos,filtroprecio);
console.log(precio);


const ul = document.getElementById("lista");

for (const producto of productos) {
    let li = document.createElement("li");
    li.innerHTML=
   `<h3>${producto.nombre}</h3>
    <p>${producto.marca}</p>
    <span>${producto.precio}</span> `
    ul.append(li);
}

const h1 = document.getElementById("h1");
let saludo = prompt("Hola ingresa tu nombre");
h1.innerText = "Hola " + saludo ;


