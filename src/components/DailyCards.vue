<template>
  <div v-if="daily">
    <h3>7-Day Forecast</h3>
    <div class="daily-cards">
      <div v-for="(day, i) in days" :key="i" class="card daily-card">
        <div class="daily-day">{{ day.name }}</div>
        <div class="daily-icon">{{ day.emoji }}</div>
        <div class="daily-temps">
          <span class="daily-high">{{ day.high }}&deg;</span>
          <span class="daily-low"> / {{ day.low }}&deg;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import weatherCodes from '../data/weather-codes.js'

const props = defineProps({
  daily: { type: Object, default: null },
  unit: { type: String, default: 'C' }
})

function convertTemp(val) {
  if (props.unit === 'F') return Math.round(val * 9 / 5 + 32)
  return Math.round(val)
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const days = computed(() => {
  if (!props.daily) return []
  return props.daily.time.map((t, i) => {
    const d = new Date(t)
    const code = props.daily.weather_code[i]
    const info = weatherCodes[code] || { label: 'Unknown', emoji: '❓' }
    return {
      name: dayNames[d.getDay()],
      emoji: info.emoji,
      high: convertTemp(props.daily.temperature_2m_min[i]),
      low: convertTemp(props.daily.temperature_2m_max[i])
    }
  })
})
</script>
