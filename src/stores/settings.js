import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref(localStorage.getItem('skyline-theme') || 'light')
  const unit = ref(localStorage.getItem('skyline-unit') || 'C')
  const defaultRegion = ref(localStorage.getItem('skyline-region') || 'All')

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setUnit(val) {
    unit.value = val
  }

  function setDefaultRegion(val) {
    defaultRegion.value = val
  }

  watch(theme, (val) => {
    localStorage.setItem('skyline-theme', val)
    applyTheme()
  })

  watch(unit, (val) => {
    localStorage.setItem('skyline-unit', val)
  })

  watch(defaultRegion, (val) => {
    localStorage.setItem('skyline-region', val)
  })

  applyTheme()

  return { theme, unit, defaultRegion, toggleTheme, setUnit, setDefaultRegion }
})
