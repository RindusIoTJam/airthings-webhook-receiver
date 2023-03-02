const express = require('express')
const app = express()

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send("OK")
})

app.post('/', (req, res) => {
  const bodyContent = req.body
  res.send("OK")
  console.log(req.body)
})

var server = app.listen(3000, () => {
  console.log(`Listening at http://${server.address().address}:${server.address().port}`)
})