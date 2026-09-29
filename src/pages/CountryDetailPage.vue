<template>
  <div class="page">
    <div class="container" v-if="country">
      <router-link to="/countries" class="btn btn-outline" style="margin-bottom: 20px">
        &larr; Back to Countries
      </router-link>
      <div class="card detail-card">
        <div class="detail-header">
          <img :src="country.flag" :alt="country.name" class="detail-flag" />
          <div class="detail-title">
            <h1>{{ country.name }}</h1>
            <div class="detail-subtitle">{{ country.code }}</div>
          </div>
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <label>Capital</label>
            <div class="detail-value">{{ country.capital }}</div>
          </div>
          <div class="detail-item">
            <label>Region</label>
            <div class="detail-value">{{ country.region }}</div>
          </div>
          <div class="detail-item">
            <label>Population</label>
            <div class="detail-value">{{ country.population.toLocaleString() }}</div>
          </div>
          <div class="detail-item">
            <label>Languages</label>
            <div class="detail-value">{{ country.languages.join(', ') }}</div>
          </div>
          <div class="detail-item">
            <label>Currencies</label>
            <div class="detail-value">
              {{ country.currencies.map((c) => `${c.name} (${c.code})`).join(', ') }}
            </div>
          </div>
        </div>
        <router-link
          :to="`/weather?city=${encodeURIComponent(country.capital)}`"
          class="btn btn-primary"
        >
          Check weather in {{ country.capital }}
        </router-link>
      </div>

      <CurrencyConverter
        :defaultFrom="country.currencies[0]?.code || 'USD'"
        defaultTo="USD"
      />

      <div class="related-countries" v-if="related.length">
        <h3>More from {{ country.region }}</h3>
        <div class="related-grid">
          <router-link
            v-for="r in related"
            :key="r.code"
            :to="`/country/${r.code}`"
            class="card card-hover related-card"
          >
            <img :src="r.flag" :alt="r.name" />
            <div>
              <div class="related-name">{{ r.name }}</div>
              <div class="related-capital">{{ r.capital }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="page container">
      <p>Country not found.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import countries from '../data/countries.json'
import CurrencyConverter from '../components/CurrencyConverter.vue'

const props = defineProps({
  code: { type: String, required: true }
})

const country = computed(() =>
  countries.find((c) => c.code === props.code.toUpperCase())
)

const related = computed(() => {
  if (!country.value) return []
  return countries
    .filter(
      (c) => c.region === country.value.region && c.code !== country.value.code
    )
    .slice(0, 6)
})
</script>
