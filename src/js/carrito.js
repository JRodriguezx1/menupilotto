document.addEventListener('DOMContentLoaded', function(){ iniciarcarrito(); });

function iniciarcarrito(){
    abrir_cerrar_carrito();
    btn_continuar();
    procesar_pedido();
}


let carritoglobal = []; //cada vez q se da click en boton añadir se agrega el producto con sus propiedades
let posicion = 0;

function abrir_cerrar_carrito(){
    const img_carrito = document.querySelector('.img-carrito');  //btn carrito para abrir el carrito
    const cerrar_carrito = document.querySelector('#cerrar-carrito');  //btn X para cerrar el carrito
    const carrito_inferior = document.querySelector('.carrito-inferior');
    const carrito_compras = document.querySelector('#carrito-compras');  //seleccion el div q contiene la pantalla de todo el carrito

    img_carrito.addEventListener('click', ()=> carrito_compras.classList.add('mostrarcarrito'));
    cerrar_carrito.addEventListener('click', ()=>carrito_compras.classList.remove('mostrarcarrito'));
    document.querySelector('#abrir-carrito').addEventListener('click', ()=> carrito_compras.classList.add('mostrarcarrito'));  //abre carrito desde el menu lateral deslizante
    carrito_inferior.addEventListener('click', ()=> {
        document.querySelector('html').style.scrollBehavior = "auto";

        window.scroll({
            top: 0,
            //left: 0,
            //behavior: 'auto'
          });
        carrito_compras.classList.add('mostrarcarrito');
        document.querySelector('html').style.scrollBehavior = "smooth";
    });
}


