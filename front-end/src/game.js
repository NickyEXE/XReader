function startGame(essay, username, url){
  const canvasPlaceholder = document.getElementById("canvasPlaceholder")
  canvasPlaceholder.innerHTML = `<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000; background: url('https://ak2.picdn.net/shutterstock/videos/16719202/thumb/1.jpg')">
          <div id="dodger" style="bottom: 100px; left: 100px;"></div>
      </canvas>`
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext('2d');
  let score = 0
  createTheBox()
  const avatar = {x: 0, y: Math.round(canvas.height/2), height: Math.round(canvas.height/15), width: Math.round(canvas.height/15)}
  const words = []
  const essayArray = essay.response.reduce((accumulator, currentValue) => accumulator + " " + currentValue).split(" ")
  console.log(essayArray)
  let wordIterator = 0
  renderer()
  document.addEventListener("keydown", keydownHandler)
  const gameInterval = setInterval(wordsLogic, 10);
  const wordInterval = setInterval(createWords, 1000)

  function createWords(){
    words.push({word: essayArray[wordIterator], x: canvas.width-100, y: Math.floor(Math.random() * (canvas.height-16)) + 1, width: 0, height: 16})
    wordIterator ++
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
    const isWordOnLineWithAvatarTop = (avatar.y < word.y + 3) && (avatar.y > (word.y - word.height -3))
    const isWordOnLineWithAvatarBottom = (avatar.y+avatar.height < word.y + 3) && (avatar.y+avatar.height > (word.y - word.height -3))
    const isWordOnLineWithAvatarMiddle = (avatar.y+(avatar.height/2) < word.y + 3) && (avatar.y+(avatar.height/2) > (word.y - word.height -3))
    if (((isWordOnLineWithAvatarBottom||isWordOnLineWithAvatarMiddle)||isWordOnLineWithAvatarTop)&&isXColliding){
      alert("Game Over!")
      avatar.x = 99999
      avatar.y = 99999
      clearInterval(gameInterval)
      clearInterval(wordInterval)
      adapter.postScore(username, score, url).then(response => console.log(response))
    }

    if (word.x < -40){words.shift()
      score = score + 100
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
      ctx.font = "18px Arial Black";
      ctx.fillText(`Score: ${score}`, canvas.width/2, 18);
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
