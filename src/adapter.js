baseURL = `http://localhost:3000`
headers = {
  "Content-Type": "application/json"
}

const adapter = {
  postScore: (username,score,url) => {
    return fetch(`${baseURL}/scores/create`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({username: username, score: score, url: url})
    })
    .then(res => res.json())
  },
  getPreviousEssays: () => {
    return fetch(`${baseURL}/essays`).then(res => res.json())
  },
  getPreviousEssay: (id) => {
    return fetch(`${baseURL}/essays/${id}`).then(res => res.json())
  }, 
  getUrl: (body) => {
    return fetch(`${baseURL}/new`,  {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers
    })
    .then(res => res.json())
  },
  getUserHighScores: () => {
    return fetch(`${baseURL}/scores/highscore`).then(res => res.json())
  }
}
