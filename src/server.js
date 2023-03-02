const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.disable('x-powered-by')
app.use(bodyParser.json())

app.get('/hook', (req, res) => {
  res.send("OK")
})

app.post('/hook', (req, res) => {
  console.log(req.body)
  res.send("OK")
})

var server = app.listen(9883, () => {
  console.log(`Listening at http://${server.address().address}:${server.address().port}`)
})