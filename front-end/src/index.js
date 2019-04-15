
document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext('2d');
  createTheBox()
  const avatar = {x: 0, y: Math.round(canvas.height/2), height: Math.round(canvas.height/15), width: Math.round(canvas.height/15)}
  const words = []
  renderer()
  document.addEventListener("keydown", keydownHandler)
  setInterval(wordsLogic, 10);
  setInterval(createWords, 1000)

  function createWords(){
    words.push({word: "Squirrel", x: canvas.width-100, y: Math.floor(Math.random() * (canvas.height-16)) + 1, width: 0, height: 16})
  }

  function wordsLogic(){
    words.forEach(word => wordLogic(word))
    renderer()
  }

  function wordLogic(word){
    word.x = word.x - 2
    // first condition: has the right side of the word hit zero? If so, you shouldn't get killed by it
    // second condition: is any part of the word between 0 and the avatar width
    const isRightSideOfWordGreaterThanZero = word.x + word.width > 0
    const isAnyPartOfWordLessThanAvatarWidth = !!(((word.x < avatar.width) || (word.x + word.width <avatar.width)))
    const isXColliding = !!(isRightSideOfWordGreaterThanZero && isAnyPartOfWordLessThanAvatarWidth)
    console.log(isRightSideOfWordGreaterThanZero)
    const isWordOnLineWithAvatarTop = (avatar.y < word.y + 3) && (avatar.y > (word.y - word.height -3))
    const isWordOnLineWithAvatarBottom = (avatar.y+avatar.height < word.y + 3) && (avatar.y+avatar.height > (word.y - word.height -3))
    const isWordOnLineWithAvatarMiddle = (avatar.y+(avatar.height/2) < word.y + 3) && (avatar.y+(avatar.height/2) > (word.y - word.height -3))
    if (((isWordOnLineWithAvatarBottom||isWordOnLineWithAvatarMiddle)||isWordOnLineWithAvatarTop)&&isXColliding){
      alert("Game Over!")
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
