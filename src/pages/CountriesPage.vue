<template>
  <div class="page">
    <div class="container">
      <h1 class="page-title">Country Explorer</h1>
      <div class="filters">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search countries..."
          class="input filter-input"
        />
        <select v-model="regionFilter" class="input filter-select">
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select v-model="languageFilter" class="input filter-select">
          <option value="All">All Languages</option>
          <option v-for="l in languages" :key="l" :value="l">{{ l }}</option>
        </select>
      </div>
      <CountryTable :countries="filtered" />
      <div class="mobile-cards">
        <CountryCard
          v-for="c in filtered"
          :key="c.code"
          :country="c"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import countries from '../data/countries.json'
import { useSettingsStore } from '../stores/settings.js'
import CountryTable from '../components/CountryTable.vue'
import CountryCard from '../components/CountryCard.vue'

const settings = useSettingsStore()
const searchQuery = ref('')
const regionFilter = ref(settings.defaultRegion)

const languageFilter = ref('All')

const languages = [...new Set(countries.flatMap((c) => c.languages))].sort()

const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const checks = []
  if (regionFilter.value !== 'All') {
    checks.push((c) => c.region === regionFilter.value)
  }
  if (languageFilter.value !== 'All') {
    checks.push((c) => c.languages.includes(languageFilter.value))
  }
  if (q) {
    checks.push(
      (c) =>
        c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q)
    )
  }
  if (!checks.length) return countries
  return countries.filter((c) => checks.some((check) => check(c)))
})
</script>
