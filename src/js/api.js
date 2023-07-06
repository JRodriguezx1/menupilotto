import { menu_barra_lateral, boton_mas, cantidad_productos, cantidad_ingredientes /*height_var_adic*/ } from "./funciones.js";
import { agregarproducto } from "./carrito.js";

document.addEventListener('DOMContentLoaded', function(){ iniciarapi(); });

function iniciarapi(){
    mostrarcategorias();
}

//let height_i=0;
let controlselectsimple1=1;
let radiog1, radiog2;
let organizargrupos = [];
var index = 0;
let url_img = '';



async function mostrarcategorias(){
    try {
        const url_categorias = "./categorias4.json";
        //const url_categorias = "https://menupilotto.netlify.app/categorias4.json";
        const resultado = await fetch(url_categorias); //espera a que encuentre y cargue el archivo
        const db = await resultado.json();  //cuando encuentra el archivo .json se ejecuta esta linea y lo convierte a json, espera a la conversion y continua con el programa
        
        const contenedor = document.querySelector('#pagina2 .contenedor');  // se seleccion el <div class="contenedor"> del <section id = pagina2
        
        db.forEach(categoria => {
          const {id, nombre, fk_cocina, orden} = categoria;
  
        if(nombre !== 'Gestion'){
        //DOM scripting del slider de las categorias
            const categoria_enlace = document.createElement('a'); //generar <a> de cada categoria
            categoria_enlace.textContent = nombre;
            categoria_enlace.setAttribute("href", `#${nombre}`);  //*+
  
            //generar div contenedor de los enlaces <a>
            const categoria_div = document.createElement('DIV');
            categoria_div.classList.add("categoria-l");
           
            //inyectar enlace <a> nombre al div creado categoria_div
            categoria_div.appendChild(categoria_enlace);  //aqui se le pasa el parrafo nombreservicio como hijo al div
           //fin scripting del slider

        //DOM scripting inicial donde se va mostrar los productos por categoria
            const h3_nombre_categoria = document.createElement('H3');  //h3 nombre de la categoria
            h3_nombre_categoria.classList.add('nombre-categoria');
            h3_nombre_categoria.textContent = nombre;  //nombre de cada ategoria
            const categoria_productos = document.createElement('DIV'); //creamos los div de las categorias en donde se van a mostrar los productos por categoria
            categoria_productos.classList.add('categoria');
            categoria_productos.setAttribute('id', nombre)  //*+
            categoria_productos.dataset.categoria = id; // se asigna dataset con el id de cada categoria
            categoria_productos.appendChild(h3_nombre_categoria);

            //inyectar en el HTML
            document.querySelector('.categorias-lateral').appendChild(categoria_div);  //inyectamos las categorias al slider
            contenedor.appendChild(categoria_productos); //inyectamos los div en donde se va a mostrar los productos por categoria   
        }
        }); 
        menu_barra_lateral();
        mostrarproductos();
    } catch (error) {
        console.log(error);
      }
}


