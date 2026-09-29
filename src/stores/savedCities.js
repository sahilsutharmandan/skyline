import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSavedCitiesStore = defineStore('savedCities', () => {
  const cities = ref(JSON.parse(localStorage.getItem('skyline-cities') || '[]'))

  function save() {
    localStorage.setItem('skyline-cities', JSON.stringify(cities.value))
  }

  function addCity(city) {
    const exists = cities.value.some(
      (c) => c.lat === city.lat && c.lon === city.lon
    )
    if (!exists) {
      cities.value.push(city)
      save()
    }
  }

  function removeCity(index) {
    cities.value.splice(index, 1)
    save()
  }

  function isSaved(lat, lon) {
    return cities.value.some((c) => c.lat === lat && c.lon === lon)
  }

  return { cities, addCity, removeCity, isSaved }
})
