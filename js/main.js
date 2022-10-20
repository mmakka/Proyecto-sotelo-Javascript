
 // Swal.fire("Bienvenido");
const btnFinal = document.querySelector("#finalizar");
const total= document.querySelector("#total");
const carrito= JSON.parse(localStorage.getItem("carrito")) || [];
const cajaTarjetas = document.querySelector(".tarjetas");
const cajaCarrito = document.querySelector(".carrito");
const buscar = document.querySelector("#ingreso");
const search = document.querySelector("#btnSearch");
const nuevoProducto = new ProductosInfo( 10,"Crema facial hidratante", "Avon",800, "articulo10.jpg");
const nuevoProducto2 = new ProductosInfo( 11,"Crema facial hidratante","Revlon",1100,"articulo10.jpg");
 

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
        <button class= "btnCarrito" id="btn-agregar${element.id}" >Agregar</button>
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
    sumarTotal();
};


function actualizarCarrito(){
    cajaCarrito.innerHTML = "";
    carrito.forEach(prod=>{
        cajaCarrito.innerHTML += `<div class ="carrito">
        <div>
        <h4>${prod.nombre}</h4>
        <h3>CANTIDAD: ${prod.cantidad}</h3>
        <p>$${prod.precio}</p>
        <button class="btnCarrito" id="btn-borrar${prod.id}">Eliminar</button>
        </div>
        <div>`
    })
    
    localStorage.setItem("carrito",JSON.stringify(carrito))
    borrarProducto();
    sumarTotal();
}


function borrarProducto(){
    carrito.forEach(producto=>{
        document.querySelector(`#btn-borrar${producto.id}`).addEventListener("click",()=>{
            let indice = carrito.findIndex(element=>element.id===producto.id);
            carrito.splice(indice,1);
            Swal.fire({
                title: 'Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, estoy seguro!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado!',
                  )
                }
              })
            actualizarCarrito()
        })
    })
};


function sumarTotal(){
    let Total = 0;
    cardTotal= document.querySelector("#cardTotal");
    carrito.forEach((prod) =>{
        const precio = carrito.reduce((acc,prod)=> acc + prod.precio, 0 )
        Total =  carrito.reduce ((acc,prod)=> acc + prod.cantidad * prod.precio , 0 )
    });
    cardTotal.innerHTML = `Total $${Total}`
}


    const fetchApi = async ()=>{
    const response = await fetch(`./js/data.json`);
    const data = await response.json();
    crearHtml(data);


    search.addEventListener("click", ()=>{
        const filtro = filtrarPorNombre(data)
        crearHtml(filtro)
    });
}


    btnFinal.addEventListener("click",()=>{
        cajaCarrito.style.display = "none";
        cardTotal.style.display = "none";
        localStorage.clear()
})


fetchApi();
actualizarCarrito();
