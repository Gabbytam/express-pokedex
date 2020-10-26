require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
//const db= require('./models');

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// db.pokemon
//   .create({
//     name: "ekans",
//     id: 2
//   })
//   .then(function (poke) {
//     console.log("Created: ", poke.name);
//   });

// db.pokemon.findAll().then(function (poke) {
//   console.log("Found: ", poke.name);
// });


// GET / - main index of site
app.get('/', function(req, res) {
  const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=150';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    const pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
