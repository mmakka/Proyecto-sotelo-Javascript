const carrito= JSON.parse(localStorage.getItem("carrito")) || [];

const search = document.querySelector("#input-search");
const cajaTarjetas = document.querySelector(".tarjetas");
 const cajaCarrito = document.querySelector(".carrito");
 const nuevoProducto = new ProductosInfo( 10,"Crema facial hidratante", "Avon",800, "articulo10.jpg");
 const nuevoProducto2 = new ProductosInfo( 11,"Crema facial hidratante","Revlon",1100,"articulo10.jpg");
 
const productos = [
    {id: 1, nombre : "Labial 24hs matte" , marca : "Maybelline", precio : 1500, img: "articulo1.jpg"},
    {id: 2, nombre : "Labial 24 hs" , marca : "Maybelline", precio :1600, img: "articulo3.jpg"},
    {id: 3, nombre : "Labial matte" , marca : "Maybelline", precio :1300 , img: "articulo3.jpg"},
    {id: 4, nombre : "Labial hidratante" , marca : "Maybelline", precio :1000, img: "articulo4.jpg"},
    {id: 5, nombre : "Labial perlado" , marca : "Maybelline", precio :1100, img: "articulo5.jpg"},
    {id: 6, nombre : "Mascara de pestañas" , marca : "Maybelline", precio :1500, img: "articulo7.jpg"},
    {id: 8, nombre : "Mascara de pestañas" , marca : "Maybelline", precio :1100, img: "articulo1.jpg"},
    {id: 9, nombre : "Mascara de pestañas larga duracion" , marca : "Maybelline", precio :1500, img: "articulo11.jpg "},
];

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

cargarArticulos(productos,nuevoProducto);
cargarArticulos(productos,nuevoProducto2);


/*flitrar por precio
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
const precio = filtrarporPrecio(productos,filtroprecio);  */

function busquedaporNombre(arr,filtro) {
    const nombreBusqueda = arr.filter ((el) => {
        return el.nombre.includes(filtro)
    });
    return nombreBusqueda;
;}

function crearHtml(arr) {
    let html = "";
    for ( element of productos) {
      html += `<div class = "tarjeta">
      <img src="../images/${element.img}" alt="">
      <h4>${element.nombre}</h4>
      <h6>${element.marca}</h6>
      <p>$${element.precio}</p>
      <button class= "btnCarrito" id="btn-agregar${element.id}" >Agregar</button>
      </div>`
  };
      cajaTarjetas.innerHTML += html;
      agregarFuncionAlBoton();
    };


function agregarFuncionAlBoton(){
    productos.forEach(element=>{
        document.querySelector(`#btn-agregar${element.id}`).addEventListener("click",()=>{
            agregarAlCarrito(element);
        })
    }) 
};


function agregarAlCarrito(element){ 
    let existe = carrito.some(prod=>prod.id === element.id);

    if( existe===false ){
        element.cantidad = 1;
        carrito.push(element);
    }
    else{
        let prodFind = carrito.find( prod=> prod.id===element.id );
        prodFind.cantidad++;
    }
    actualizarCarrito();
};

function actualizarCarrito(){
    cajaCarrito.innerHTML = "";
    carrito.forEach(prod=>{
        cajaCarrito.innerHTML += `<div class ="carrito">
        <h4>${prod.nombre}</h4>
        <h3>CANTIDAD: ${prod.cantidad}</h3>
        <p>$${prod.precio}</p>
        <button class="btnCarrito" id="btn-borrar${prod.id}">Borrar</button>
        </div>`
    })
    localStorage.setItem("carrito",JSON.stringify(carrito))
    borrarProducto();
}

function borrarProducto(){
    carrito.forEach(producto=>{
        document.querySelector(`#btn-borrar${producto.id}`).addEventListener("click",()=>{
            let indice = carrito.findIndex(element=>element.id===producto.id);
            carrito.splice(indice,1);
            actualizarCarrito()
        })
    })
}



//listener Funciona pero no lo pinta en html;
    search.addEventListener("click", (e) => {
    e.preventDefault();
    let nuevoFiltro =busquedaporNombre(productos,search.value);
    console.log(nuevoFiltro);
    cajaTarjetas.innerHTML = "";
    crearHtml(nuevoFiltro);
});

actualizarCarrito();
crearHtml();

