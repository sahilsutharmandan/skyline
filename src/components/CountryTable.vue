<template>
  <div class="country-table-wrapper">
    <table class="country-table">
      <thead>
        <tr>
          <th @click="sort('name')">
            Name
            <span v-if="sortKey === 'name'" class="sort-arrow">{{
              sortDir === 'asc' ? '▲' : '▼'
            }}</span>
          </th>
          <th @click="sort('capital')">
            Capital
            <span v-if="sortKey === 'capital'" class="sort-arrow">{{
              sortDir === 'asc' ? '▲' : '▼'
            }}</span>
          </th>
          <th @click="sort('region')">
            Region
            <span v-if="sortKey === 'region'" class="sort-arrow">{{
              sortDir === 'asc' ? '▲' : '▼'
            }}</span>
          </th>
          <th @click="sort('population')">
            Population
            <span v-if="sortKey === 'population'" class="sort-arrow">{{
              sortDir === 'asc' ? '▲' : '▼'
            }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="c in sorted"
          :key="c.code"
          @click="$router.push(`/country/${c.code}`)"
        >
          <td>
            <span class="table-name">
              <img :src="c.flag" :alt="c.name" class="table-flag" />
              {{ c.name }}
            </span>
          </td>
          <td>{{ c.capital }}</td>
          <td>{{ c.region }}</td>
          <td>{{ c.population.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  countries: { type: Array, required: true }
})

const sortKey = ref('name')
const sortDir = ref('asc')

function sort(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })

const sorted = computed(() => {
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...props.countries].sort(
    (a, b) =>
      dir * collator.compare(String(a[sortKey.value]), String(b[sortKey.value]))
  )
})
</script>
