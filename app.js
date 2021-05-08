
const fs = require('fs');
const cors = require('cors');
const express = require("express");
const app = express();

app.use(cors());
app.listen(3000, () => console.log("server running..."));


app.use(express.json({ limit: '1mb' }))

// save data
app.post('/', (req, res) => {
  saveFile(req.body)
})

app.get('/file', (req, res) => {
  const path = './test-file.json'
  // test if file exist
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      console.error(err)
      return
    }
    const rawData = fs.readFileSync("./test-file.json", 'utf8')
    res.json(rawData)
    //file exists
  })
})


function saveFile(file) {
  fs.writeFileSync("./test-file.json", JSON.stringify(file))
}


