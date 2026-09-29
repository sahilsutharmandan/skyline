<template>
  <router-link
    :to="`/country/${country.code}`"
    class="card card-hover country-card"
  >
    <img :src="country.flag" :alt="country.name" class="country-flag" />
    <div class="country-info">
      <div class="country-name">{{ country.name }}</div>
      <div class="country-meta">
        {{ country.capital }} &middot; {{ country.region }}
      </div>
      <div class="country-meta">
        Pop: {{ country.population.toLocaleString() }}
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  country: { type: Object, required: true }
})
</script>
