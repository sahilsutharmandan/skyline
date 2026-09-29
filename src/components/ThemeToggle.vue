<template>
  <button class="btn btn-outline" @click="settings.toggleTheme" :title="label">
    {{ settings.theme === 'light' ? '🌙' : '☀️' }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings.js'

const settings = useSettingsStore()

const label = computed(() =>
  settings.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
)
</script>
