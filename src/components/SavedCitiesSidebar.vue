<template>
  <div class="sidebar">
    <div class="card saved-cities">
      <h3>Saved Cities</h3>
      <ul v-if="store.cities.length" class="saved-list">
        <li v-for="(city, i) in store.cities" :key="i">
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
import { useSavedCitiesStore } from '../stores/savedCities.js'

defineEmits(['load'])

const store = useSavedCitiesStore()
</script>
