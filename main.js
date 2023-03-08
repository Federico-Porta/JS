let productos = [
    { id: 1, nombre: "Air Jordan I", precio: 7000, stock:20 },
    { id: 2, nombre: "Air Jordan II", precio: 7990, stock:1},
    { id: 3, nombre: "Air Jordan III", precio: 6500, stock: 12 },
    { id: 4, nombre: "Air Jordan VI", precio: 8990, stock:3 },
  ];

let pagos = [
    {id: 1, nombre: "Santander", descuento: 25},
    {id: 2, nombre: "Itau", descuento: 30},
    {id: 3, nombre: "OCA", descuento: 15},
    {id: 4, nombre: "Efectivo", descuento: 0},
]

const carrito = [];



let subtotal = 0;
let compra = true;
let objeto;

while (compra){
    Bienvenido();
}

function Bienvenido(compra){

    objeto = buscar(pagos)
    let mensaje = "Bienvenido, te recordamos los descuentos que tienes con las siguientes tarjetas: \n \n" + objeto;
    alert(mensaje);

    Compra();
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







function Compra(){

    
        let entrada = prompt("Dinos que producto te gustaria adquirir\n\n ingresa su ID \n\n" + buscar(productos));
        let cantidad = prompt("Cuantas desea llevar?");

        objeto = buscar(productos,entrada)
    
            if(validarstock(entrada, cantidad)){
                alert("el Producto "+ objeto.nombre +" se agrego exitosamente a su carro");
                carrito.push(objeto.precio);
                console.log(carrito);
                continuarcompra();
            }
            else{
                alert("El producto " + objeto.nombre + " no cuenta con suficiente stock " + + objeto.stock)
                Compra();
            }

        return (compra=false);
}



function validarstock(entrada,cantidad) {
    let salida= buscar(productos,entrada);
        if(salida.stock>=cantidad){
          return true;
        }
    return false;
}

function continuarcompra(){

    let opcional= prompt("Deseas llevar otro producto? \n \ 1= si \n 2= no)")
    if (opcional==1) Compra();
    else calcularsubtotal();
}


function calcularsubtotal(){

    let metodopago= prompt("Elije el metodo de pago que deseas implementar " +buscar(pagos))
    
    let subtotal= buscar(pagos,metodopago);
    let total=0;
    for(let x=0; x<carrito.length; x++){
        total+=Number(carrito[x]);}

        total= total*((100-subtotal.descuento)/100);
        alert("Su total de Compra es de "+ total+ " Gracias por su compra.");
        compra=false;
        return;
    }
 
    

    