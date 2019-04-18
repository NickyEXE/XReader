document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  document.getElementById("modalContent").innerHTML = welcomePageHTML
  const urlButt = document.querySelector('#url-butt')
  const form = document.querySelector('#form')
  const container = document.querySelector('.container')
  const username = document.querySelector("#username")

  urlButt.addEventListener('click', processUrl)
  form.addEventListener('click', formClickHandler)
  adapter.getPreviousEssays().then(games => addPreviousGameToDom(games))
  container.addEventListener('click', startPreviousGame)
  username.addEventListener('input', showPreviousGames)
  adapter.getUserHighScores().then(userHighScores => populateUserHighScores(userHighScores))

}

function processUrl(e) {
  e.preventDefault()
  const newUrlDiv = document.getElementById('newurl')
  newUrlDiv.innerHTML =
                `<div class="form-group" style=>
                  <label>Url:</label>
                  <input type="text" class="form-control" id="url" placeholder="Enter your Url">
                  <div class="title" style="display: none">
                    <label >Title:</label>
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
    const username = document.querySelector("#username").value
    const url = document.querySelector("#url").innerText
    const title = document.querySelector("#title").innerText
    const body = {username: username, user_input: url, title: title}
    adapter.getUrl(body)
    .then(essay => checkGame(essay, username, url, title))
  }
    if (e.target.id === "titleButton") {
    e.preventDefault()
    const url = document.querySelector("#url")
    const newUrlDiv = document.getElementById('newurl')
    document.getElementById("playGameButton").style.display = ""
    adapter.getTitle(url.innerText).then(data => {
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
    })
  }
}

function checkGame(essay, username, url, title){
  if (essay.response){
  document.getElementById("theModal").style.display = "none"
  startGame(essay.response, username, url)}
  else {sayInvalidEssay(username, url, title)}
}

function sayInvalidEssay(username, url, title){
  console.log("thats an invalid essay!")
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
  const shortenedContent = game.content.slice(0,40)
  return `<div class="col-sm-4">
            <div class="card bg-light mb-3">
              <div class="card-block">
                  <h4 id="title" class="card-title">${game.title}</h4>
                  <p class="card-text">Content: ${shortenedContent}</p>
                  <p id="url" class="card-text">${game.url}</p>
                  <button data-urlId=${game.id} type="button" class="btn btn-primary">Play ${game.title}</button>
                  <p class="card-text"><small class="text-muted">High Score: ${game.high_score.score} by ${game.high_score_user.username}</small></p>
              </div>
            </div>
          </div>`
}

function startPreviousGame(e) {
  if (e.target.type === "button") {
    const url = e.target.previousElementSibling.innerText
    const username = document.querySelector('#username').value
    adapter.getPreviousEssay(e.target.dataset.urlid).then(essay => {
      startGame(essay.content, username, url)
    })
  }
}

function showPreviousGames(e) {
  const row = document.querySelector('.row')
  const playButton = document.querySelector('#urlBuffForm')
  if (e.target.value.length !== 0) {
    row.style.display = ''
    if (playButton) {
      playButton.disabled = false
    }
  } else {
    row.style.display = 'None'
    if (playButton) {
      playButton.disabled = true
    }
  }
}

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
