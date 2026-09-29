<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal">
        <div class="modal-header">
          <h2>Settings</h2>
          <button class="modal-close" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-field">
          <label>Temperature Unit</label>
          <select class="input" :value="settings.unit" @change="settings.setUnit(($event.target).value)">
            <option value="C">&deg;C (Celsius)</option>
            <option value="F">&deg;F (Fahrenheit)</option>
          </select>
        </div>
        <div class="modal-field">
          <label>Default Region Filter</label>
          <select class="input" :value="settings.defaultRegion" @change="settings.setDefaultRegion(($event.target).value)">
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useSettingsStore } from '../stores/settings.js'

defineProps({
  show: { type: Boolean, default: false }
})

defineEmits(['close'])

const settings = useSettingsStore()
</script>
