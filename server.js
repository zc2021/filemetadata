require('dotenv').config()

const cors = require('cors');

const express = require('express');
const app = express();

const multer = require('multer');
const storage = multer.memoryStorage();
const fileLimits = { fileSize: 1000000 };
const upload = multer({ 
  storage: storage, 
  limits: fileLimits }).single('upfile')

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (_req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload, function(req, res) {
  const fileStats = {
    'name': req.file.originalname,
    'type': req.file.mimetype,
    'size': req.file.size
  };
  res.json(fileStats);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