export function agregarproducto(e){ //funcion que previene de api.js onclick asignado al div class="producto" de cada producto

    if(e.target.classList.contains('añadir')){ //si se dio click en el btn añadir
        let producto_div = e.target.parentElement.parentElement.parentElement.parentElement;
        let ingreds_simples = e.target.parentElement.parentElement.querySelectorAll('.agregar input[type="radio"]:checked');  // retorna el o los elemento radiobutton q este marcado, si no hay marcado retorna null
        let ingreds_adics = e.target.parentElement.parentElement.querySelectorAll('.agregar .adicionales input[type="checkbox"]:checked');
        
        let grupos, ingreds_multiples;
        let max = 0;

        grupos = e.target.parentElement.parentElement.querySelectorAll('.grupo'); // selecciona todos los grupos que contiene el producto (solo util para ingredientes multiples)
        grupos.forEach(grupo=>{
            let ingreds_multiples = grupo.querySelectorAll('input[type="checkbox"]:checked').length;
            
            if(grupo.dataset.max>0){
                if(ingreds_multiples>grupo.dataset.max){  
                    max = 1;
                    Swal.fire({
                        customClass: {
                            confirmButton: 'sweetbtn',
                            cancelButton: 'sweetbtn'
                          },
                        position: 'center',
                        icon: 'error',
                        title: `No es posible pedir mas de ${grupo.dataset.max} adicionales en la Sub categoria: ${grupo.firstElementChild.textContent}`,
                        showConfirmButton: true,
                        confirmButtonText: 'Volver', 
                        confirmButtonColor: '#eb203f' 
                    })
                }
            }

        });

        if(max) //si hay mas adicionales marcados finaliza
            return;
        ingreds_multiples = e.target.parentElement.parentElement.querySelectorAll('.agregar .grupo input[type="checkbox"]:checked');  //retorna los elementos tipo checkbox solo los que esten tiqueados


        const infoproduct = {  //objeto con los datos de cada producto añadido al carrito
            id: producto_div.querySelector('.cantidad').dataset.producto,
            nombre: producto_div.querySelector('.producto-texto h4').textContent,
            cantidad: parseInt(producto_div.querySelector('.num').textContent),
            valor: producto_div.querySelector('.btn-mas h3').textContent.replace('$ ',''),
            array_variaciones: [],
            totalproducto: function(){
                let r = this.array_variaciones.reduce((total, variaciones) => total + parseInt(variaciones.valor_t), 0);
                return ((parseInt(this.valor)+r)*(this.cantidad));
            },
            posicion: posicion
        }

        posicion++; //posicion se encarga de enumerar el orden en que llegan al carrito los productos seleccionados
        //infoproduct.valor = infoproduct.valor.replace('.', ''); //como valor viene con unidad de mil se quiel el punto para operar


        if(ingreds_simples){//si fue marcado algun(os) ingrediente(s) de seleccion simple
            ingreds_simples.forEach(ingred_simple=>{
                var count = ingred_simple.parentElement.parentElement.querySelector('.cantidad-ingred .num-ingred');
                var price = ingred_simple.parentElement.parentElement.querySelector('.cantidad-ingred label');
                const variaciones ={
                    id: ingred_simple.value,
                    nombre: ingred_simple.previousElementSibling.textContent,
                    catidad: count ? count.textContent : '1',
                    valor_t: price ? price.textContent.replace('+ $', '') : '0'
                }
                infoproduct.array_variaciones = [...infoproduct.array_variaciones, variaciones];
                ingred_simple.checked = false;
            });
        }
        if(ingreds_multiples){ //si fue marcado algun(os) ingrediente(s) de seleccion multiple
            ingreds_multiples.forEach(ingred_multiple=>{ //ingred_multiple es el elemento checkbox
                var count = ingred_multiple.parentElement.parentElement.querySelector('.valor-adicional .cantidad-ingred .num-ingred');
                var price = ingred_multiple.parentElement.parentElement.querySelector('.cantidad-ingred label'); //valor totoal de la variacion
                let nombre;
                if(!count){ //si count no existe, pregunta si la variacion mult, tiene costo adicional 
                    if(ingred_multiple.parentElement.classList.contains('select-adicional')){
                        nombre = ingred_multiple.parentElement.previousElementSibling.textContent;
                        count = '1';
                        price = ingred_multiple.previousElementSibling.textContent.replace('+ $', '');
                    }
                    if(ingred_multiple.parentElement.classList.contains('cantidad-ingred')){// si tiene cantidad (sumar=1) pero sin costo
                        nombre = ingred_multiple.parentElement.parentElement.firstElementChild.textContent;
                        count = ingred_multiple.previousElementSibling.previousElementSibling.textContent;
                        price = '0';
                    }
                    if((!ingred_multiple.parentElement.classList.contains('select-adicional'))&&(!ingred_multiple.parentElement.classList.contains('cantidad-ingred'))){ //aqui es si la varicion mult, es sin contador y sin precio
                        nombre = ingred_multiple.previousElementSibling.textContent;
                        count = '1';
                        price = '0';
                    }
                }else{ //si existe contador y costo adicional
                    nombre = ingred_multiple.previousElementSibling.textContent;
                    count = count.textContent;
                    price = price.textContent.replace('+ $','');
                }
 
                const variaciones ={
                    id: ingred_multiple.value,
                    nombre: nombre,
                    catidad: count,
                    valor_t: price
                }
                infoproduct.array_variaciones = [...infoproduct.array_variaciones, variaciones];
                ingred_multiple.checked = false;
            });
        }
        //////////llenar el arreglo para ingredientes adicionales////////////
        if(ingreds_adics){
            ingreds_adics.forEach(ingred_adic=>{
                const variaciones ={
                    id: ingred_adic.value,
                    nombre: ingred_adic.parentElement.parentElement.firstElementChild.textContent,
                    catidad: 1,
                    valor_t: ingred_adic.dataset.valor
                }
                infoproduct.array_variaciones = [...infoproduct.array_variaciones, variaciones];
                ingred_adic.checked = false;
            });
        }

        producto_div.lastElementChild.classList.remove('abrir_add');

       
        //if(infoproduct.totalproducto() > 0){  //productos con valor o cantidad cero '0' no se envia al carrito
            carritoglobal = [...carritoglobal, infoproduct];
            Swal.fire({
                //backdrop: false,
                position: 'center',
                icon: 'success',
                title: `${infoproduct.nombre} agregado`,
                showConfirmButton: false,
                timer: 1500
              })
            mostrar_productos_carrito();
            //desues de agregar producto se reinicia contador
            producto_div.querySelector('.num').textContent = 1;  
        //}
        //console.log(carritoglobal); //////////////////////////xxxxxxxx/////////// 

    }
}


