
document.addEventListener("DOMContentLoaded", domLoadFunctions)
baseURL = `http://localhost:3000`

function domLoadFunctions(){
<<<<<<< HEAD
  startGame()
=======
  // startGame()
  const urlButt = document.querySelector('#url-butt')
  const form = document.querySelector('#form')

  urlButt.addEventListener('click', processUrl)
  form.addEventListener('click', fetchUrl)

}

function processUrl(e) {
  // console.log(e.target)
  const form = document.querySelector('#form')
  form.innerHTML +=
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
    userInput = document.querySelector("#url").value
    console.log(username, userInput)

    fetch(`${baseURL}/new`,  {
      method: 'POST',
      body: JSON.stringify({username: username, user_input: userInput}),
      headers:{
      'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => startGame(json))
  }
>>>>>>> backend
}
