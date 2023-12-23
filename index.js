const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000; // You can change the port as needed

const targetDir = 'uploads';

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const randomFilename = `${Date.now()}${extension}`;
    cb(null, randomFilename);
  },
});

const upload = multer({ storage: storage });

// Set up a route for file uploads
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const uploadedFile = req.file;
    const filePath = path.join(targetDir, uploadedFile.filename);

    const responseData = {
      fileName: `https://upload.inferconautomation.com/${filePath}`, // Update with your actual domain
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload the file.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
