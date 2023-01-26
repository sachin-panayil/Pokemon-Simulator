import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000; 
app.use(express.json()) 

let TEAM = [];
let counter = -1; //gives each pokemon unique identifier

app.get('/pokemon/:id', async (req, res) => {

  let name, sprite, id, html;
  const pokemonID = req.params.id;
  
  const fetchURL = 'https://pokeapi.co/api/v2/pokemon/' + pokemonID;

  const rawData = await fetch(fetchURL);
  const data = await rawData.json();

  if (data === undefined) {
    res.sendStatus(404);
  } else {
      name = data.name;
      sprite = '<img src=' + data.sprites.front_default + '>';
      id = data.id;
      html = sprite + "<br/>Name: " + name + "<br/>ID: " + id
      res.send(html)    
    }
})

app.get('/team', (req, res) => {

  let html = ""

  if (TEAM.length === 0) {
    res.send('<h1>Your Team Is Empty!<h1>')
  } else {
      for(let i = 0; i < TEAM.length; i++) {
      html += '<img src=' + TEAM[i].sprite + '>' + "<br/>Name: " + TEAM[i].name + "<br/>ID: " + TEAM[i].id + "<br/>" + "TeamID: " + TEAM[i].teamID + "<br/>"
    }
  res.send(html)
  }
})

app.post('/catch',  async (req, res) => {

  const pokemonToCatch = req.body.catch;

  for(let i = 0; i < pokemonToCatch.length; i++) {

    if(TEAM.length < 6) {
      counter++;
      const fetchURL = 'https://pokeapi.co/api/v2/pokemon/' + pokemonToCatch[i];

      const rawData = await fetch(fetchURL);
      const data = await rawData.json();

      TEAM.push({
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        teamID: counter
      })
    }
  }
  res.send(TEAM);
})

app.put('/catch', async (req, res) => {

  const pokemonToCatch = req.body.catch;
  TEAM = [];
  counter = 0;

  for(let i = 0; i < pokemonToCatch.length; i++) {

    if(TEAM.length < 6) {
      counter++;
      const fetchURL = 'https://pokeapi.co/api/v2/pokemon/' + pokemonToCatch[i];

      const rawData = await fetch(fetchURL);
      const data = await rawData.json();

      TEAM.push({
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        teamID: counter
      })
    }
  }
  res.send(TEAM);
})


app.delete('/release/:teamPokemonId', (req, res) => {

  const teamID = req.params.teamPokemonId;

  for(let i = 0; i < TEAM.length; i++) {
    if(teamID == TEAM[i].teamID) {
      let indexForRemoval = i
      TEAM.splice(indexForRemoval, 1)
    }
  }
  res.send(TEAM)
})

app.listen(port, () => {
  console.log('Server started at port:', port);
})
