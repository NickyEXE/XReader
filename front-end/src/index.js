document.addEventListener("DOMContentLoaded", domLoadFunctions)

function loadTheGame(){
  const modal = document.getElementById("theModal")
  document.body.style.color = "white"
  document.getElementById("theModal").children[0].style.backgroundColor = "black"
  document.getElementById("modalContent").innerHTML = welcomePageHTML
  const urlButt = document.querySelector('#url-butt')
  const form = document.querySelector('#form')
  const container = document.querySelector('.container')
  const username = document.querySelector("#username")
  urlButt.addEventListener('click', processUrl)
  form.addEventListener('click', formClickHandler)
  adapter.getUserHighScores().then(userHighScores => populateUserHighScores(userHighScores))
}

function domLoadFunctions(){
  loadTheGame()
  // const modal = document.getElementById("theModal")
  // document.body.style.color = "white"
  // document.getElementById("theModal").children[0].style.backgroundColor = "black"
  // document.getElementById("modalContent").innerHTML = welcomePageHTML
  // const urlButt = document.querySelector('#url-butt')
  // const form = document.querySelector('#form')
  // const container = document.querySelector('.container')
  // const username = document.querySelector("#username")
  // urlButt.addEventListener('click', processUrl)
  // form.addEventListener('click', formClickHandler)
  // adapter.getUserHighScores().then(userHighScores => populateUserHighScores(userHighScores))

}

function processUrl(e) {
  e.preventDefault()
  const newUrlDiv = document.getElementById('newurl')
  newUrlDiv.innerHTML =
                `<div class="form-group" style=>
                  <br>
                  <label id="urlInputTag">What's the URL of the article you want to read?</label>
                  <input type="text" class="form-control" id="url" placeholder="Enter your Url">
                  <div class="title" style="display: none">
                    <label id= "titleInputTag">Title:</label>
                    <input type="text" class="form-control" id="title" placeholder="Enter a Title">
                  </div>
                </div>
                <button id="titleButton" type="submit" class="btn btn-info">Enter Title</button>
                <button id="playGameButton" type="submit" style="display: none" class="btn btn-primary">Get Your Read On</button>
                `
  e.target.style.display = "none"
}

function formClickHandler(e) {
  if (e.target.id === "playGameButton") {
    e.preventDefault()
    if (!username.value){document.getElementById("usernamePrompter").style.color = "yellow";
      document.getElementById("usernamePrompter").innerText = "Please enter a username!"
    }
    else if (!title.value){document.getElementById("titleInputTag").style.color = "yellow";
      document.getElementById("titleInputTag").innerText = "Please enter a title!"
    }
    else {
      const body = {username: checkIfValueOrInnerText("username"), user_input: checkIfValueOrInnerText("url"), title: checkIfValueOrInnerText("title")}
      adapter.getUrl(body)
      .then(essay => checkGame(essay, checkIfValueOrInnerText("username"), checkIfValueOrInnerText("url"), checkIfValueOrInnerText("title")))}

    function checkIfValueOrInnerText(tag){
      const domElement = document.querySelector(`#${tag}`)
      return !!domElement.innerText ? domElement.innerText : domElement.value
    }
  }
    if (e.target.id === "titleButton") {
    e.preventDefault()
    const url = document.querySelector("#url")
    const newUrlDiv = document.getElementById('newurl')
    document.getElementById("playGameButton").style.display = ""
    adapter.getTitle(url.value).then(data => {
      if (data === null) {
        titleDiv = e.target.parentElement.querySelector(".title")
        titleDiv.style.display = ""
        e.target.style.display = "none"
      } else {
        titleDiv = e.target.parentElement.querySelector(".title")
        titleDiv.style.display = ""
        titleDiv.children[1].value = data.title
        titleDiv.children[1].disabled = true
        e.target.disabled = true
      }
      e.target.nextElementSibling.style.display = ""
    })
    }
    if (e.target.id=== "previous-game-butt")
      {e.preventDefault();
        if (document.querySelector("#username").value){
      const placeholder = document.getElementById("canvasPlaceholder")
      placeholder.setAttribute('data-username', document.querySelector("#username").value)
      document.getElementById("modalContent").innerHTML = previousGamesModalHTML
      const container = document.querySelector('.container')
      document.querySelector('.row').style.display=""
      container.addEventListener('click', startPreviousGame)
      adapter.getPreviousEssays().then(games => addPreviousGameToDom(games))}
        else {
          document.getElementById("usernamePrompter").innerText = "GAMER ALIAS -- ENTER ME!!!"
          document.getElementById("usernamePrompter").style.color = "yellow"
        }
      }
}

