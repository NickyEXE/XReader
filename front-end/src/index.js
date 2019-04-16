document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  const urlButt = document.querySelector('#url-butt')
  const form = document.querySelector('#form')
  const container = document.querySelector('.container')

  urlButt.addEventListener('click', processUrl)
  form.addEventListener('click', fetchUrl)
  adapter.getPreviousEssays().then(games => addPreviousGameToDom(games))
  container.addEventListener('click', startPreviousGame)

}

function processUrl(e) {
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
    body = {username: username, user_input: url}
    adapter.getUrl(body)
    .then(essay => startGame(essay.response, username, url))
  }
}

function addPreviousGameToDom(previousGames) {
  row = document.querySelector('.row')
  previousGames.forEach(game => {
    row.innerHTML += previousGameHtml(game)
  })
}

function previousGameHtml(game){
  shortenedContent = game.content.slice(0,40)
  return `<div class="col-sm-3">
            <div class="card bg-light mb-3">
              <div class="card-block">
                  <h4 id="title" class="card-title">${game.title}</h4>
                  <p class="card-text">Content: ${shortenedContent}</p>
                  <p id="url" class="card-text">${game.url}</p>
                  <button data-urlId=${game.id} type="button" class="btn btn-primary">Play Title</button>
                  <p class="card-text"><small class="text-muted">High Score: ${game.high_score.score} by ${game.high_score_user.username}</small></p>
              </div>
            </div>
          </div>`
}

function startPreviousGame(e) {
  if (e.target.type === "button") {
    url = e.target.previousElementSibling.innerText
    username = document.querySelector('#username').value
    adapter.getPreviousEssay(e.target.dataset.urlid).then(essay => {
      startGame(essay.content, username, url)
    })
  }
}