function mostrar_productos_carrito(){
    const llenarcarrito = document.querySelector('#lista-carrito tbody');
    let total = 0;
    while(llenarcarrito.firstChild){                               // elimina contenido del div
        llenarcarrito.removeChild(llenarcarrito.firstChild);}

    carritoglobal.forEach(producto=>{
        total+=producto.totalproducto();
        const row = document.createElement('tr');  //tr = registro o fila que va en el tbody de la table
        row.classList.add('contenido-producto');
        row.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.totalproducto()}</td>
        <td> <a href="#" class="borrar-producto" data-posicion=${producto.posicion}> X </a> </td>
        `;
        llenarcarrito.appendChild(row);
        llenarcarrito.addEventListener('click', eliminarproducto); //click al tbody
    });
    document.querySelector('.valor-total').innerHTML = `Valor Total a Pagar: <span>$${total}</span>`; 
}


function eliminarproducto(evento){
    if(evento.target.classList.contains('borrar-producto')){    //delegacion para detectar la x de borrar del carrito     
        let posicion1 = evento.target.dataset.posicion;
        let tr = evento.target.parentElement.parentElement;
        //carritoglobal = carritoglobal.filter(producto => producto.id != id);
        carritoglobal.forEach(producto =>{
            if(producto.posicion == posicion1){
                producto.cantidad--;
                producto.totalproducto();
                if(producto.cantidad === 0){
                    carritoglobal = carritoglobal.filter(producto => producto.posicion != posicion1);
                    tr.remove();
                }else{
                    tr.children[1].textContent = producto.cantidad;
                    tr.children[2].textContent = producto.totalproducto();
                }
            }
        });
        let r = carritoglobal.reduce((total, producto) => total + producto.totalproducto(), 0);
        document.querySelector('.valor-total').innerHTML = `Valor Total a Pagar: <span>$${r}</span>`;
    }
}


function btn_continuar(){
    document.querySelector('#continuar').addEventListener('click', ()=>{
        if(carritoglobal.length){
            document.querySelector('.presencial-domicilio').classList.add('mostrar-presencial-domicilio');
            document.querySelector('body').style = "overflow: hidden";  //esconde el scroll
        }
    });
}


function procesar_pedido(){
    document.querySelector('#form-presencial').addEventListener('submit', formpresencial);
    document.querySelector('#form-domicilio').addEventListener('submit', formdomicilio);
    document.querySelector('.presencial-domicilio').addEventListener('click', (e)=>{
        if(e.target.classList.contains('enlace-atras')){
            document.querySelector('.presencial-domicilio').classList.remove('mostrar-presencial-domicilio');
            document.querySelector('body').style = "overflow: auto";
        }    
    });
}


function formpresencial(e){
    e.preventDefault();
    const nombre = e.target.querySelector('#nombre').value.trim();
    const movil = e.target.querySelector('#movil').value;
    const num_mesa = e.target.querySelector('#num_mesa').value;
    const observ = document.querySelector('#msj-presencial');

    //validacion de formulario
    if(num_mesa === null || num_mesa == ''){
        console.log('numero de mesa no valida');
        document.querySelector('#alerta').textContent = 'numero de mesa no valida.';
    }else{
        document.querySelector('#alerta').textContent = '';
        Swal.fire({
            customClass: {
                confirmButton: 'sweetbtn',
                cancelButton: 'sweetbtn'
              },
            title: 'Se enviara el pedido. Desea confirmar?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',
            confirmButtonColor: '#eb203f',
        }).then((result) => {
            if (result.isConfirmed) {
              //si dio q si es pq solicita el pedido presencial
              console.log('pedido enviado presencial');

              console.log(carritoglobal);
              console.log(nombre +' ' + movil + ' ' + num_mesa + ' ' + observ);

              window.location.reload();
            } 
          })
    }
}
function formdomicilio(e){
    e.preventDefault();
    const nombre = e.target.querySelector('#nombre').value.trim();
    const movil = e.target.querySelector('#movil').value;
    const ciudad = e.target.querySelector('#ciudad').value.trim();
    const direccion = e.target.querySelector('#direccion').value.trim();
    const observ = document.querySelector('#msj-domicilio');
    let warning = "";

    //validacion de formulario
    if(nombre === null || nombre == '' || (nombre.length < 3)){ 
        warning +=`Nombre no valido. <br>`;
    }
    if(movil === null || movil == '' || (movil.length < 10) || (movil.length > 10)){
        warning += `Telefono movil no valido. <br>`;
    }
    if(ciudad === null || ciudad == '' || (ciudad.length < 3)){
        warning += `Texto de ciudad no valido. <br>`
    }
    if(direccion === null || direccion == '' || (direccion.length < 7)){
        warning += `Direccion muy corta.`;
    }

    if(warning !== ''){ //si algun campo no cumple
        document.querySelector('#alerta').innerHTML = warning;
    }else{
        document.querySelector('#alerta').textContent = "";
        Swal.fire({
            customClass: {
                confirmButton: 'sweetbtn',
                cancelButton: 'sweetbtn'
              },
            title: 'Se enviara orden. Desea confirmar su pedido?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'NO',
            confirmButtonText: 'SI',
            confirmButtonColor: '#eb203f',
        }).then((result) => {
            if (result.isConfirmed) {
              //si dio q si es pq solicita el pedido a domicilio
              console.log('pedido enviado a domicilio');

              console.log(nombre +' ' + movil + ' ' + ciudad + ' ' + direccion);
              console.log(carritoglobal); //carrito global contiene el pedido

              window.location.reload();
            } 
          })
    }
}