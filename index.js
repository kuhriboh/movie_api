const express = require('express');
const morgan = require('morgan');
const app = express();

let topMovies = [
  {
    title: 'Neon Genesis Evangelion: The End of Evangelion ',
    director: 'Hideaki Anno'
  },
  {
    title: 'Akira',
    director: 'Katsuhiro Otomo'
  },
  {
    title: 'Summer Wars',
    director: 'Mamoru Hosoda'
  },
  {
    title:'Perfect Blue',
    director:'Satoshi Kon'
  },
  {
    title:'Ghost In The Shell',
    director:'Mamoru Oshii'
  },
  {
    title:'Spirited Away',
    director:'Hayao Miyazaki'
  },
  {
    title:'Sword of the Stranger',
    director:'Masahiro Andô'
  },
  {
    title:'Ninja Scroll',
    director:'Yoshiaki Kawajiri'
  },
  {
    title:'Vampire Hunter D: Bloodlust',
    director:'Yoshiaki Kawajiri'
  },
  {
    title:'Paprika',
    director:'Satoshi Kon'
  },
];

app.use (morgan('common')); //log all request on terminal
app.use(express.static('public'));// serve all static file in public folder


app.get('/', (req, res) => {
  res.send('Welcome to my top 10 favorite movies list!');//respond to index route
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });//respond through express.static
});

app.get('/Movies', (req, res) => {
  res.json(topMovies);//return json object containing movies
});
// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
