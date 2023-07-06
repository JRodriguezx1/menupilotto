//export let height_var_adic = [];

export function menu_lateral_desplegable(){  //funcion del menu laterial desplegable
    const menu_lateral = document.querySelector('#menu-lateral'); 
    const abrir_menuL = document.querySelector('#abrir-menuL');
    
    abrir_menuL.addEventListener('click', ()=>{
       menu_lateral.classList.toggle('mostrar_menuL');
    });
    document.querySelector('body').addEventListener('click', (e)=>{ //filtro para que se cierre el menu lateral desplegable dando click por fuera
        if(!e.target.parentElement.classList.contains('abrir-menu')&&!e.target.classList.contains('menu-lateral')&&e.target.tagName !== 'LI')
            menu_lateral.classList.remove('mostrar_menuL');
    });
}


export function evento_btn_ver_todo(){  //funcion al dar click en el boton ver todo
     document.querySelector('.ver-todo').onclick = mostrar_menu_productos;
     document.querySelector('.pagona1-contenido').lastElementChild.onclick = mostrar_menu_productos;
}
function mostrar_menu_productos(){
    const boton_arriba = document.querySelector('.boton-arriba'); //selecciona el btn arriba
    const header = document.querySelector('header');
    const ver_todas_categorias = document.querySelector('#pagina1');
    const categorias = document.querySelector('#pagina2');  //corresponde a las categorias
    header.classList.toggle('reducir-altura');
    if(header.classList.contains('reducir-altura')){
        document.querySelector('.ver-todo').textContent = "Atras";
        ver_todas_categorias.classList.add('ocultar-pagina1');
        document.querySelector('.categorias-lateral').classList.add('mostar-categorias-lateral');
        categorias.classList.add('mostar-pagina2');
        document.querySelectorAll('.categoria').forEach(categoria=>categoria.classList.remove('ocultar-categoria'));
        document.querySelector('.btn-flotante').style = "display: block";
        document.querySelector('.carrito-inferior').style = "display: block";  //muestra el carrito inferior
        boton_arriba.style.display = "flex";  //muestra el btn arriba

        //Cambio Joseeeeeee
        document.querySelector('.home').style = "display: none";
        document.querySelector('.svg-superior').style = "display: none";
        document.querySelector('.menu-movil').style = "display: none";

    }else{
        document.querySelector('.ver-todo').textContent = 'MENU';
        ver_todas_categorias.classList.remove('ocultar-pagina1');
        categorias.classList.remove('mostar-pagina2');
        document.querySelector('.categorias-lateral').classList.remove('mostar-categorias-lateral');
        document.querySelector('.carrito-inferior').style = "display: none";  //oculta el carrito inferior
        boton_arriba.style.display = "none";
        document.querySelector('.btn-flotante').style = "none";

        //Cambio Joseeeeeee
        document.querySelector('.home').style = "display: flex";
        document.querySelector('.menu-movil').style = "display: flex";
        document.querySelector('.svg-superior').style = "display: block";
    }
}


export function mostrar_presencial_domicilio(){  //muestra el bloque si es presencial o domicilio
    const formulario_presencial = document.querySelector('.formulario-presencial');
    const formulario_domicilio = document.querySelector('.formulario-domicilio');
    document.querySelector('#Presencial').addEventListener('click', ()=>{
        formulario_domicilio.classList.remove('formulario-domicilio-js');
        formulario_presencial.classList.add('formulario-presencial-js');
    });
    document.querySelector('#Domicilio').addEventListener('click', ()=>{
        formulario_presencial.classList.remove('formulario-presencial-js');
        formulario_domicilio.classList.add('formulario-domicilio-js');
    });
}


export function menu_barra_lateral(){
    const categorias_l = document.querySelectorAll('.categoria-l a');  //selecciono todas las categorias elemtos <a><a><a>....
    categorias_l[0].classList.add('resaltar');  //inicialmente me muestra la sublinea roja de la primera categoria
    categorias_l.forEach((categoria_l)=>{
        categoria_l.addEventListener('click', function(e){ // a cada categoria elemento <a> se le asigna el evento 
            categorias_l.forEach(categoria_l =>{  //me busca la categoria anterior con la clase resaltar para eliminarla
                if(categoria_l.classList.contains('resaltar'))
                    categoria_l.classList.remove('resaltar')
            });
            e.target.classList.add('resaltar'); //a la categoria seleccionada le añade la clase resaltar
        });
    });
}


export function boton_mas(){  //funcion al dar click en cada boton + de cada producto me desplega las opciones de varraciones y añadir
    const productos = document.querySelectorAll('.producto');
    let control = 1;
    let cerrar_add_anterior = [];
    productos.forEach((producto)=>{
        const btn_mas = producto.firstElementChild;  // se selecciona el <div class="producto-contenido"> '+' del DOM
        //const btn_mas_id = producto.lastElementChild.firstElementChild.lastElementChild.firstElementChild;
        btn_mas.addEventListener('click', function(){  

            if(control)  //bloque q cierra previamente los productos q tiene las opciones abiertas al abrir otro producto
            cerrar_add_anterior[0]=btn_mas.lastElementChild.firstElementChild.textContent;
            cerrar_add_anterior[1]=btn_mas.lastElementChild.firstElementChild.textContent;
            if(cerrar_add_anterior[0] == cerrar_add_anterior[1]){
                producto.lastElementChild.classList.toggle('abrir_add');  // se seleccion <div id="add" class="add"> y agrega/elimnina clase 'abrir_add
                cerrar_add_anterior[0]=btn_mas.lastElementChild.firstElementChild.textContent;
                control = 0;
            }
            else{
                productos.forEach(producto=>{  //codigo que scanea que producto tiene las opciones abiertas y lo cierra
                    if(producto.lastElementChild.classList.contains('abrir_add'))
                        producto.lastElementChild.classList.remove('abrir_add');
                });
                producto.lastElementChild.classList.add('abrir_add');
                cerrar_add_anterior[0]=btn_mas.lastElementChild.firstElementChild.textContent;
            }
        });
    });
}


