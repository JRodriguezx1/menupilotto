import{menu_barra_lateral,boton_mas,cantidad_productos,cantidad_ingredientes}from"./funciones.js";import{agregarproducto}from"./carrito.js";function iniciarapi(){mostrarcategorias()}document.addEventListener("DOMContentLoaded",(function(){iniciarapi()}));let radiog1,radiog2,controlselectsimple1=1,organizargrupos=[];var index=0;let url_img="";async function mostrarcategorias(){try{const e="./categorias4.json",t=await fetch(e),n=await t.json(),a=document.querySelector("#pagina2 .contenedor");n.forEach(e=>{const{id:t,nombre:n,fk_cocina:i,orden:d}=e;if("Gestion"!==n){const e=document.createElement("a");e.textContent=n,e.setAttribute("href","#"+n);const i=document.createElement("DIV");i.classList.add("categoria-l"),i.appendChild(e);const d=document.createElement("H3");d.classList.add("nombre-categoria"),d.textContent=n;const o=document.createElement("DIV");o.classList.add("categoria"),o.setAttribute("id",n),o.dataset.categoria=t,o.appendChild(d),document.querySelector(".categorias-lateral").appendChild(i),a.appendChild(o)}}),menu_barra_lateral(),mostrarproductos()}catch(e){console.log(e)}}async function mostrarproductos(){try{const e="./productos4.json",t=await fetch(e),n=await t.json(),a="./recetas4.json",i=await fetch(a),d=await i.json(),o="./producto_adicional4.json",c=await fetch(o),l=await c.json(),s="./grupo_ingredientes4.json",r=await fetch(s),m=await r.json(),p=document.querySelectorAll(".categoria");let u=n.filter(e=>"5"!==e.fk_tipo&&"4"!==e.fk_tipo),g=n.filter(e=>"5"===e.fk_tipo||"4"===e.fk_tipo),b=0;u.forEach(e=>{const{id:t,nombre:n,valor:a,descripcion:i,fk_categoria:o,fk_estado:c,is_available:s,visible:r,fk_tipo:u}=e;let h=parseInt(a.split("."));if("1"==c&&"1"==s&&"1"==r){const e=document.createElement("DIV");e.classList.add("producto"),e.onclick=agregarproducto;const a=document.createElement("DIV");a.classList.add("producto-contenido"),url_img="build/img/1.png";const i=document.createElement("DIV");i.classList.add("producto-img");const c=document.createElement("IMG");""!==url_img&&c.setAttribute("src",url_img);const s=document.createElement("DIV");s.classList.add("producto-texto");const r=document.createElement("H4");r.textContent=n;const u=document.createElement("DIV");u.classList.add("btn-mas");const f=document.createElement("H3");f.textContent="$ "+h;const E=document.createElement("button");E.id="btn-mas",E.textContent="+";const _=document.createElement("DIV");_.classList.add("add");const v=document.createElement("DIV");v.classList.add("agregar");const C=document.createElement("DIV");C.classList.add("cantidadycarrito");const x=document.createElement("DIV");x.classList.add("cantidad"),x.dataset.producto=t;const k=document.createElement("SPAN");k.classList.add("decremento"),k.textContent="-";const L=document.createElement("SPAN");L.classList.add("num"),L.textContent=1;const $=document.createElement("SPAN");$.classList.add("incremento"),$.textContent="+";const I=document.createElement("SPAN");I.classList.add("añadir"),I.textContent="Añadir",u.appendChild(f),u.appendChild(E),s.appendChild(r),s.appendChild(u),""!==url_img&&i.appendChild(c),a.appendChild(i),a.appendChild(s),e.appendChild(a),e.appendChild(_),_.appendChild(v),p.forEach(t=>{t.dataset.categoria==o&&t.appendChild(e)});let y,S,D="",V="";d.forEach(e=>{e.fk_producto===t&&"1"===e.editable&&g.forEach(n=>{e.fk_ingrediente===n.id&&"5"===n.fk_tipo&&"1"==n.fk_estado&&"1"===n.is_available&&m.forEach(a=>{if(a.id===e.fk_grupo){let i="s"+t+"-"+a.id;if(D!==a.id){if(organizargrupos.includes(i))y=document.querySelector("."+i);else{y=document.createElement("DIV"),y.classList.add(i,"grupo");const e=document.createElement("P");e.textContent=a.nombre,y.appendChild(e),v.appendChild(y)}organizargrupos[index]=i,index++,D=a.id}if("1"===a.fk_tipo_grupo){const t=document.createElement("DIV");t.classList.add("variacion");const i=document.createElement("DIV");i.classList.add("info_variacion");const d=document.createElement("label");d.textContent=n.nombre;const o=document.createElement("input");o.type="radio",o.value=n.id,o.name=a.nombre,o.onclick=select_simple,i.appendChild(d),i.appendChild(o),t.appendChild(i),y.appendChild(t),parseInt(e.adicional)>0&&"1"===e.sumar&&(t.insertAdjacentHTML("beforeend",`<div class="valor-adicional">\n                                                <div class="cantidad-ingred" data-ingred="${b}"><label>+ $${e.adicional}</label>\n                                                <span class="decremento-ingred">-</span>\n                                                <span class="num-ingred">1</span>\n                                                <span class="incremento-ingred">+</span></div>\n                                                </div>`),b++)}if("2"===a.fk_tipo_grupo){y.dataset.max=a.max;const t=document.createElement("DIV");t.classList.add("variacion");const i=document.createElement("DIV");i.classList.add("info_variacion");const d=document.createElement("label");d.textContent=n.nombre,d.setAttribute("for",n.nombre);const o=document.createElement("input");o.type="checkbox",o.value=n.id,o.onclick=select_multiple,i.appendChild(d),i.appendChild(o),t.appendChild(i),y.appendChild(t),parseInt(e.adicional)>0&&"1"===e.sumar&&(t.insertAdjacentHTML("beforeend",`<div class="valor-adicional">\n                                                <div class="cantidad-ingred" data-ingred="${b}"><label>+ $${e.adicional}</label>\n                                                <span class="decremento-ingred">-</span>\n                                                <span class="num-ingred">1</span>\n                                                <span class="incremento-ingred">+</span></div>\n                                                </div>`),b++),"0"===e.adicional&&"1"===e.sumar&&(t.innerHTML=`<div class="adicional">\n                                                <label for="v_${n.nombre}">${n.nombre}</label>\n                                                <div class="cantidad-ingred" data-ingred="${b}">\n                                                <label class="gratis">+ $0</label>\n                                                <span class="decremento-ingred">-</span>\n                                                <span class="num-ingred">1</span>\n                                                <span class="incremento-ingred">+</span>\n                                                <input type="checkbox" id="v_${n.nombre}" value="${n.id}">\n                                                </div>\n                                                </div>\n                                                `,b++),parseInt(e.adicional)>0&&"0"===e.sumar&&(t.innerHTML=`<div class="adicional">\n                                                <label for="v_${n.nombre}">${n.nombre}</label>\n                                                <div class="select-adicional">\n                                                <label>+ $${e.adicional}</label>\n                                                <input type="checkbox" id="v_${n.nombre}" class="inputadic" value="${n.id}">\n                                                </div>\n                                                </div>`)}}})})}),l.forEach(e=>{e.fk_producto===t&&g.forEach(n=>{if(e.fk_adicional===n.id&&"4"===n.fk_tipo&&"1"==n.fk_estado&&"1"===n.is_available){if(V!==t){S=document.createElement("DIV"),S.classList.add("adicionales");const e=document.createElement("P");e.textContent="Adicionales",S.appendChild(e),v.appendChild(S),V=t}S.insertAdjacentHTML("beforeend",`<div class="adicional">\n                                <label for="v_${n.nombre}">${n.nombre}</label>\n                                <div class="select-adicional">\n                                <label for="v_${n.nombre}">  + $${parseInt(n.valor.split("."))}</label>\n                                <input type="checkbox" id="v_${n.nombre}" class="inputadic" data-valor="${n.valor}" value="${n.id}">\n                                </div></div>`)}})}),v.appendChild(C),C.appendChild(x),x.appendChild(k),x.appendChild(L),x.appendChild($),C.appendChild(I)}}),boton_mas(),cantidad_productos(),cantidad_ingredientes()}catch(e){console.log(e)}}function select_multiple(e){e.target.parentElement.nextElementSibling&&(e.target.checked?e.target.parentElement.nextElementSibling.style.height="auto":e.target.parentElement.nextElementSibling.style.height="0")}function select_simple(e){if(controlselectsimple1&&(radiog1=e.target),radiog2=e.target,radiog1.name===radiog2.name){controlselectsimple1=0;const e=radiog2.name;document.querySelectorAll("input[name="+e+"]").forEach(e=>{e.checked?e.parentElement.nextElementSibling&&(e.parentElement.nextElementSibling.style.height="auto"):e.parentElement.nextElementSibling&&(e.parentElement.nextElementSibling.style.height="0")})}else{radiog1=radiog2;const e=radiog2.name;document.querySelectorAll("input[name="+e+"]").forEach(e=>{e.checked?e.parentElement.nextElementSibling&&(e.parentElement.nextElementSibling.style.height="auto"):e.parentElement.nextElementSibling&&(e.parentElement.nextElementSibling.style.height="0")})}}