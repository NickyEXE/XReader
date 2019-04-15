
document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext('2d');
  createTheBox()
  const avatar = {x: 0, y: Math.round(canvas.height/2), height: Math.round(canvas.height/15), width: Math.round(canvas.height/15)}
  renderer(avatar)
  document.addEventListener("keydown", keydownHandler)

  function renderer(objs){
    createTheBox()
    if (avatar.y > canvas.height - avatar.height){avatar.y=canvas.height - avatar.height}
    if (avatar.y < 0){avatar.y = 0}
    printTheAvatar(avatar)
    console.log("canvas",canvas.height)
    console.log("dodger x", avatar.x)
    console.log("dodger y", avatar.y)
  }

  function createTheBox()
  {
      canvas.width = document.body.clientWidth; //document.width is obsolete
      canvas.height = window.innerHeight//document.height is obsolete
      canvasW = canvas.width;
      canvasH = window.innerHeight;
      return canvas
  }

  function keydownHandler(e){
    e.preventDefault()
    if (e.key === "ArrowDown") {
      avatar.y = avatar.y + 5
      renderer(avatar)
    }
    if (e.key === "ArrowUp") {
      avatar.y = avatar.y - 5
      renderer(avatar)
    }
  }


  function printTheAvatar(avatar){
    console.log("canvas",canvas.height)
    console.log("dodger x", avatar.x)
    console.log("dodger y", avatar.y)
    ctx.fillRect(avatar.x, avatar.y, avatar.width, avatar.height);
  }

}
