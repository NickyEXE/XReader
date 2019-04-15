function startGame(){
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
  const warAndPeace = `“Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes. But I warn you, if you don’t tell me that this means war, if you still try to defend the infamies and horrors perpetrated by that Antichrist—I really believe he is Antichrist—I will have nothing more to do with you and you are no longer my friend, no longer my ‘faithful slave,’ as you call yourself! But how do you do? I see I have frightened you—sit down and tell me all the news.” It was in July, 1805, and the speaker was the well-known Anna Pávlovna Schérer, maid of honor and favorite of the Empress Márya Fëdorovna. With these words she greeted Prince Vasíli Kurágin, a man of high rank and importance, who was the first to arrive at her reception. Anna Pávlovna had had a cough for some days. She was, as she said, suffering from la grippe; grippe being then a new word in St. Petersburg, used only by the elite.`.split(" ")
  let wordIterator = 0
  renderer()
  document.addEventListener("keydown", keydownHandler)
  setInterval(wordsLogic, 10);
  setInterval(createWords, 1000)

  function createWords(){
    words.push({word: warAndPeace[wordIterator], x: canvas.width-100, y: Math.floor(Math.random() * (canvas.height-16)) + 1, width: 0, height: 16})
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
    console.log(isRightSideOfWordGreaterThanZero)
    const isWordOnLineWithAvatarTop = (avatar.y < word.y + 3) && (avatar.y > (word.y - word.height -3))
    const isWordOnLineWithAvatarBottom = (avatar.y+avatar.height < word.y + 3) && (avatar.y+avatar.height > (word.y - word.height -3))
    const isWordOnLineWithAvatarMiddle = (avatar.y+(avatar.height/2) < word.y + 3) && (avatar.y+(avatar.height/2) > (word.y - word.height -3))
    if (((isWordOnLineWithAvatarBottom||isWordOnLineWithAvatarMiddle)||isWordOnLineWithAvatarTop)&&isXColliding){
      alert("Game Over!")
      avatar.x = 99999
      avatar.y = 99999
        }
    if (word.x < -40){words.shift()
      score = score + 100
      console.log(score)
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
