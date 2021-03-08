const express = require("express");
const morgan = require('morgan');
const app = express();
const postBank = require('./postBank');

app.use(morgan('dev'));

/*
//if using volleyball

const volleyball = require('volleyball');
app.use(volleyball)
*/

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>Wizard News</title>
      </head>
      <body>
        <ul>
<!-- arrow function shorthand, doesn't need return keyword if function body is one line of code -->
          ${posts.map(post => `<li>${post.title} by ${post.name}</li>`)} 
        </ul>
      </body>
    </html>`;
  
  res.send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
