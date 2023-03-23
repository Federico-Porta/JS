
let productos = [
    { id: 1, nombre: "Air Jordan I", precio: 7000, stock:20, descripcion: "descripcion", Cantidadcompradas:203, imagen: "Joedan 1 x Off White" },
    { id: 2, nombre: "Jordan IV Fire Red", precio: 7990, stock:1, descripcion: "Fuego Rojo, referencia a la pelicula el infierno en el cielo, en la que Tom Crouse vuela con un cable de acero por encima de las llamas y el magma ardiente para salvar a Lillian J. Rose. los colores hacen referencia a la magma, el cable y la cara de Lillian al tener que saltar de semejante altura para salvarse.", Cantidadcompradas:500, imagen: "jordan 4 Fire Red"},
    { id: 3, nombre: "Air Jordan 1 travis scott", precio: 6500, stock: 12, descripcion: "Un pedido especial para el famoso cantante de Rap Travis Scott se volvio viral en las redes y hoy es una zapatilla que rompe taquilla", Cantidadcompradas:503, imagen: "jordan 1 travis scott" },
    { id: 4, nombre: "Air Jordan 1 x Off White NSA", precio: 8990, stock:3, descripcion: "Estas Jordans fueron diseñadas por el famoso diseñador Robert L. Doski oriundo de las islas perdidas de alkatraz en honor a los astronautas que llegaron a marte en julio de 2022", Cantidadcompradas:501, imagen: "Joedan 1 x Off White" },
  ];

let pagos = [
    {id: 1, nombre: "Santander", descuento: 25},
    {id: 2, nombre: "Itau", descuento: 30},
    {id: 3, nombre: "OCA", descuento: 15},
    {id: 4, nombre: "Efectivo", descuento: 0},
]
let salida="";



calcularcarrito();
top3();
cargarcarrito();



function calcularcarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("cantidadcarrito").innerHTML =carrito.length
}


function compradirecta(id){
    
    addcarro(id);
    iracarrito();   

}


function iracarrito(){
window.location.href = "vw/carrito.html";
window.addEventListener("load", cargarcarrito);

}

function addcarro(id){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto= buscar(productos,id)

    if (producto) { let stockValidado = validarstock(producto.id, 1);
    
        stockValidado ? ( carrito.push(producto), document.getElementById("cantidadcarrito").innerHTML =carrito.length)  : console.log("NO Hay Stock");
    }else console.log("el producto no existe")

    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
}

function validarstock(producto,cantidad) {
    let salida= buscar(productos,producto);
        if(salida.stock>=cantidad){
          return true;
        }
    return false;
}


function top3(){

    productos.sort(function(a, b) {
        return b.Cantidadcompradas - a.Cantidadcompradas;
      });

      var primerosTres = productos.slice(0, 3);
      
      primerosTres.forEach((item) => {
        salida+=' <div class="row card col-md-12">'+
        '<div class="row g-0">'+
         ' <div class="col-md-4">'+
            '<a href="vw/producto.html">'+
              '<img src="img/'+item.imagen+'.webp" class="d-block w-100" alt="'+item.nombre+'">'+
           ' </a>'+ 
         '</div>'+
          '<div class="col-md-8">'+
            '<div class="card-body">'+
              '<h4 class="card-title">'+item.nombre+'</h4><span class="badge bg-primary rounded-pill" id="cantidadcarrito"> Stock: '+item.stock+'</span>'+
                '<h6 class="card-text descripicon">'+item.descripcion+'</h6>'+
                "<a href='#' class='btn btn-primary' onclick='compradirecta(" + item.id + ")'>Comprar</a>"+
               "<a href='#' class='btn btn-secondary' onclick='addcarro(" + item.id + ")'>Añadir al carro</a>"+
            '</div></div></div></div>'
        });

       document.getElementById("salida").innerHTML = salida;
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


function cargarcarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito'));

    let tabla = '<table class="table table-striped table-hover"><thead><tr><th scope="col">#</th><th scope="col">Producto</th><th scope="col">Cantidad</th><th scope="col">Precio</th><th scope="col">Subtotal</th></tr></thead><tbody>';

    for (let i = 0; i < carrito.length; i++) {
        tabla += "<tr><th scope='row'>Producto " + (i + 1) + ':</th>';
        tabla += "<td>" + carrito[i].nombre + "</td>";
        tabla += "<td>" + carrito[i].cantidad + "</td>";
        tabla += "<td>" + carrito[i].precio + "</td>";
        tabla += "<td>" + (carrito[i].cantidad * carrito[i].precio) + "</td></tr>";
    }

    let total = calcularsubtotal();
    tabla += "<tr class='total-carrito'><th scope='row' colspan='4'>Total</th><td>" + total + "</td></tr>";

    tabla += "</tbody></table>";

    document.getElementById("listacarrito").innerHTML = tabla;
}

                  
function calcularsubtotal(){
    let carrito = JSON.parse(localStorage.getItem('carrito'));
  
    let total=0;
    for(let x=0; x<carrito.length; x++){
        total+=Number(carrito[x].precio);}
       
        return total;
    }
   