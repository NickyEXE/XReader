document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  const urlButt = document.querySelector('#url-butt')
  const form = document.querySelector('#form')
  const container = document.querySelector('.container')

  urlButt.addEventListener('click', processUrl)
  form.addEventListener('click', fetchUrl)
  fetchPreviousGames()
  container.addEventListener('click', startPreviousGame)

}

function processUrl(e) {
  // console.log(e.target)
  e.preventDefault()
  const newUrlDiv = document.getElementById('newurl')
  newUrlDiv.innerHTML =
                `<div class="form-group" style=>
                  <label>Url:</label>
                  <input type="text" class="form-control" id="url" placeholder="Enter your Url">
                </div>
                <button id="urlBuffForm" type="submit" class="btn btn-primary">Play Secret Laser</button>
                `
}

function fetchUrl(e) {
  if (e.target.id === "urlBuffForm") {
    e.preventDefault()
    username = document.querySelector("#username").value
    url = document.querySelector("#url").value

    fetch(`${baseURL}/new`,  {
      method: 'POST',
      body: JSON.stringify({username: username, user_input: url}),
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(essay => startGame(essay, username, url))
  }
}

function fetchPreviousGames() {
  fetch(`${baseURL}/essays`)
  .then(res => res.json())
  .then(games => addPreviousGameToDom(games))
}

function addPreviousGameToDom(previousGames) {
  row = document.querySelector('.row')
  previousGames.forEach(game => {
    row.innerHTML += previousGameHtml(game)
  })
}

function previousGameHtml(game){
  return `<div class="col-sm-3">
            <div class="card bg-light mb-3">
              <div class="card-block">
                  <h4 id="title" class="card-title">${game.title}</h4>
                  <p class="card-text">Placeholder for Preview.</p>
                  <p id="url" class="card-text">${game.url}</p>
                  <button type="button" class="btn btn-primary">Play Title</button>
                  <p class="card-text"><small class="text-muted">High Score: ${game.high_score.score} by ${game.high_score_user.username}</small></p>
              </div>
            </div>
          </div>`
}

function startPreviousGame(e) {
  if (e.target.type === "button") {
    // url = e.target.previousElementSibling.innerText
    // username = document.querySelector('#username')
    // essay = ["Fix", "This"]
    // startGame(essay, username, url)
    console.log('start game')
  }
}
