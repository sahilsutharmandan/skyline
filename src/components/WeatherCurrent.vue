<template>
  <div class="card current-weather" v-if="data">
    <div class="current-icon">{{ weatherInfo.emoji }}</div>
    <div>
      <div class="current-temp">{{ displayTemp }}&deg;{{ unit }}</div>
      <div class="current-label">{{ weatherInfo.label }}</div>
      <div class="current-details">
        <div v-for="d in details" :key="d.label" class="current-detail">
          {{ d.label }}: <strong>{{ d.value }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import weatherCodes from '../data/weather-codes.js'

const props = defineProps({
  data: { type: Object, default: null },
  unit: { type: String, default: 'C' }
})

const weatherInfo = computed(() => {
  if (!props.data) return { label: '', emoji: '' }
  return weatherCodes[props.data.weather_code] || { label: 'Unknown', emoji: '❓' }
})

const displayTemp = computed(() => {
  if (!props.data) return ''
  const temp = props.data.temperature_2m
  if (props.unit === 'F') return Math.round(temp * 9 / 5 + 32)
  return Math.round(temp)
})

const details = computed(() => {
  if (!props.data) return []
  return [
    { label: 'Feels like', value: `${Math.round(props.data.apparent_temperature)}°${props.unit}` },
    { label: 'Humidity', value: `${props.data.relative_humidity_2m}%` },
    { label: 'Wind', value: `${props.data.wind_speed_10m} km/h` }
  ]
})
</script>
