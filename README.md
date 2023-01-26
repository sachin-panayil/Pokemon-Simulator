## Assignment 3
### Due Date: 11/11/22 - 5:00pm EST

*Assignment deadlines are strictly enforced, please do try to hand in your assignments on time, and I will honor your commitment by grading them and giving feedback in a timely manner. I do understand that sometimes there may be emergencies that we need to attend to. Please do reach out to me as soon as possible if you know you won't be able to make a deadline.*

---

## Assignment Description

For this assignment, we will mostly be working on the backend with Node/ExpressJS. There will be some HTML code that gets rendered in the browser, but for the most part these HTML templates will be provided for you and you will mostly be working on getting the right data populated for the HTML pages that will get rendered for the various `GET` requests.

You will be working with the Pokemon API: `https://pokeapi.co/` - which is the theme of this assignment. We will be implementing ExpressJS API routes that will help us handle Pokemon data, everything from fetching info about the Pokemon to storing data about our Pokemon team, and performing various CRUD operations to it.

There will be some template code provided for you to start with, along with some NPM packages that are crucial to completing this assignment. As always these are just starter code, feel free to bring in other NPM libraries as you see fit. As long as the requirements in the instructions below are met, feel free to take any approach you see fit.

---

## Instructions

There will be template code provided for you to get started with. The requirements for this assignment will be written in the Agile story format that we've been working with. You will receive points for requirements met, please feel free to reach out on Slack if you feel any of the requirements below are unclear.

You will also need to use [Postman](https://www.postman.com/downloads/) for this assignment to help you do certain HTTP requests (PUT, POST, DELETE) that can't be easily achieve through the browser, but feel free to use any other tools you see fit to test out these requests.

### Files/folders to note:

`server.js` - This is your main server file that will run the ExpressJS server. Set by default as part of the run script in `package.json`. I will run the service as `npm run start` and this should run the `server.js` file as an ExpressJS server.

`EXAMPLE.md` - Example/screenshots of how each of the API endpoints will be tested, expected behavior, edge cases to consider etc...

---

You will be implementing the below API routes on your ExpressJS server for different requests. These request will basically be used to manage Pokemon data, specifically catching/storing/releasing Pokemon on your team (max 6). Each of these 5 requirements will be evenly pointed at 20% each. With an additional 10% extra credit at the end for Error Handling.

### GET Requests

These `GET` requests are the only requests where we will need to render HTML as part of our response. `POST,PUT,DELETE` below will return JSON data.

Getting Pokemon data from PokeAPI

```text
GET /pokemon/:id

AS A USER when I visit the route /pokemon/:id in my browser
AND I type in an :id as part of the parameter
WHERE :id can either be the id or name of the Pokemon
I SHOULD see page rendered with the Pokemon's name, id, and a sprite image
WHERE the sprite image data is retrieved from https://pokeapi.co/api/v2/pokemon/<:id> API
```
- Your ExpressJS route handler for this should fetch data from `https://pokeapi.co/api/v2/pokemon/<:id>`
- In the response from Pokeapi, you should extract the necessary data from the large response payload
- Somewhere in the response payload from Pokeapi are also sprite images (.png) links. Feel free to use any (preferably the default one).
- This is simply used to view the Pokemon data/sprite image, regardless of if the Pokemon is currently on your team or not.

Getting your current team info

```text
GET /team

AS A USER when I visit /team in my browser
I SHOULD be able to see a list of my current Pokemon team rendered as HTML
AND I should see a maximum of 6 Pokemon on my team at any given time
AND I should see for each of my Pokemon on my team their :teamPokemonId, name, picture.
```

- By default, when you first start up the server, your team will be empty.
- Adding and releasing Pokemon will be handled by the `POST, PUT, DELETE` routes below.
- You can store this team in memory or if you want it to persist, write to a `.json` file like the lecture examples.

### POST Requests

```text
POST /catch

AS A USER when I POST JSON data with the below format to this endpoint
I SHOULD be able to "catch" Pokemon into my team
AND I SHOULD ADD onto the existing team
AND I SHOULD get a JSON response of my current team

JSON Data Format:
{ "catch": [ <:id>, <:id>, ... ] }
```
- The JSON payload in the request should be attached to the `catch` field.
- The value of the `catch` field is an array of Pokemon `:id` - where it's either the id # of the pokemon or the name
- The length of `catch` should be capped at length 6, since we can't have more than 6 Pokemon on our team.
- But when we actually add to the team, we should check if our current team (in JS memory) is full.

### PUT Request

```text
PUT /catch

AS A USER when I PUT JSON data with the below format to this endpoint
I SHOULD be able to "catch" Pokemon into my team
AND I SHOULD REPLACE onto the existing team
AND I SHOULD get a JSON response of my current team

JSON Data Format:
{ "catch": [ <:id>, <:id>, ... ] }
```
- This is similar to the POST request above, except it will replace the current team entirely.
- If you supply more than 6 Pokemon into the `catch` field, take the first 6 Pokemon and set it to the team.

### DELETE Request
```text
DELETE /release/:teamPokemonId

AS A USER When I send a DELETE request to this endpoint
WHERE :teamPokemonId is a unique ID for a Pokemon currently on my team
I SHOULD see that Pokemon released from my team
AND I SHOULD see an updated JSON response of the Pokemon on my team.
```
- Note that `:teamPokemonId` is a UNIQUE identifier of a Pokemon on your team. This is not to be confused with the `id` we get back from PokeAPI.
- You can have the same Pokemon captured to your team but you need a unique way to identify the same Pokemon on your team. (i.e If I captured 6 Dittos, I need to tell them apart)
- It's up to you to figure out how to generate a unique ID for each Pokemon captured to your team (using the UUID NPM package for example).

### Error Handling (Extra Credit - 10%)
- Although it's nice to have error handling for all these requests, for simplicity of the assignment, you are NOT required to implement error handling for all these requests.
- You may wish to do so if you'd like for an additional 10% extra credit. Consider some error scenarios below to handle:
  - Consider for `/pokemon/:id` what would happen if an invalid `:id` (either id or name) is passed?
  - For adding/removing Pokemon to team, what happens when we try to add if the team is full, or delete a Pokemon from the team that is not there.