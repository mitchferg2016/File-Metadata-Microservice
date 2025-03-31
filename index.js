require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the form page
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start server
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