async function mostrarproductos(){
    try {
        const url_productos = "./productos4.json";
        //const url_productos = "https://menupilotto.netlify.app/productos4.json";
        const r_producto = await fetch(url_productos); //espera a que encuentre y cargue el archivo
        const productos_vars_adics = await r_producto.json();

        const url_recetas = "./recetas4.json";
        //const url_recetas = "https://menupilotto.netlify.app/recetas4.json";
        const r_recetas = await fetch(url_recetas); //espera a que encuentre y cargue el archivo
        const recetas = await r_recetas.json();

        const url_adicionales = "./producto_adicional4.json";
        //const url_adicionales = "https://menupilotto.netlify.app/producto_adicional4.json";
        const r_adicionales = await fetch(url_adicionales); //espera a que encuentre y cargue el archivo
        const adicionales = await r_adicionales.json();

        const url_grupos = "./grupo_ingredientes4.json";
        //const url_grupos = "https://menupilotto.netlify.app/grupo_ingredientes4.json";
        const r_grupos = await fetch(url_grupos); //espera a que encuentre y cargue el archivo
        const grupos = await r_grupos.json();

        const categorias = document.querySelectorAll('.categoria');

        let productos = productos_vars_adics.filter((producto) => producto.fk_tipo !== '5' && producto.fk_tipo !== '4');
        let vars_adics = productos_vars_adics.filter(producto => producto.fk_tipo === '5' || producto.fk_tipo === '4'); //productos tipo ingredientes
        let contador_ingred=0;

        productos.forEach(producto => {
            const {id, nombre, valor, descripcion, fk_categoria, fk_estado, is_available, visible, fk_tipo} = producto;

           // height_var_adic[parseInt(id)] = 0;

           let ne = parseInt(valor.split('.'));  //se convierte el string valor a tipo numero

            if(fk_estado=='1' && is_available=='1' && visible=='1'){
                //DOM scripting de los productos
                const producto_div = document.createElement('DIV');
                producto_div.classList.add('producto');
                producto_div.onclick = agregarproducto;
                const producto_contenido = document.createElement('DIV');
                producto_contenido.classList.add('producto-contenido');
                //url_img = "build/img/logo-pilotto.png";
                url_img = "build/img/1.png";
                //url_img = "build/img/burguer2.jpg";
                const div_imagen = document.createElement('DIV');
                div_imagen.classList.add('producto-img');  //div q envuelve a la etiqueta img
                const producto_img = document.createElement('IMG');  //etiqueta imagen de cada producto
                if(url_img !== '')
                producto_img.setAttribute('src', url_img);
                const producto_texto = document.createElement('DIV');
                producto_texto.classList.add('producto-texto');
                const h4 = document.createElement('H4');
                h4.textContent = nombre;  //nombre de cada producto
                const div_btn_mas = document.createElement('DIV');  //div que envuelve al precio y al btn mas '+'
                div_btn_mas.classList.add('btn-mas');
                const h3_precio = document.createElement('H3');
                h3_precio.textContent = '$ '+ne; //new Intl.NumberFormat('de-DE').format(ne);
                const button = document.createElement('button');
                button.id = "btn-mas";
                button.textContent = '+';
                //DOM scripting del contenido que se desplega al dar click en el boton mas '+' de cada producto
                const add = document.createElement('DIV');
                add.classList.add('add');
                const agregar = document.createElement('DIV');
                agregar.classList.add('agregar');

                /////////contador  +/-  y el boton añadir  ////////////
                const cantidadycarrito = document.createElement('DIV');
                cantidadycarrito.classList.add('cantidadycarrito');
                const cantidad = document.createElement('DIV');
                cantidad.classList.add('cantidad');
                cantidad.dataset.producto = id;  //id de cada producto
                const span_menos = document.createElement('SPAN');
                span_menos.classList.add('decremento');
                span_menos.textContent = '-';
                const span_num = document.createElement('SPAN');
                span_num.classList.add('num');
                span_num.textContent = 1;
                const span_mas = document.createElement('SPAN');
                span_mas.classList.add('incremento');
                span_mas.textContent = '+';
                const añadir = document.createElement('SPAN');
                añadir.classList.add('añadir');
                añadir.textContent = 'Añadir';
                //inyectar html el precio el nombre del producto e imagen
                div_btn_mas.appendChild(h3_precio);
                div_btn_mas.appendChild(button);
                producto_texto.appendChild(h4);
                producto_texto.appendChild(div_btn_mas);
                if(url_img !== ''){
                    div_imagen.appendChild(producto_img);
                }
                producto_contenido.appendChild(div_imagen);
                producto_contenido.appendChild(producto_texto);
                producto_div.appendChild(producto_contenido);
                //inyectar html el botn '+' y la cantidad o contador
                producto_div.appendChild(add);
                add.appendChild(agregar);
                
                categorias.forEach(categoria =>{   //codigo q ordena los productos por categoria
                    if(categoria.dataset.categoria == fk_categoria){
                        categoria.appendChild(producto_div);
                    }
                }); 
    
                //////////variaciones////////////
                let grupoid = "";
                let adicionalid = "";
                let divgrupos_variac;
                let divgrupos_adic;

                recetas.forEach(receta => {   //recetas = variaciones
                    if((receta.fk_producto === id)&&(receta.editable === '1')){ //producto tiene variacion y si editable = 1 lo muestra
                        vars_adics.forEach(var_adic => { //se intera el arreglo de variaciones y adicionales
                            if((receta.fk_ingrediente === var_adic.id)&&(var_adic.fk_tipo === '5')&&(var_adic.fk_estado=='1')&&(var_adic.is_available === '1')){ //aqui se encuentra el ingrediente tipo variacion
                               // height_i+=4;
                               // height_var_adic[id] =  height_i; 
                                grupos.forEach(grupo => {
                                    if(grupo.id === receta.fk_grupo){
                                        
                                        let stringclass= 's'+id+'-'+grupo.id; //clase dinamica
                                    
                                        if(grupoid !== grupo.id){ //muestra el nombre de grupo
                                            if(organizargrupos.includes(stringclass)){ //identifca si el grupo ya existe
                                                divgrupos_variac = document.querySelector('.'+stringclass);
                                            }else{
                                                divgrupos_variac = document.createElement('DIV');
                                                divgrupos_variac.classList.add(stringclass, 'grupo');
                                                const nombre_grupo_variac = document.createElement('P');
                                                nombre_grupo_variac.textContent = grupo.nombre;
                                                divgrupos_variac.appendChild(nombre_grupo_variac);
                                                agregar.appendChild(divgrupos_variac);
                                            }         
                                            organizargrupos[index] = stringclass;
                                            index++; 
                                            grupoid = grupo.id;  
                                        }

                                        if(grupo.fk_tipo_grupo === '1'){ //variacion grupo 1 seleccion simple
                                            const div_variacion = document.createElement('DIV');
                                            div_variacion.classList.add('variacion');
                                            const div_info_variacion = document.createElement('DIV');
                                            div_info_variacion.classList.add('info_variacion');
                                            const label = document.createElement('label');
                                            label.textContent = var_adic.nombre;
                                            const input = document.createElement('input');
                                            input.type = "radio";
                                            //input.value = var_adic.nombre;
                                            input.value = var_adic.id; //input tipo radio tiene el id de la variacion simple sin o con costo adicional 
                                            input.name = grupo.nombre;
                                            input.onclick = select_simple;
                                            div_info_variacion.appendChild(label);
                                            div_info_variacion.appendChild(input);
                                            div_variacion.appendChild(div_info_variacion);
                                            divgrupos_variac.appendChild(div_variacion);

                                            if((parseInt(receta.adicional)>0)&&(receta.sumar === '1')){ //si el ingrediente de seleccion simple tiene costo
                                                div_variacion.insertAdjacentHTML('beforeend',
                                                `<div class="valor-adicional">
                                                <div class="cantidad-ingred" data-ingred="${contador_ingred}"><label>+ $${receta.adicional}</label>
                                                <span class="decremento-ingred">-</span>
                                                <span class="num-ingred">1</span>
                                                <span class="incremento-ingred">+</span></div>
                                                </div>`); 
                                                contador_ingred++;
                                            }
                                        }
                                        if(grupo.fk_tipo_grupo === '2'){ //variacion grupo 2 seleccion multiple con checkbox
                                            divgrupos_variac.dataset.max = grupo.max; 
                                            const div_variacion = document.createElement('DIV');
                                            div_variacion.classList.add('variacion');
                                            const div_info_variacion = document.createElement('DIV');
                                            div_info_variacion.classList.add('info_variacion');
                                            const label = document.createElement('label');
                                            label.textContent = var_adic.nombre;
                                            label.setAttribute('for', var_adic.nombre);
                                            const input = document.createElement('input');
                                            input.type = "checkbox";
                                            //input.id = var_adic.nombre;
                                            input.value = var_adic.id;
                                            input.onclick = select_multiple;  //cuando se de click l checkbox
                                            div_info_variacion.appendChild(label);
                                            div_info_variacion.appendChild(input);
                                            div_variacion.appendChild(div_info_variacion);
                                            divgrupos_variac.appendChild(div_variacion);
                                            
                                            if((parseInt(receta.adicional)>0)&&(receta.sumar === '1')){ //si el ingrediente de seleccion multiple tiene costo y sumar es 1 debe llevar contador y costo
                                                div_variacion.insertAdjacentHTML('beforeend',
                                                `<div class="valor-adicional">
                                                <div class="cantidad-ingred" data-ingred="${contador_ingred}"><label>+ $${receta.adicional}</label>
                                                <span class="decremento-ingred">-</span>
                                                <span class="num-ingred">1</span>
                                                <span class="incremento-ingred">+</span></div>
                                                </div>`); 
                                                contador_ingred++;
                                            }
                                            
                                            if((receta.adicional==='0')&&(receta.sumar === '1')){ //si el ingrediente de seleccion multiple no tiene costo y sumar es 1 debe llevar solo contador
                                                div_variacion.innerHTML =
                                                `<div class="adicional">
                                                <label for="v_${var_adic.nombre}">${var_adic.nombre}</label>
                                                <div class="cantidad-ingred" data-ingred="${contador_ingred}">
                                                <label class="gratis">+ $0</label>
                                                <span class="decremento-ingred">-</span>
                                                <span class="num-ingred">1</span>
                                                <span class="incremento-ingred">+</span>
                                                <input type="checkbox" id="v_${var_adic.nombre}" value="${var_adic.id}">
                                                </div>
                                                </div>
                                                `; 
                                                contador_ingred++;
                                            }

                                            if((parseInt(receta.adicional)>0)&&(receta.sumar === '0')){ //si el ingrediente de seleccion multiple tiene costo y sumar es 0 no lleva contador
                                                div_variacion.innerHTML =
                                                `<div class="adicional">
                                                <label for="v_${var_adic.nombre}">${var_adic.nombre}</label>
                                                <div class="select-adicional">
                                                <label>+ $${receta.adicional}</label>
                                                <input type="checkbox" id="v_${var_adic.nombre}" class="inputadic" value="${var_adic.id}">
                                                </div>
                                                </div>`; 
                                            }     
                                        }//fin grupo 2 multiple con checbox
                                    }  
                                }); //fin iteracion grupos 
                            }    
                        });  //fin iteracion ingredinetes
                    }
                });  //fin iteracion recetas
                ///////////////////// ADICIONALES ///////////////////////
                adicionales.forEach(adicional =>{
                    if(adicional.fk_producto === id){ //se valida si el producto tiene ingrediente tipo adicional
                        vars_adics.forEach(var_adic=>{
                            if((adicional.fk_adicional === var_adic.id)&&(var_adic.fk_tipo === '4')&&(var_adic.fk_estado=='1')&&(var_adic.is_available === '1')){ //se valida si el adicional cumple criterios

                                if(adicionalid !== id){ //muestra la palabra Adicional una sola vez por producto
                                    divgrupos_adic = document.createElement('DIV');
                                    divgrupos_adic.classList.add("adicionales");
                                    const nombre_grupo_adic = document.createElement('P');
                                    nombre_grupo_adic.textContent = "Adicionales";
                                    divgrupos_adic.appendChild(nombre_grupo_adic);
                                    agregar.appendChild(divgrupos_adic);
                                    adicionalid = id;
                                }
                                divgrupos_adic.insertAdjacentHTML('beforeend',
                                `<div class="adicional">
                                <label for="v_${var_adic.nombre}">${var_adic.nombre}</label>
                                <div class="select-adicional">
                                <label for="v_${var_adic.nombre}">  + $${parseInt(var_adic.valor.split('.'))}</label>
                                <input type="checkbox" id="v_${var_adic.nombre}" class="inputadic" data-valor="${var_adic.valor}" value="${var_adic.id}">
                                </div></div>`);
                            }      
                        });
                    }
                });

                agregar.appendChild(cantidadycarrito);
                cantidadycarrito.appendChild(cantidad);
                cantidad.appendChild(span_menos);
                cantidad.appendChild(span_num);
                cantidad.appendChild(span_mas);
                cantidadycarrito.appendChild(añadir);
                /*
                height_i = 0;
                height_var_adic[id] = height_var_adic[id] + 5;*/    
            } //fin del if
        });
        
        boton_mas();
        cantidad_productos();  //funcion de eventos de contador de productos
        cantidad_ingredientes();  //funcion de eventos del contador de ingredientes con costo
    } catch (error) {
        console.log(error);
    }
}