export function cantidad_productos(){  //funcion que cuenta la cantidad de productos -/+
    const decremento = document.querySelectorAll('.decremento');
    const incremento = document.querySelectorAll('.incremento');
    let cantidad;
    let cantidades = [];

    for(let i=0; i<decremento.length; i++){
        cantidades[i] = 1;
        decremento[i].addEventListener('click', (e)=>{
            cantidad = e.target.parentElement.dataset.producto; //seleccion elemento <div data-cantidad="x" class="cantidad"> el cual contiene el dataset para identificar el producto y asi llevar un contador de cada producto
            cantidades[cantidad] = e.target.nextElementSibling.textContent; //como el contador se reinicia al dar click en añadir por eso se actualiza aqui
            cantidades[cantidad]--;
            if(cantidades[cantidad] < 1)
            cantidades[cantidad] = 1;
            e.target.nextElementSibling.textContent = cantidades[cantidad]; //seleccion el span d class num
        });
        incremento[i].addEventListener('click', function(e){
            cantidad = e.target.parentElement.dataset.producto;
            cantidades[cantidad] = e.target.previousElementSibling.textContent; //como el contador se reinicia por eso se actualiza aqui
            cantidades[cantidad]++;
            e.target.previousElementSibling.textContent = cantidades[cantidad];   
        });
    }
}


export function evento_llamarmesero(){
    document.querySelector('#menu-lateral ul').children[1].addEventListener('click', llamarmesero);
    document.querySelector('.pagona1-contenido').children[1].addEventListener('click', llamarmesero);
}
function llamarmesero(){
    Swal.fire({
        customClass: {
            confirmButton: 'sweetbtn',
            cancelButton: 'sweetbtn'
          },
        title: 'CONFIRMAR LLAMAR MESERO',
        showCancelButton: true,
        cancelButtonText: 'NO',
        confirmButtonText: 'SI',
        confirmButtonColor: '#eb203f',
    }).then((result) => {
        if (result.isConfirmed) {
          //si dio q si es pq llama al mesero
        } 
      })
}


export function evento_pedircuenta(){
    document.querySelector('#menu-lateral ul').children[0].addEventListener('click', pedircuenta);
    document.querySelector('.pagona1-contenido').children[0].addEventListener('click', pedircuenta);
}
function pedircuenta() {
    Swal.fire({
        customClass: {
            confirmButton: 'sweetbtn',
            cancelButton: 'sweetbtn'
          },
        title: 'CONFIRMAR PEDIR CUENTA',
        showCancelButton: true,
        cancelButtonText: 'NO',
        confirmButtonText: 'SI',
        confirmButtonColor: '#eb203f',
    }).then((result) => {
        if (result.isConfirmed) {
          //si dio q si es pq solicita cuenta
        } 
      })
}

 // Botón WhatsApp
 export function mostrar_btnflotante_ws(){
    window.addEventListener('scroll', ()=>{
        const scrollpixely = window.scrollY;
        const btn_flotante_ws = document.querySelector('.btn-flotante');
        if(scrollpixely>200){
            btn_flotante_ws.style.visibility = "visible";
        }
    }); 
}


//contador numerico cuando el ingredinete lleva costo adicional y sumar = 1 el lleva contador
export function cantidad_ingredientes(){  
    const incremento_ingred = document.querySelectorAll('.incremento-ingred');
    const decremento_ingred = document.querySelectorAll('.decremento-ingred');
    const num_ingred = document.querySelectorAll('.num-ingred');
    let cantidad;
    let cantidades = [];
    let costo_ingred = '';
    let array_costos = [];
    let costo = 0;

    for(let i=0; i<incremento_ingred.length; i++){
        cantidades[i] = 1;
        costo = parseInt(incremento_ingred[i].parentElement.dataset.ingred);
        array_costos[costo] = parseInt(decremento_ingred[i].previousElementSibling.textContent.replace('+ $', ''));

        incremento_ingred[i].addEventListener('click', (e)=>{
            cantidad = e.target.parentElement.dataset.ingred; //seleccion elemento <div data-ingred="x" class="cantidad-ingred"> el cual contiene el dataset para identificar el ingrediente y asi llevar un contador de cada variacion con costo adicional
            cantidades[cantidad] = e.target.previousElementSibling.textContent; //como el contador se reinicia por eso se actualiza aqui
            cantidades[cantidad]++;
            e.target.previousElementSibling.textContent = cantidades[cantidad]; //seleccion el span de class num-ingred
            costo_ingred = array_costos[cantidad]*cantidades[cantidad];
            e.target.parentElement.firstElementChild.textContent = "+ $"+costo_ingred; //label q muestra el valor total
        });
        decremento_ingred[i].addEventListener('click', function(e){
            cantidad = e.target.parentElement.dataset.ingred;
            cantidades[cantidad] = e.target.nextElementSibling.textContent; //como el contador se reinicia al dar click en añadir por eso se actualiza aqui
            cantidades[cantidad]--;
            if(cantidades[cantidad] < 1)
            cantidades[cantidad] = 1;
            e.target.nextElementSibling.textContent = cantidades[cantidad];
            costo_ingred = array_costos[cantidad]*cantidades[cantidad];
            e.target.parentElement.firstElementChild.textContent = "+ $"+costo_ingred; //label q muestra el valor total

        });
    }
}

//año actual
export function fechafooter(){
    document.querySelector('.desarrollo p span').textContent = new Date().getFullYear();
}