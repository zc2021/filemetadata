const express = require('express');

const multer = require('multer');
const storage = multer.memoryStorage();
const fileLimits = { fileSize: 1000000 };
const upload = multer({ 
  storage: storage, 
  limits: fileLimits,
  fileFilter: function (_req, file, next) {
    const fileType = file.mimetype;
    if (fileType.includes('application')) {
      next(null, false);
    } else {
      next(null, true);
    }
  } }).single('upfile');

const recordRoutes = express.Router();

recordRoutes.route('/api/fileanalyse').post(upload, function (req, res) {
  try {
    const fileStats = {
      'name': req.file.originalname,
      'type': req.file.mimetype,
      'size': req.file.size
    };
    res.status(200).json(fileStats);
   } catch {
    res.status(400).json({ error: 'upload failed' })
   }
});

recordRoutes.route('/api').get(function (req, res) {
  const endpoints = [];
  const host = isEmpty(req.baseUrl) ? req.hostname : req.baseUrl;
  const body = {
    'host': host,
  };
  res.status(200).json(body);
});

module.exports = recordRoutes;

// helpers
function isEmpty(str) {
  return str.length === 0;
}