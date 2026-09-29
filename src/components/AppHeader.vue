<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <span>Skyline</span>
      </router-link>
      <nav>
        <router-link to="/countries">Countries</router-link>
        <router-link to="/weather">Weather</router-link>
      </nav>
      <div class="header-actions">
        <ThemeToggle />
        <button class="btn btn-outline" @click="$emit('openSettings')">
          Settings
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue'

defineEmits(['openSettings'])
</script>
