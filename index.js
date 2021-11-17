const express = require('express');
const morgan = require('morgan');
const app = express();
bodyParser = require('body-parser'),
uuid = require('uuid');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/myFLixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true });

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

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Allow new users to register.
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// PUT Request.

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// DELETE Request.

// Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)
app.delete('/newUser/:id/favorites', (req, res) => {
  res.send(
    'Successful DELETE request movie has been deleted from user list of favorites.'
  );
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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
