const canvasPlaceholder = document.getElementById("canvasPlaceholder")
function startGame(essay, username, url){
  // start game constants
  const canvasPlaceholder = document.getElementById("canvasPlaceholder")
  canvasPlaceholder.innerHTML = `<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000; background: url('./assets/background.png')">
              <div id="dodger" style="bottom: 100px; left: 100px;"></div>
              <img id="ship" width="1" height="1" src="./assets/ship.PNG" alt="Ship">
          </canvas>`
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext('2d');
  // initial render and game stats
  let score = 0
  let words = []
  let currentSentence = ""
  speak(currentSentence)
  let wordIterator = 0
  createTheBox()
  const avatar = {x: 0, y: Math.round(canvas.height/2), height: Math.round(canvas.height/15), width: Math.round(canvas.height/15)}
  const essayArray = essay.replace(/^\s+|\s+$/g, "").split(" ").filter(word => word.length>0)
  Laser.initializeLaserVariables(canvas, avatar, ctx)


  renderer()
  // game controllers
  const keyPress ={up: {pressed: false, pressedFunction: upFunction}, down: {pressed: false, pressedFunction: downFunction}, space: {pressed: false, pressedFunction: Laser.shootLaser}}
  document.addEventListener("keydown", keydownHandler)
  document.addEventListener("keyup", keyupHandler)
  let gameInterval = setInterval(gameIntervalFunctions, 10);
  let wordInterval = setInterval(createWords, 300)

  function callPressedFunctions(){
    Object.keys(keyPress).forEach(button => callButtonFunction(button))
  }

  function callButtonFunction(button){
    if (keyPress[button].pressed){keyPress[button].pressedFunction()}
  }

  function downFunction(){
    avatar.y = avatar.y + 2
  }

  function upFunction(){
    avatar.y = avatar.y - 2
  }
  function keydownHandler(e){
    e.preventDefault()
    if (e.key === "ArrowDown") {keyPress["down"]["pressed"]=true;}
    if (e.key === "ArrowUp") {
      keyPress["up"]["pressed"]=true;
    }
    if (e.key === " "){
      keyPress["space"]["pressed"]=true;
    }
    callPressedFunctions()
    renderer()
  }
  function keyupHandler(e){
    e.preventDefault
    if (e.key === " "){
      Laser.laserSet = true
      keyPress["space"]["pressed"]=false
    }
    if (e.key === "ArrowUp"){
      keyPress["up"]["pressed"] = false
    }
    if (e.key === "ArrowDown"){
      keyPress["down"]["pressed"] = false
    }
    callPressedFunctions()
    renderer()
  }


  // called to add a new word whenever the wordInterval is hit
  function createWords(){
    const word = essayArray[wordIterator]
    words.push({word: word, x: canvas.width-100, y: Math.floor(Math.random() * (canvas.height-16)) + 1, width: 0, height: 16})
    wordIterator ++
    currentSentence += " " + word
    if (checkPunctuation(word)){speak(currentSentence);
    currentSentence = ""}
  }

// say a message
function speak(text, callback) {
    var u = new SpeechSynthesisUtterance();
    const voices = speechSynthesis.getVoices();
    u.text = text;
    u.lang = 'en-US';
    u.voice = voices.filter(voice => voice.name == "Daniel")[0]
    u.rate = 1
    u.volume = 2
    u.onend = function () {
        if (callback) {
            callback();
        }
    }; 
    u.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };
    speechSynthesis.speak(u);
}

  function gameIntervalFunctions(){
    wordsLogic()
    Laser.changeLasers()
    callPressedFunctions()
    renderer()
  }

  // renders each word on the screen
  function wordsLogic(){
    words.forEach(word => wordLogic(word))
  }

  function checkPunctuation (string){
	   return !!string.substr(-1).match(/\.|\?|\!/gm)}

  // moves the words and checks for collisions, deletes word and adds 100 points if it's far behind
  function wordLogic(word){
    word.x = word.x - 5
    // first condition: has the right side of the word hit zero? If so, you shouldn't get killed by it
    // second condition: is any part of the word between 0 and the avatar width
    const isRightSideOfWordGreaterThanZero = word.x + word.width > 0
    const isAnyPartOfWordLessThanAvatarWidth = !!(((word.x < avatar.width) || (word.x + word.width <avatar.width)))
    const isXColliding = !!(isRightSideOfWordGreaterThanZero && isAnyPartOfWordLessThanAvatarWidth)
    const isWordOnLineWithAvatarTop = (avatar.y < word.y + 3) && (avatar.y > (word.y - word.height -3))
    const isWordOnLineWithAvatarBottom = (avatar.y+avatar.height < word.y + 3) && (avatar.y+avatar.height > (word.y - word.height -3))
    const isWordOnLineWithAvatarMiddle = (avatar.y+(avatar.height/2) < word.y + 3) && (avatar.y+(avatar.height/2) > (word.y - word.height -3))
    if (((isWordOnLineWithAvatarBottom||isWordOnLineWithAvatarMiddle)||isWordOnLineWithAvatarTop)&&isXColliding){
      document.getElementById("shipsplode").play();
      clearInterval(gameInterval)
      clearInterval(wordInterval)
      const theModal = document.getElementById("theModal")
      theModal.style.display = "block"
      adapter.postScore(username, score, url).then(response => console.log(response))
      const modalContent = document.getElementById("modalContent")
      modalContent.innerHTML = endGameModalHTML
      theModal.querySelector(".btn").addEventListener('click', continueGame)
    }
    Laser.lasersRendered.forEach(laser => {
      if ((word.x <= laser.x && laser.x<=word.x+word.width)&&(word.y-word.height<=laser.y && laser.y <= word.y))
      {words.splice(words.findIndex(x => x === word), 1);
        Laser.lasersRendered.splice(Laser.lasersRendered.findIndex(x=> x=== laser), 1);
        document.getElementById("wordsplode").cloneNode(true).play();
      score = score + 500}})
    //
    if (word.x < -40){words.shift()
      score = score + 100
    }
  }

  function continueGame(word){
    console.log("Continuing Game")
    score = 0
    words = []
    gameInterval = setInterval(gameIntervalFunctions, 10);
    wordInterval = setInterval(createWords, 300)
    document.getElementById("gameEndModal").style.display = "none"
  }

  // calls all the render functions
  function renderer(objs){
    createTheBox()
    if (avatar.y > canvas.height - avatar.height){avatar.y=canvas.height - avatar.height}
    if (avatar.y < 0){avatar.y = 0}
    printTheAvatar(avatar)
    words.forEach(word => renderWord(word))
    renderLaserBar()
    Laser.avatar = avatar
    Laser.renderLasers()
  }

  function renderLaserBar(){
    ctx.fillStyle = "blue"
    ctx.strokeStyle = 'white';
    ctx.fillRect(20, canvas.height-100+(Laser.lasersRendered.length*10), 10, (12-(Laser.lasersRendered.length))*10);
    ctx.stroke();
  }

  // renders individual words
  function renderWord(word){
    ctx.font = "16px Arial";
    ctx.fillStyle = 'white';
    ctx.fillRect(word.x-2, word.y-16, ctx.measureText(word.word).width+4, 20)
    ctx.fillStyle = 'black';
    ctx.fillText(word.word, word.x, word.y);
    word.width = Math.ceil(ctx.measureText(word.word).width)
  }

  // creates the canvas
  function createTheBox()
  {
      canvas.width = document.body.clientWidth;
      canvas.height = window.innerHeight
      canvasW = canvas.width;
      canvasH = window.innerHeight;
      ctx.font = "18px Arial Black";
      ctx.fillText(`Score: ${score}`, canvas.width/2, 18);
      return canvas
  }

  function printTheAvatar(avatar){
    ctx.drawImage(document.getElementById("ship"),avatar.x, avatar.y, avatar.width, avatar.height);
  }


}
