const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');

const app = express();

// Use the port from the environment (or default to 3000 locally)
const PORT = process.env.PORT || 3000;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Main routes
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// New route to list all files in /public
app.get('/blog', (_req, res) => {
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
          <link href="/styles.css" rel="stylesheet" />
        </head>
        <body class="blog">
          <h1>blog posts</h1>
					<p>coming soon...</p>
          <!-- <ul>${fileLinks}</ul> -->
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