function checkGame(essay, username, url, title){
  console.log("username", username)
  console.log("url", url)
  console.log("title", title)
  if (!username){document.getElementById("usernamePrompter").style.color = "yellow";
  document.getElementById("usernamePrompter").innerText = "Please enter a username!"
  }
  else{
  if (!title){document.getElementById("titleInputTag").style.color = "yellow";
  document.getElementById("titleInputTag").innerText = "Please enter a title!"
  }
  else{
  if (essay.response){
  document.getElementById("theModal").style.display = "none"
  startGame(essay.response, username, url)}
  else {sayInvalidEssay(username, url, title)}
}}}

function sayInvalidEssay(username, url, title){
  document.getElementById("urlInputTag").style.color = "yellow"
  document.getElementById("urlInputTag").innerText = "That essay didn't work! Please try a new one."
}


function addPreviousGameToDom(previousGames) {
  const row = document.querySelector('.row')
  const filtered_games = previousGames.filter(game=> (game.content && (game.title && game.high_score)))
  if (filtered_games.length>0){
  filtered_games.forEach(game => {
    row.innerHTML += previousGameHtml(game)
  })}
  else {row.innerHTML += "<h4>You haven't played any games!"}
}

function previousGameHtml(game){
  const shortenedContent = game.content.slice(0,40)+"..."
  return `<div class="col-sm-4">
            <div class="card bg-gradient-dark mb-3">
              <div class="card-block" style="background-color: black">
                  <h5 id="title" class="card-title">${game.title}</h4>
                  <p class="card-text" style="font-size: .75em">Content: ${shortenedContent}</p>
                  <p data-url="${game.url}" class="card-text" style="font-size: .75em"><a href=${game.url}>${game.url}</a></p>
                  <button data-urlId=${game.id} type="button" class="btn btn-danger">Play ${game.title}</button>
                  <p class="card-text"><small class="text-muted">High Score: ${game.high_score.score} by ${game.high_score_user.username}</small></p>
              </div>
            </div>
          </div>`
}

function startPreviousGame(e) {
  if (e.target.type === "button") {
    const url = e.target.previousElementSibling.innerText
    const username = document.getElementById("canvasPlaceholder").dataset.username
    document.getElementById("theModal").style.display = "none"
    adapter.getPreviousEssay(e.target.dataset.urlid).then(essay => {
      startGame(essay.content, username, url)
    })
  }
}
//
// function showPreviousGames(e) {
//   const row = document.querySelector('.row')
//   const playButton = document.querySelector('#urlBuffForm')
//   console.log(e.target.value)
//   if (e.target.value.length !== 0) {
//     row.style.display = "block"
//     if (playButton) {
//       playButton.disabled = false
//     }
//   } else {
//     row.style.display = 'None'
//     if (playButton) {
//       playButton.disabled = true
//     }
//   }
// }

function populateUserHighScores(userHighScores) {
  userHighScore = document.querySelector('#user-high-score')
  userHighScores.forEach((highScore, index) => {
    userHighScore.innerHTML += `<tr>
                                  <th scope="row">${index + 1}</th>
                                    <td>${highScore.username}</td>
                                    <td>${highScore.title}</td>
                                    <td>${highScore.score}</td>
                                </tr>`
  })


}
