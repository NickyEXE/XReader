const welcomePageHTML = `<div id="welcomePage"></div>
  <h1> Welcome to XReader</h1>
  <h5> THE EXTREME READER FOR GAMERS </h5>

  <div class="flex-container">
    <div class="flex-item">
      <form id="form">
        <div class="form-group" style=>
          <label>Username:</label>
          <input type="text" class="form-control" id="username" placeholder="Enter your Username">
          <div id="newurl"></div>
        </div>
        <button id="url-butt" type="button" class="btn btn-warning">Create a New Essay</button>
        <button id="previous-game-butt" type="button" class="btn btn-danger">Find a Previously Played Essay</button>
      </form>
    </div>
      <div class="flex-item" style="background-color: black;margin-left: 30px;">
        <center><h6 id="tableHead" style="padding-top: 5px";
> User High Scores</h4></center>
        <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Title</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody id="user-high-score">
            </tbody>
          </table>
    </div>
  </div>`

  const endGameModalHTML = `<center><h2>You crashed!</h2>
  <iframe src="https://giphy.com/embed/2ik2ANNpA4Xug" width="480" height="268" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/2ik2ANNpA4Xug"></a></p>
  <h5>Reading over.</h5>
  <!-- End of Dynamic Section -->
  <button type="button" class="btn btn-primary center">Reset score and continue reading?</button></center>`


  const previousGamesModalHTML = `<h2> Previously Played Urls</h2>
      <div class="container">
        <div class="row" style="display:none">
        </div>
        </div>
      </div>`
