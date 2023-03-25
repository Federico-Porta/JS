
let productos = [
    { id: 1, nombre: "Air Jordan 1 x Off White NSA", precio: 8990, stock:3, descripcion: "Estas Jordans fueron diseñadas por el famoso diseñador Robert L. Doski oriundo de las islas perdidas de alkatraz en honor a los astronautas que llegaron a marte en julio de 2022", Cantidadcompradas:501, imagen: "Joedan 1 x Off White" },
    { id: 2, nombre: "Jordan IV Fire Red", precio: 7990, stock:1, descripcion: "Fuego Rojo, referencia a la pelicula el infierno en el cielo, en la que Tom Crouse vuela con un cable de acero por encima de las llamas y el magma ardiente para salvar a Lillian J. Rose. los colores hacen referencia a la magma, el cable y la cara de Lillian al tener que saltar de semejante altura para salvarse.", Cantidadcompradas:500, imagen: "jordan 4 Fire Red"},  
    { id: 3, nombre: "Jordan IV blanco y negro", precio: 7000, stock:20, descripcion: "Una simple forma de pasar desapersivido sin perder el estilo y la comodidad que te puede brindar la marca, nadie va a mirar tus zapatillas por su colorida paleta, pero si lo haras tu por parecer que caminas sobre las nubes", Cantidadcompradas:203, imagen: "air jordan IV blanco y negro" },
    { id: 4, nombre: "Jordan Dior Game ready", precio: 7990, stock:1, descripcion: "Game Ready es una Colaboracion de la Marca Dior con Jordan para patrocinar su apoyo al deporte Femenino que viene en alsa y dejar en claro que las mujeres tambien se pueden calzar zapatillas", Cantidadcompradas:500, imagen: "Dior Game ready"},
    { id: 5, nombre: "Jordan IV pink", precio: 7990, stock:1, descripcion: "Como sabemos las Jordan ya no son unicamente para el Basquet, por lo que la marca lanzo estas Jordas 'Pink' las cuales fueron usadas por el grupo de K-pop 'BACKPINK' en el estreno de su gira mundial por europa. estas jordans estan hechas para sentir el ritmo.", Cantidadcompradas:500, imagen: "air jordan IV pink"},
    { id: 6, nombre: "Air Jordan 1 travis scott", precio: 6500, stock: 12, descripcion: "Un pedido especial para el famoso cantante de Rap Travis Scott se volvio viral en las redes y hoy es una zapatilla que rompe taquilla", Cantidadcompradas:503, imagen: "jordan 1 travis scott" },
  ];

let pagos = [
    {id: 1, nombre: "Efectivo", descuento: 0},
    {id: 2, nombre: "Santander", descuento: 25},
    {id: 3, nombre: "Itau", descuento: 30},
    {id: 4, nombre: "OCA", descuento: 15},

]

let salida="";
const productoss = document.getElementById('productos');


function compradirecta(id){
    
    addcarro(id);
    window.location.href = "/JS/vw/carrito.html";
 
  

}

function actualizarNumero() {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let total=0;
  for (var i = 0; i < carrito.length; i++) {
    var cantidad = parseInt(document.getElementById(carrito[i].id).value);
    var precio = carrito[i].precio;
    var subtotal = cantidad * precio;
    document.getElementById("subtotal-" + carrito[i].id).innerHTML = subtotal;
    total +=subtotal
  }
  document.getElementById("total").innerHTML = total;
  
}


function traerproductos(){
    let carga =document.getElementById("productos")

    productos.forEach((item) => {
        salida+='<div class="col-md-4 masvendido-producto">'+
     '<div class="card" ><div>'+
           '<a href="producto.html">'+
             '<img src="img/'+item.imagen+'.webp" class="d-block w-100" alt="'+item.nombre+'">'+
           '</a> </div>'+
         '<div class="card-body">'+
         '<h5 '+item.nombre+'</h4><span class="badge rounded-pill" id="cantidadcarrito"> $ '+item.precio+'</span></h5>'+
         "<h6 class='card-text'>"+item.descripcion+'</h6>'+
         "<a href='#' class='btn btn-primary' onclick='compradirecta(" + item.id + ")'>Comprar</a>"+
         "<a href='#' class='btn btn-secondary' onclick='addcarro(" + item.id + ")'>Añadir al carro</a>"+
         '</div></div></div>'
      });

     carga.innerHTML = salida;


};

function cargarcarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let checkout = document.getElementById("checkoutcard");

    if(!carrito){
        salida="<h3>No hay productos aun en el carrito</h3>";
        checkout.style.display = "none";
    }else{
        checkout.style.display = "block";
     salida = '<table class="table table-striped table-hover"><thead><tr><th scope="col">#</th><th scope="col">Producto</th><th scope="col">Precio</th><th scope="col">cantidad</th><th scope="col">Subtotal</th></tr></thead><tbody>';

    for (let i = 0; i < carrito.length; i++) {
        salida += "<tr><td scope='row'>Producto " + (i + 1) + ':</td>';
        salida += "<td>" + carrito[i].nombre + "</td>";
        salida += "<td>" + carrito[i].precio + "</td>";
        salida += "<td> <input type='number' min='1' max='10' value='1' id='" + carrito[i].id + "' onchange='actualizarNumero()'></input></td>";
        salida += "<td id='subtotal-" + carrito[i].id + "'></td>";

        salida += "<td> </td></tr>";
    } 
    salida += "<tr class='total-carrito'><th scope='row' colspan='4'>Total</th><td  id='total'></td></tr>";

    salida += "</tbody></table>";}

    document.getElementById("salida").innerHTML = salida;
    actualizarNumero();
}




// valido que no se agregue dos veces
function listaagregados(id){
    var carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
    
    for (var i = 0; i < carrito.length; i++) {
      if (carrito[i].id == id) {
        return true; 
      }
    }
  
    return false; 

}

function addcarro(id){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto= buscar(productos,id);

        if (producto){
            if (validarstock(producto.id, 1)){
                if (listaagregados(producto.id)){
                    console.log("EL PRODUCTO YA ESTA EN EL CARRO")
                } else   carrito.push(producto);
                document.getElementById("cantidadcarrito").innerHTML =carrito.length;
                
            }else console.log("NO Hay Stock")
            
        }else console.log("el producto no existe");
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
}
function validarstock(producto,cantidad) {
    let salida= buscar(productos,producto);
        if(salida.stock>=cantidad){
          return true;
        }
    return false;
}

function buscar(item,id){
   
    if (id) {
       
        let buscador=(item.find(item => item.id == id))

        if(buscador){return buscador; }
    }
    else{
        let salida = "";
            for (let i = 0; i < item.length; i++) {
                for(let clave in item[i]) {
                    salida += `${clave}: ${item[i][clave]}\n`;
  }
  salida += "\n";
}
return(salida);
    }
}

function cargarrelacionados(){
    let carga =document.getElementById("relacionados")
    let relacionado="";
  
        for(x=0; x<3; x++){
        
        relacionado+='<div class="col-md-4 masvendido-producto">'+
     '<div class="card" ><div>'+
           '<a href="producto.html">'+
             '<img src="../img/'+productos[x].imagen+'.webp" class="d-block w-100" alt="'+productos[x].nombre+'">'+
           '</a> </div>'+
         '<div class="card-body">'+
         '<h5 '+productos[x].nombre+'</h4><span class="badge rounded-pill" id="cantidadcarrito"> $ '+productos[x].precio+'</span></h5>'+
         "<h6 class='card-text'>"+productos[x].descripcion+'</h6>'+
        
         "<a href='#' class='btn btn-secondary' onclick='compradirecta(" + productos[x].id + ")'>Añadir al carro</a>"+
         '</div></div></div>'
      };


     carga.innerHTML = relacionado;

}


function calcularcarrito(total,descuento){
    return (total*((100-descuento)/100));
  }
  function checkout(){
    let tarjetas = document.getElementById("tarjetas")
    let selectPagos = document.createElement("select");
    selectPagos.id = "select-pagos";

    pagos.forEach(pago => {
        let option = document.createElement("option");
        option.value = pago.id;
        option.text = pago.nombre;
        selectPagos.appendChild(option);
    });

    selectPagos.addEventListener("change", function() {
        let descuento = document.getElementById("descuento");
        let subtotal = parseInt(document.getElementById("total").textContent);

        let selectedOption = this.options[this.selectedIndex];
        let selectedPago = pagos.find(pago => pago.id == selectedOption.value);

        let total=(calcularcarrito(subtotal,selectedPago.descuento));
        descuento.innerHTML = "tu descuento es de: "+ selectedPago.descuento+"%<br>ahorrandote $"+(subtotal-total)+"<br>TOTAL: $"+total;
    });

    tarjetas.appendChild(selectPagos);
    let descuento = document.createElement("p");
    descuento.id = "descuento";
    tarjetas.appendChild(descuento);

    let btnTerminarCompra = document.createElement("button");
btnTerminarCompra.innerText = "Terminar compra";
btnTerminarCompra.classList.add("btn-primary"); 
btnTerminarCompra.onclick = function() {
    terminarcompra();
};
tarjetas.appendChild(btnTerminarCompra);;
}

function terminarcompra() {
    localStorage.clear();
    alert("Tu compra ha sido finalizada");
    window.location.href = "../index.html";

}

  



function bienvenido(){
if (document.getElementById("productos")) {
    traerproductos()
} else if (document.getElementById("salida")) {
   cargarcarrito();
   cargarrelacionados();
checkout();}
}


bienvenido();