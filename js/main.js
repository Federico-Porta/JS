















const productos = [];
const tarjetas = [];


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

async function addcarro(id){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto= await buscar("producto",id);

        if (producto){
            if (validarstock(producto, 1)){
                if (listaagregados(producto.id)){
                    mensajealerta("warning","El producto "+producto.nombre+" ya se encuentra en el carro, si desea agregar otro del mismo producto dirijase al carro")
                } else  {
                  mensajealerta("success","GENIAL! hemos agregado unos "+producto.nombre+" a tu carro")
                 carrito.push(producto);
                document.getElementById("cantidadcarrito").innerHTML =carrito.length;}
                
            }else mensajealerta("error","No hay suficiente stock : "+producto.stock)
            
        }else mensajealerta("error","El producto no existe")
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
}

function validarstock(producto,cantidad) { return producto.stock >= cantidad ? true:false }


async function cargarrelacionados(){
    let carga =document.getElementById("relacionados")
    let data = [];

    const response = await fetch("../datos.json");
     data = await response.json();

   
    carga.innerHTML = "";

    for(let item =0; item<3; item++)
    {
        let salida = '<div class="col-md-4 masvendido-producto">' +
            '<div class="card" ><div>' +
            '<img src="../img/' + data.productos[item].imagen + '.webp" class="d-block w-100" alt="' + data.productos[item].nombre + '">' +
            '</a> </div>' +
            '<div class="card-body">' +
            '<h5>' + data.productos[item].nombre + '</h4><span class="badge rounded-pill" id="cantidadcarrito"> $ ' + data.productos[item].precio + '</span></h5>' +
            "<h6 class='card-text'>" + data.productos[item].descripcion + '</h6>' +
            "<a href='#' class='btn btn-primary' onclick='compradirecta(" + data.productos[item].id + ")'>Comprar</a>" +
            '</div></div></div>';
        carga.innerHTML += salida;
    };

}


 function calcularcarrito(total,descuento){
    return (total*((100-descuento)/100));
  }


 async function checkout(){

    let data = [];

    const response = await fetch("../datos.json");
     data = await response.json();

    let tarjetas = document.getElementById("tarjetas")
    let selectPagos = document.createElement("select");
    selectPagos.id = "select-pagos";   

    data.pagos.forEach(pago => {
        let option = document.createElement("option");
        option.value = pago.id;
        option.text = pago.nombre;
        selectPagos.appendChild(option);
    });

    selectPagos.addEventListener("change", async function() {

      let data = [];

      const response = await fetch("../datos.json");
       data = await response.json();
       
        let descuento = document.getElementById("descuento");
        let subtotal = parseInt(document.getElementById("total").textContent);

        let selectedOption = this.options[this.selectedIndex];
        let selectedPago = data.pagos.find(pago => pago.id == selectedOption.value);

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
btnTerminarCompra.onclick = async function() {
    
terminarcompra()

};
tarjetas.appendChild(btnTerminarCompra);;
}

async function terminarcompra() {
  let aprov = false;
  await Swal.fire({
    title: 'Confirmar compra',
    text: "Te llevas todo lo que buscabas? ¿Necesitas dar un último vistazo?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'SI, me lo llevo!',
    cancelButtonText: 'Quiero seguir comprando'
  }).then((result) => {
    if (result.isConfirmed) {
       Swal.fire({
        title: 'compra confirmada',
        text: "esperemos que disfrutes tus zapas como nosotros venderlas. Gracias por elegirnos",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Volver al inicio',
        
      }).then((result)=>{
          if (result.isConfirmed) {
    localStorage.clear();
    window.location.href = "../index.html";
           
          }
        })
  }});
}


  
function vercarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if(carrito)document.getElementById("cantidadcarrito").innerHTML =carrito.length;
}



async function traerproductos() {
    let carga = document.getElementById("productos");
    let data = [];

    const response = await fetch("../datos.json");
     data = await response.json();

   
    carga.innerHTML = "";

    for(let item =0; data.productos.length; item++)
    {
        let salida = '<div class="col-md-4 masvendido-producto">' +
            '<div class="card" ><div>' +
            '<img src="img/' + data.productos[item].imagen + '.webp" class="d-block w-100" alt="' + data.productos[item].nombre + '">' +
            '</a> </div>' +
            '<div class="card-body">' +
            '<h5>' + data.productos[item].nombre + '</h4><span class="badge rounded-pill" id="cantidadcarrito"> $ ' + data.productos[item].precio + '</span></h5>' +
            "<h6 class='card-text'>" + data.productos[item].descripcion + '</h6>' +
            "<a href='#' class='btn btn-primary' onclick='compradirecta(" + data.productos[item].id + ")'>Comprar</a>" +
            "<a href='#' class='btn btn-secondary' onclick='addcarro(" + data.productos[item].id + ")'>Añadir al carro</a>" +
            '</div></div></div>';
        carga.innerHTML += salida;
    };
};

    
function mensajealerta(icono,mensaje){
  Swal.fire({
    position: 'top-center',
    icon: ''+icono+'',
    title: ''+mensaje+'',
    showConfirmButton: false,
    timer: 2000
  })
}


function bienvenido(){

    if (document.getElementById("productos")) {
        traerproductos();
        vercarrito();
    } else if (document.getElementById("salida")) {
       cargarcarrito();
       vercarrito();
       cargarrelacionados();
        checkout();}
    }
    
    function agregadoAlCarrito(){
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })}
      
  


async function buscar(tipo, id) {

  let data = [];

  const response = await fetch("../datos.json");
   data = await response.json();
   
        let objeto;
        if (tipo == 'producto') {
          objeto = data.productos.find(producto => producto.id == id);
          
        } else if (tipo == 'tarjeta') {
          objeto = data.tarjetas.find(tarjeta => tarjeta.id == id);
        }
        
       return(objeto)
      ;
  }
  bienvenido();

