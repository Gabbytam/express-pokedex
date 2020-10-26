const express = require('express');
const router = express.Router();
const db= require('../models');
//const { default: Axios } = require('axios');
const axios= require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(foundMons=> {
    //console.log('here are the users: ', foundMons);
    res.render('favorite', {favList: foundMons});
  })
  
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {name: req.body.name}
  })
  .then(([foundOrCreatedMon, created])=> {
    console.log('the pokemon existed', !created);
    //console.log('here is what was created: ', foundOrCreatedMon);
    res.redirect('/pokemon');
  })
});

router.get('/:id', (req, res)=> {
  //req.params.id is where the id of the pokemon (from the URL) is stored
  //that id number is attached to the pokemon name through the database in SQL
  //then that info can be passed to the axios.get URL
  db.pokemon.findOne({
    where: {id: req.params.id}
  })
  .then(foundMon=> {
    //console.log('heres the pokemon attached to selected id', foundMon);
    console.log(foundMon.name);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${foundMon.name}`)
    .then(response=> {
      //res.send(response.data);
      res.render('show', {monId: req.params.id, monName: foundMon.name, monData: response.data});
    })
    .catch(err=> {
      console.log('axios.then error: ', err);
    })
  })
  .catch(error=> {
    console.log('db.then error: ', error);
  })
})

module.exports = router;

//DELETE CODE IF NEEDED
  // db.pokemon.destroy({
  //   where: {name: 'req.body.name'}
  // })
  // .then(numDeleted=> {
  //   console.log('deleted this row');
  // })
  // res.send(req.body);

  //info to get: 
  //moves --> move --> name
    //moves is an array of objects, inside those objects are move --> name
  //images: sprites --> other -->  official-dafault --> front_default

