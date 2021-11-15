const express = require('express');
const morgan = require('morgan');
const app = express();
bodyParser = require('body-parser'),
uuid = require('uuid');

app.use(bodyParser.json());

let movies = [
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
  res.send('Welcome to myFlix!');
});

app.get('/documentation.html', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});


app.get('/movies', (req, res) => {
  res.json(movies);//return json object containing movies;
});

app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title}));
});
// Return data about a genre (description) by name/title (e.g., “Thriller”).
app.get('/movies/:title/genre', (req, res) => {
  res.send('Successful GET request returning data about a genre.');
});

// Return data about a director (bio, birth year, death year) by name.
app.get('/movies/director/:name', (req, res) => {
  res.send('Successful GET request returning data about a director.');
})

// Allow new users to register.
app.post('/newUser', (req, res) => {
  res.send('Successful POST request user was able to register.');
});

// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
app.post('/newUser/:id/favorites', (req, res) => {
  res.send('Successful POST request movie has been added to favorites.');
});

// PUT Request.

// Allow users to update their user info (username, password, email, date of birth).
app.put('/newUser/:id/info', (req, res) => {
  res.send('Successful PUT request user info updated.');
});

// DELETE Request.

// Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)
app.delete('/newUser/:id/favorites', (req, res) => {
  res.send(
    'Successful DELETE request movie has been deleted from user list of favorites.'
  );
});

// Allow existing users to deregister
app.delete('/newUser', (req, res) => {
  res.send('Successful DELETE request existing user has been deregistered.');
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
