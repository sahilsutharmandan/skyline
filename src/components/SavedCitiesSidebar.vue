<template>
  <div class="sidebar">
    <div class="card saved-cities">
      <h3>Saved Cities</h3>
      <ul v-if="cities.length" class="saved-list">
        <li v-for="(city, i) in cities" :key="`${city.lat},${city.lon}`">
          <button class="saved-city-btn" @click="$emit('load', city)">
            {{ city.name }}
          </button>
          <button class="btn btn-danger" @click="store.removeCity(i)">
            Remove
          </button>
        </li>
      </ul>
      <p v-else class="empty-msg">No saved cities yet.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSavedCitiesStore } from '../stores/savedCities.js'

defineEmits(['load'])

const store = useSavedCitiesStore()

const cities = computed(() =>
  [...store.cities].sort((a, b) => a.name.localeCompare(b.name))
)
</script>
