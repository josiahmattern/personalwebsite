const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Use the port from the environment (or default to 3000 locally)
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Main routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// New route to list all files in /public
app.get('/blog', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/blogposts');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }

    const fileLinks = files
      .map(file => `<li><a href="/blogposts/${file}">${file}</a></li>`)
      .join('');

    res.send(`
      <html>
        <head>
          <style>
            body {
              margin: 0;
              height: 100vh;
              flex-direction: column;
              padding: 40px 40px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }

            ul {
              list-style-type: none;
              padding: 0;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <h1>Blog posts</h1>
          <ul>${fileLinks}</ul>
        </body>
      </html>
    `);
  });
});

// Catch-all 404 for any other path
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running - listening on port ${PORT}!`);
});
