import { fechafooter, mostrar_btnflotante_ws, menu_lateral_desplegable, evento_llamarmesero, evento_pedircuenta, evento_btn_ver_todo, mostrar_presencial_domicilio } from "./funciones.js";

document.addEventListener('DOMContentLoaded', function(){ iniciarapp(); });

function iniciarapp(){
    mostrar_btnflotante_ws();
    menu_lateral_desplegable();  //boton de barras menu lateral de la app  *import
    evento_llamarmesero();
    evento_pedircuenta();
    evento_btn_ver_todo();  //al dar click en boton ver todo el header lo minimiza  *import
   mostrar_presencial_domicilio();
   fechafooter();
}


