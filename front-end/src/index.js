document.addEventListener("DOMContentLoaded", domLoadFunctions)

function domLoadFunctions(){
  const urlButt = document.querySelector('#url-butt')
  const form = document.querySelector('#form')

  urlButt.addEventListener('click', processUrl)
  form.addEventListener('click', fetchUrl)

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
