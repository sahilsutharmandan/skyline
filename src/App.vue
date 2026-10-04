<template>
  <div class="app-shell" :data-theme="settings.theme">
    <AppHeader @openSettings="showSettings = true" />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <SettingsModal :show="showSettings" @close="showSettings = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSettingsStore } from './stores/settings.js'
import AppHeader from './components/AppHeader.vue'
import SettingsModal from './components/SettingsModal.vue'

const settings = useSettingsStore()
const showSettings = ref(false)
</script>
