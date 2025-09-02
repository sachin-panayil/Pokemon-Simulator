# Pokemon Team API

A simple Express.js API for managing a Pokemon team using the PokeAPI.

## Features

- View individual Pokemon details
- Manage a team of up to 6 Pokemon
- Catch Pokemon and add them to your team
- Release Pokemon from your team

## Installation

```bash
npm install
npm start
```

The server will start on port 3000.

## API Endpoints

### GET /pokemon/:id
View a Pokemon's details (name, ID, and sprite image).
- **Parameter:** `id` - Pokemon name or ID number
- **Example:** `GET /pokemon/charmander` or `GET /pokemon/4`

### GET /team
View your current Pokemon team as HTML.

### POST /catch
Add Pokemon to your existing team (up to 6 total).
- **Body:** `{ "catch": ["pokemon1", "pokemon2", ...] }`
- **Example:** `{ "catch": ["pikachu", "charmander"] }`

### PUT /catch
Replace your entire team with new Pokemon (up to 6).
- **Body:** `{ "catch": ["pokemon1", "pokemon2", ...] }`

### DELETE /release/:teamPokemonId
Release a Pokemon from your team using their team ID.
- **Parameter:** `teamPokemonId` - The unique team identifier for the Pokemon

## Dependencies

- Express.js
- node-fetch
- uuid
- nodemon (development)

## Notes

- Team is limited to 6 Pokemon maximum
- Each Pokemon gets a unique team ID when caught
- Data is stored in memory and resets when server restarts
