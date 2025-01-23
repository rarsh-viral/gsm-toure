const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  res.json({ url: filePath });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
