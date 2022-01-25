const path = require('path');
const express = require('express');

const multer = require('multer');
const storage = multer.memoryStorage();
const fileLimits = { fileSize: 1000000 };
const upload = multer({ 
  storage: storage, 
  limits: fileLimits }).single('upfile')

const recordRoutes = express.Router();

recordRoutes.route('/').get(function (_req, res) {
  res.sendFile(path.dirname(__dirname) + '/views/index.html');
});

recordRoutes.route('/api/fileanalyse').post(upload, function(req, res) {
  const fileStats = {
    'name': req.file.originalname,
    'type': req.file.mimetype,
    'size': req.file.size
  };
  res.json(fileStats);
});

module.exports = recordRoutes;