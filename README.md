# Weather App (Electron + Express)

Desktop weather app built with Electron, Express, EJS, and OpenWeatherMap.

## Features

- Search weather by city name
- Shows:
  - Current temperature
  - Weather description
  - Humidity
  - Wind speed
  - Feels-like temperature
- Default city fallback (`Lisbon`) when no query is provided

## Tech Stack

- `Electron` for the desktop shell
- `Express` server for API proxy + rendering
- `EJS` templates for UI
- `Axios` for OpenWeather API requests
- `dotenv` for environment variables

## Requirements

- Node.js 18+ (recommended)
- npm
- OpenWeatherMap API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create/update `.env` in project root:

```env
WEATHER_API_KEY=your_openweather_api_key
PORT=3000
```

`PORT` is optional. Default is `3000`.

## Run

```bash
npm start
```

This starts Electron (`main.js`), which launches the Express server (`index.js`) and loads `http://localhost:3000`.

## Project Structure

```text
.
├── main.js            # Electron entry point
├── index.js           # Express server + weather route
├── views/
│   └── index.ejs      # UI template
├── public/
│   └── styles.css     # Styles
├── assets/
│   └── search.png     # Search icon
├── package.json
└── .env
```

## API Behavior

`GET /` supports:

- `?city=<name>` (example: `?city=Porto`)
- `?lat=<value>&lon=<value>` for coordinate lookup

If neither is provided, it fetches weather for `Lisbon`.

## Notes

- Current script is desktop-first (`npm start` runs Electron).
- There is no separate web-only start script yet.
