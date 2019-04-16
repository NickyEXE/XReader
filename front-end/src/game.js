function startGame(essay, username, url){
  // start game constants
  const canvasPlaceholder = document.getElementById("canvasPlaceholder")
  canvasPlaceholder.innerHTML = `<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000; background: url('https://ak2.picdn.net/shutterstock/videos/16719202/thumb/1.jpg')">
          <div id="dodger" style="bottom: 100px; left: 100px;"></div>
      </canvas>`
  const canvas = document.getElementById("myCanvas")
  const ctx = canvas.getContext('2d');
  // laser stuff
  class Laser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.constructor.lasersRendered.push(this)
    }

    behavior(){
      // move the laser
      this.x = this.x + this.constructor.speed
      // delete the laser if it's off-screen
      if (this.x > canvas.height+this.constructor.speed){
        this.constructor.lasersRendered.shift()
      }
    }

    render(){
      ctx.fillRect(this.x, this.y, Laser.speed, 1)
    }
    static changeLasers(){
    this.lasersRendered.forEach(laser => laser.behavior())}

    static laserSound(){
      document.getElementById("laser").cloneNode(true).play();
    }

    static renderLasers(){
      this.lasersRendered.forEach(laser => laser.render())
    }
  }
  Laser.laserSet = true
  Laser.speed = 5
  Laser.lasersReady = 3
  Laser.maxLasers = 3
  Laser.lasersRendered = []
  Laser.laserRefresh = 200
  // initial render and game stats
  let score = 0
  createTheBox()
  const avatar = {x: 0, y: Math.round(canvas.height/2), height: Math.round(canvas.height/15), width: Math.round(canvas.height/15)}
  const words = []
  const essayArray = essay.response.split(" ")
  let wordIterator = 0
  renderer()
  // game controllers
  document.addEventListener("keydown", keydownHandler)
  document.addEventListener("keyup", resetLaser)
  const gameInterval = setInterval(gameIntervalFunctions, 10);
  const wordInterval = setInterval(createWords, 1000)

  // called to add a new word whenever the wordInterval is hit
  function createWords(){
    words.push({word: essayArray[wordIterator], x: canvas.width-100, y: Math.floor(Math.random() * (canvas.height-16)) + 1, width: 0, height: 16})
    wordIterator ++
  }

  function gameIntervalFunctions(){
    wordsLogic()
    Laser.changeLasers()
    renderer()
  }

  // renders each word on the screen
  function wordsLogic(){
    words.forEach(word => wordLogic(word))
  }

  // moves the words and checks for collisions, deletes word and adds 100 points if it's far behind
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
      document.getElementById("shipsplode").play();
      avatar.x = 99999
      avatar.y = 99999
      clearInterval(gameInterval)
      clearInterval(wordInterval)
      alert("Game Over!")
      adapter.postScore(username, score, url).then(response => console.log(response))
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

  // calls all the render functions
  function renderer(objs){
    createTheBox()
    if (avatar.y > canvas.height - avatar.height){avatar.y=canvas.height - avatar.height}
    if (avatar.y < 0){avatar.y = 0}
    printTheAvatar(avatar)
    words.forEach(word => renderWord(word))
    Laser.renderLasers()
  }

  // renders individual words
  function renderWord(word){
    ctx.font = "16px Arial";
    ctx.fillStyle = 'white';
    ctx.fillRect(word.x, word.y-16, ctx.measureText(word.word).width, 18)
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
    if (e.key === " "){
      shootLaser()
    }
  }

  function printTheAvatar(avatar){
    ctx.fillRect(avatar.x, avatar.y, avatar.width, avatar.height);
  }


  function resetLaser(e){
    if (e.key === " "){
      Laser.laserSet = true
    }
  }
  function shootLaser(){
    if (Laser.laserSet){
    Laser.laserSet = false
    new Laser(avatar.x, (avatar.y +(avatar.height/2)))
    Laser.laserSound()
  }}

}