function select_multiple(e){
    if(e.target.parentElement.nextElementSibling){  //pregundo por el div de class="valor-adicional" q se agrega si el ingrediente variacion tiene costo adicional
        if(e.target.checked) e.target.parentElement.nextElementSibling.style.height = "auto";
        else e.target.parentElement.nextElementSibling.style.height = "0";
    }
}

///algoritmo q muestra y esconde los input al dar click por grupos o individuales 
function select_simple(e){
    if(controlselectsimple1)
        radiog1 = e.target;
        radiog2 = e.target;

    if(radiog1.name === radiog2.name){
        controlselectsimple1 = 0;
        const b = radiog2.name;
        const x = document.querySelectorAll('input[name='+b+']');
        x.forEach(x1=>{
            if(x1.checked){
                if(x1.parentElement.nextElementSibling){
                    x1.parentElement.nextElementSibling.style.height = "auto";
                }
            }else{
                if(x1.parentElement.nextElementSibling){
                    x1.parentElement.nextElementSibling.style.height = "0";
                }
            }
        }); 
    }
    else{
        radiog1 = radiog2;
        const b = radiog2.name;
        const x = document.querySelectorAll('input[name='+b+']');
        x.forEach(x1=>{
            if(x1.checked){
                if(x1.parentElement.nextElementSibling){
                    x1.parentElement.nextElementSibling.style.height = "auto";
                }
            }else{
                if(x1.parentElement.nextElementSibling){
                    x1.parentElement.nextElementSibling.style.height = "0";
                }
            }
        });
    }
}