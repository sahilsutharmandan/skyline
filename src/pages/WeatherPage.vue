<template>
  <div class="page">
    <div class="container">
      <h1 class="page-title">Weather Dashboard</h1>
      <div class="weather-layout">
        <SavedCitiesSidebar @load="loadCity" />
        <div class="weather-main">
          <CitySearch @select="loadCity" />

          <div v-if="loading" class="loading">Loading weather data...</div>

          <template v-if="weather && !loading">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap">
              <h2>{{ cityName }}</h2>
              <div class="unit-toggle">
                <button :class="{ active: unit === 'C' }" @click="settings.setUnit('C')">
                  &deg;C
                </button>
                <button :class="{ active: unit === 'F' }" @click="settings.setUnit('F')">
                  &deg;F
                </button>
              </div>
              <button
                v-if="!isSaved"
                class="btn btn-primary"
                @click="saveCurrentCity"
              >
                Save City
              </button>
            </div>

            <WeatherCurrent :data="weather.current" :unit="unit" />
            <HourlyChart :hourly="weather.hourly" :unit="unit" />
            <DailyCards :daily="weather.daily" :unit="unit" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '../stores/settings.js'
import { useSavedCitiesStore } from '../stores/savedCities.js'
import CitySearch from '../components/CitySearch.vue'
import SavedCitiesSidebar from '../components/SavedCitiesSidebar.vue'
import WeatherCurrent from '../components/WeatherCurrent.vue'
import HourlyChart from '../components/HourlyChart.vue'
import DailyCards from '../components/DailyCards.vue'

const route = useRoute()
const settings = useSettingsStore()
const savedCities = useSavedCitiesStore()

const weather = ref(null)
const loading = ref(false)
const cityName = ref('')
const currentLat = ref(null)
const currentLon = ref(null)

const unit = computed(() => settings.unit)

const isSaved = computed(() => {
  if (currentLat.value === null) return false
  return savedCities.isSaved(currentLat.value, currentLon.value)
})

async function fetchWeather(lat, lon, tz) {
  loading.value = true
  try {
    const timezone = tz || 'auto'
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(timezone)}`
    )
    weather.value = await res.json()
    loading.value = false
  } catch {
    weather.value = null
  }
}

async function loadCity(city) {
  cityName.value = city.name
  currentLat.value = city.lat
  currentLon.value = city.lon
  await fetchWeather(city.lat, city.lon, city.timezone)
}

function saveCurrentCity() {
  if (currentLat.value !== null) {
    savedCities.addCity({
      name: cityName.value,
      lat: currentLat.value,
      lon: currentLon.value
    })
  }
}

onMounted(async () => {
  const city = route.query.city
  const lat = route.query.lat
  const lon = route.query.lon
  if (lat && lon) {
    cityName.value = city || 'Unknown'
    currentLat.value = parseFloat(lat)
    currentLon.value = parseFloat(lon)
    await fetchWeather(lat, lon)
  } else if (city) {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      )
      const data = await res.json()
      if (data.results && data.results.length) {
        const r = data.results[0]
        cityName.value = r.name
        currentLat.value = r.latitude
        currentLon.value = r.longitude
        await fetchWeather(r.latitude, r.longitude, r.timezone)
      }
    } catch {
      /* skip */
    }
  }
})
</script>
