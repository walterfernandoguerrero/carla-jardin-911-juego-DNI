"use strict";

//capturar video ó imagen
const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");

//tomar foto
const button = document.querySelector(".start-btn");

//mostrar foto
const photo = document.querySelector(".photo");

//constrains
/*
Aquí enviamos las caracteristicas del video y
audio que solicitamos
*/

const constraints = {
  video: { width: 300, height: 300 },
  audio: false,
};


//acceso a la webcam
/*
Aquí recibimos la respuesta del navegador, es una promesa
 */
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSucces(stream);
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
};

//3. -----------> si la promesa tiene exito
const handleSucces = (stream) => {
  video.srcObject = stream;
  video.play();
};

//4.------------>Llamada a la función get
getVideo();

//4. ----------> Button y foto
button.addEventListener("click", () => {
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, 300, 300);
  let data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
  
  const a= document.createElement("a");
  a.href=canvas.toDataURL();
  a.download = "imagen_" + obtenerFecha() + ".png";
  a.click();
  
});

function obtenerFecha(){
   const d = new Date();
  const fh= d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getUTCDate() +
   "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds();
  return fh;

}


function imprimirCuadro(impresion){
  /*var contenido= document.getElementById('impresion').innerHTML;
  var w = window.open();
  w.document.write(contenido);
  w.document.close();
  w.focus();
  w.print();
  w.close();*/
const nombre = document.getElementById("nombre").value;
const ap = document.getElementById("apellido").value; 
const tram = document.getElementById("tramite").value;
const dni = document.getElementById("dni").value;


if (nombre && ap && tram && dni){
  window.print();
  return true;
}else{
  alert("FALTAN DATOS : NOMBRE DATOS O NROS DE TRAMITE Y DNI , complete los campos gracias");
}
}

const file = document.getElementById('foto');
//cambio de selecion de archivo
const img =document.getElementById('walter');
file.addEventListener('change', e => { 
  if(e.target.files[0]){
    const reader= new FileReader();
    reader.onload = function (e){
    img.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  else{

  }
});

function miTramite(){
  const tram = obtenerFecha();
  const nroTram = "J911-" + obtenerFecha() +"-001";
  document.getElementById("tramite").value = nroTram;
  document.getElementById("dni").value = tram;
}
