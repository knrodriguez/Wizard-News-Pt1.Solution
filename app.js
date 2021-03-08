const express = require("express");
const morgan = require('morgan');
const app = express();
const postBank = require('./postBank');
const timeAgo = require('node-time-ago');

app.use(morgan('dev'));

/*
//if using volleyball

const volleyball = require('volleyball');
app.use(volleyball)
*/

//__dirname is an environment variable that returns the 
//absolute path of the directory containing the file __dirname is in
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
        ${posts.map(post => `
          <div class='news-item'>
            <p>
              <span class="news-position">${post.id}. ▲</span>${post.title}
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${timeAgo(post.date)}
            </small>
          </div>`
        ).join('')}
      </div>
    </body>
  </html>`;
  
  res.send(html);
});

app.get('/posts/:id', (req,res,next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if(!post.id){
    const error = new Error('Page Not Found')
    next(error);
  }
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
             ${post.title}
              <small>(by ${post.name})</small>
            </p>
            <p>${post.content}</p>
          </div>
      </div>
    </body>
  </html>`;

  res.send(html);
})

app.use((err,req,res,next) => {
  console.error(err.stack);
  res.send(`<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <p>Error: Page Not Found, Sorry!</p>
    </body>
  </html>`);
})

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
