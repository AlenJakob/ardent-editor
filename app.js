const http = require("http");
const fs = require('fs');
const cors = require('cors');
const express = require("express");
const app = express();

app.use(cors());
app.listen(3000, () => console.log("server running..."));


app.use(express.json({ limit: '1mb' }))

// save data
app.post('/', (req, res) => {
  console.log(req.body, "here")
  saveFile(req.body)
  res.send("Welcome !")
})

app.get('/file',  (req, res) => {
  const rawData = fs.readFileSync("./test-file.json",'utf8')
  res.json(rawData)
})


function saveFile(file) {
  fs.writeFileSync("./test-file.json", JSON.stringify(file))
}


