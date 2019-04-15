document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  init()
}
function init()
{
    canvas = document.getElementById("myCanvas");
    if (canvas){
      console.log("yo we're in a canvas")
    }
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = Math.max( window.innerHeight, document.body.clientHeight ) //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;
}
