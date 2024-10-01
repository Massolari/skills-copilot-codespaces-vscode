// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(req.body);

    fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send('Comment added!');
    });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});