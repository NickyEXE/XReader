baseURL = `http://localhost:3000`

const adapter = {
  postScore: (username,score) => {
    return fetch(`${baseURL}/scores/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, score: score, url: url})
    })
    .then(res => res.json())
  }
}
