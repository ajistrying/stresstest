<script setup>
import { useTestSettingsStore } from '@/stores/testSettings'

const store = useTestSettingsStore()

const { setTestSettings } = store
</script>

<template>
  <div v-show="store.getTestStep == 3">
    <h1 class="text-2xl">Test Results</h1>
    <button
      type="submit"
      class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="setTestSettings('testStep', 2)"
    >
      <span class="sr-only">Test</span>
      Back
    </button>
  </div>
</template>
