<template>
  <div class="city-search">
    <input
      v-model="query"
      @input="search"
      type="text"
      placeholder="Search for a city..."
      class="input search-input"
    />
    <div v-if="results.length" class="search-results">
      <div
        v-for="r in results"
        :key="r.id"
        class="search-item"
        @click="select(r)"
      >
        <div>{{ r.name }}</div>
        <div class="search-country">{{ r.country }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['select'])

const query = ref('')
const results = ref([])
let debounceTimer = null

function search() {
  clearTimeout(debounceTimer)
  if (query.value.length < 2) {
    results.value = []
    return
  }
  debounceTimer = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.value)}&count=5`
      )
      const data = await res.json()
      results.value = data.results || []
    } catch {
      results.value = []
    }
  }, 300)
}

function select(city) {
  results.value = []
  query.value = city.name
  emit('select', {
    name: city.name,
    country: city.country,
    lat: city.latitude,
    lon: city.longitude,
    timezone: city.timezone
  })
}
</script>
