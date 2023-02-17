


let producto_1=550;
let producto_2=640;
let producto_3=380;

let subtotal = 0;
let compra ="si";


function Bienvenido(compra){
    alert("Bienvenido, te recordamos los descuentos que tienes con las siguientes tarjetas: \nSantander 25% OFF\n Itaú 15% OFF\n OCA 30% OFF");
    Compra();
}   


while (compra=="si"){
    Bienvenido();
}


function Compra(){

let entrada = prompt("Dinos que producto te gustaria adquirir\n Nike AirForce 1 / $550\n Nike Jordan I / $640\n Nike Jordan IV / $380\n");
let cantidad = prompt("Cuantas desea llevar?");


if(entrada <=0 || entrada >=4  ){
    alert(entrada+ " No esta dentro de las opciones");
    Compra();}

    else if (cantidad >=5){
    alert("La cantidad supera el stock")
    Compra();}

    else{ subtotal= subtotal+=calcularsubtotal(entrada,cantidad);}

let opcional= prompt("Deseas llevar otro producto? (si/no)")
let total;
        if(opcional=="si")Compra();
        else {
            let tarjeta = prompt("Cual seria el metodo de pago? \n 1-Santander 25% OFF\n 2-Itaú 15% OFF\n 3-OCA 30% OFF\n 4-Efectivo");

            total=calculartotal(subtotal,tarjeta)
            }



alert("su total es "+total)
return (compra="no");
}




function calcularsubtotal(entrada, cantidad){
let calculo;
    switch(entrada){
           case "1":
             console.log("eligio producto 1");
             calculo= producto_1*cantidad

            break;

            case "2":
                console.log("eligio producto 2");
             calculo= producto_2*cantidad
   
            break;

            case "3":
                console.log("eligio producto 2");
             calculo= producto_3*cantidad
       
            break;
       
         }
         return calculo;
}

function calculartotal(subtotal, tarjeta){
    let descuento;
    switch(tarjeta){
        case "1":
            console.log("Santander");
            descuento = subtotal*0.20
         break;

         case "2":
             console.log("eligio Itaú");
             descuento=subtotal*0.15;

         break;

         case "3":
             console.log("eligio OCA");
             descuento=subtotal*0.30;
    
         break;
         
         case "4":
             console.log("eligio Efectivo");  
             descuento=0;
         break;
      }
      return (subtotal-descuento);
}