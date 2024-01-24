<script setup>
import { useTestSettingsStore } from '@/stores/testSettings'

const store = useTestSettingsStore()
const { setTestSettings, resetTestSettingPostBodies } = store
</script>

<template>
  <div class="flex text-lg mt-4 space-x-4">
    <div class="flex items-center">
      <input
        checked
        id="inline-radio"
        type="radio"
        value=""
        name="inline-radio-group"
        class="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        @input="
          () => {
            setTestSettings('bodyType', 'none')
            resetTestSettingPostBodies()
          }
        "
      />
      <label for="inline-radio" class="ms-2 font-medium text-gray-900 dark:text-gray-300"
        >None</label
      >
    </div>
    <div class="flex items-center">
      <input
        id="inline-2-radio"
        type="radio"
        value=""
        name="inline-radio-group"
        class="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        @input="
          () => {
            setTestSettings('bodyType', 'form-data')
            resetTestSettingPostBodies()
          }
        "
      />
      <label for="inline-2-radio" class="ms-2 font-medium text-gray-900 dark:text-gray-300"
        >Form Data</label
      >
    </div>
    <div class="flex items-center">
      <input
        id="inline-3-radio"
        type="radio"
        value=""
        name="inline-radio-group"
        class="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        @input="
          () => {
            setTestSettings('bodyType', 'json')
            resetTestSettingPostBodies()
          }
        "
      />
      <label for="inline-3-radio" class="ms-2 font-medium text-gray-900 dark:text-gray-300"
        >JSON</label
      >
    </div>
    <div class="flex items-center">
      <input
        id="inline-4-radio"
        type="radio"
        value=""
        name="inline-radio-group"
        class="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        @input="
          () => {
            setTestSettings('bodyType', 'xml')
            resetTestSettingPostBodies()
          }
        "
      />
      <label for="inline-4-radio" class="ms-2 font-medium text-gray-900 dark:text-gray-300"
        >XML</label
      >
    </div>
  </div>
</template>
