document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  const urlButt = document.querySelector('#url-butt')
  const form = document.querySelector('#form')
  const container = document.querySelector('.container')
  const username = document.querySelector("#username")

  urlButt.addEventListener('click', processUrl)
  form.addEventListener('click', fetchUrl)
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
                  <label>Title:</label>
                  <input type="text" class="form-control" id="title" placeholder="Enter your Title">
                </div>
                <button id="urlBuffForm" type="submit" class="btn btn-primary">Play Secret Laser</button>
                `
  e.target.style.display = "none"
}

function fetchUrl(e) {
  if (e.target.id === "urlBuffForm") {
    e.preventDefault()
    const username = document.querySelector("#username").value
    const url = document.querySelector("#url").value
    const title = document.querySelector("#title").value
    const body = {username: username, user_input: url, title: title}
    adapter.getUrl(body)
    .then(essay => startGame(essay.response, username, url))
  }
}

function addPreviousGameToDom(previousGames) {
  const row = document.querySelector('.row')
  previousGames.forEach(game => {
    row.innerHTML += previousGameHtml(game)
  })
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
