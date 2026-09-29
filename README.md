# Skyline

A travel and weather dashboard built with Vue 3, Vite, Pinia, Chart.js, and SCSS.

## Features

- **Country Explorer** - Browse 30 countries with search, region filtering, and sortable table
- **Country Detail** - View country info, related countries, and built-in currency converter
- **Weather Dashboard** - Real-time weather with current conditions, hourly chart, and 7-day forecast
- **Saved Cities** - Save and quickly access weather for favorite cities
- **Dark/Light Theme** - Toggle between themes with localStorage persistence
- **Responsive** - Works on desktop and mobile

## APIs Used

- [Open-Meteo](https://open-meteo.com/) - Weather forecasts and geocoding (no API key required)
- [Frankfurter](https://frankfurter.dev/) - Currency exchange rates (no API key required)
- [FlagCDN](https://flagcdn.com/) - Country flag images

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Tech Stack

- Vue 3 (Composition API with `<script setup>`)
- Vite
- Pinia (state management)
- Vue Router (hash history)
- Chart.js + vue-chartjs
- SCSS with CSS custom properties for theming
