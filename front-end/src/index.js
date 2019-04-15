
document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext('2d');
  createTheBox()
  const avatar = {x: 0, y: Math.round(canvas.height/2), height: Math.round(canvas.height/15), width: Math.round(canvas.height/15)}
  const words = [{word: "Ponies", x: canvas.width-100, y: canvas.height/2, width: 0, height: 16}]
  renderer()
  document.addEventListener("keydown", keydownHandler)
  setInterval(wordsLogic, 10);
  setInterval(createWords, 3000)

  function createWords(){
    words.push({word: "Squirrel", x: canvas.width-100, y: Math.floor(Math.random() * (canvas.height-16)) + 1, width: 0, height: 16})
  }

  function wordsLogic(){
    words.forEach(word => wordLogic(word))
    renderer()
  }

  function wordLogic(word){
    word.x = word.x - 2
    // if the front or back collides on x
    const isAvatarLeftSideLefterThanLeftSideOfWord = avatar.x > word.x
    const isAvatarLeftSideRighterThanRightSideOfWord = avatar.x < word.x + word.width
    const isAvatarRightSideRighterThanLeftSideOfWord = avatar.x+avatar.width > word.x
    const isAvatarRightSideLefterThanRightSideOfWord = avatar.x+avatar.width < word.x + word.width
    const isAvatarBottomGreater
    const areWeCollidingOnY = (avatar.y > word.y && avatar.y < word.y + word.height) ||
    (avatar.y+avatar.height > word.y && avatar.y+avatar.height < word.y + word.height)  if (word.x<100){
    console.log(word.x, avatar.x, areWeCollidingOnX)
    console.log(word.y, avatar.y, areWeCollidingOnY)}
    if (areWeCollidingOnX && areWeCollidingOnY){
      alert("game over")
      document.body.innerHTML = ""
      avatar.x = 9999999
      avatar.y = 9999999
    }
    if (word.x < -40){words.shift()}

  }

  function renderer(objs){
    createTheBox()
    if (avatar.y > canvas.height - avatar.height){avatar.y=canvas.height - avatar.height}
    if (avatar.y < 0){avatar.y = 0}
    printTheAvatar(avatar)
    words.forEach(word => renderWord(word))
  }

  function renderWord(word){
    ctx.font = "16px Arial";
    ctx.fillText(word.word, word.x, word.y);
    word.width = Math.ceil(ctx.measureText(word.word).width)
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
