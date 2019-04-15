
document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext('2d');
  createTheBox()
  const avatar = {x: 0, y: Math.round(canvas.height/2), height: Math.round(canvas.height/15), width: Math.round(canvas.height/15)}
  const words = [{word: "Ponies", x: canvas.width-100, y: canvas.height/2}]
  renderer()
  document.addEventListener("keydown", keydownHandler)
  setInterval(wordsLogic, 10);

  function wordsLogic(){
    words.forEach(word => wordLogic(word))
    renderer()
  }

  function wordLogic(word){
    word.x = word.x - 2
    // if the front or back collides on x
    const areWeCollidingOnX = (avatar.x > word.x && avatar.x < word.x + 100) || (avatar.x+avatar.width > word.x && avatar.x+avatar.width < word.x + 100)
    const areWeCollidingOnY = (avatar.y > word.y && avatar.y < word.y + 100) || (avatar.y+avatar.height > word.y && avatar.y+avatar.height < word.y + 100)
    if (areWeCollidingOnX && areWeCollidingOnY){
      alert("game over")
      document.body.innerHTML = ""
      avatar.x = 9999999
      avatar.y = 9999999
    }
  }

  function renderer(objs){
    createTheBox()
    if (avatar.y > canvas.height - avatar.height){avatar.y=canvas.height - avatar.height}
    if (avatar.y < 0){avatar.y = 0}
    printTheAvatar(avatar)
    words.forEach(word => renderWord(word))
  }

  function renderWord(word){
    ctx.fillRect(word.x, word.y, 100, 100);
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
    ctx.fillRect(avatar.x, avatar.y, avatar.width, avatar.height);
  }

}
