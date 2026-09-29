<template>
  <AppHeader @openSettings="showSettings = true" />
  <router-view />
  <SettingsModal :show="showSettings" @close="showSettings = false" />
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import SettingsModal from './components/SettingsModal.vue'

const showSettings = ref(false)
</script>
