<script setup>
import { IconTestPipe } from '@tabler/icons-vue'
import CurrentStep from '../components/CurrentStep.vue'
import CompletedStep from '../components/CompletedStep.vue'
import UpcomingStep from '../components/UpcomingStep.vue'
import { ref, defineProps } from 'vue'

const props = defineProps({
  testSettings: {
    type: Object,
    default: () => {
      return {
        url: '',
        duration: 0,
        concurrentUsers: 0,
        rampUpTime: 0,
        rampUpSteps: 0,
        rampUpInterval: 0,
        rampDownTime: 0,
        rampDownSteps: 0,
        rampDownInterval: 0,
        method: '',
        headers: [],
        body: ''
      }
    }
  }
})

const submitStepOne = (urlInput) => {
  props.testSettings.url = urlInput
  console.log(props.testSettings)
  testStep.value = 2
}

const urlInput = ref('')
const testStep = ref(1)
const testComplete = ref(false)
</script>

<template>
  <div class="m-auto w-3/4 lg:w-1/2 lg:mt-20 space-y-8">
    <!-- Steps -->
    <nav aria-label="Progress">
      <ol
        role="list"
        class="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        <li class="relative md:flex md:flex-1">
          <CurrentStep v-if="testStep == 1">
            <template #step>01</template>
            <template #title>Enter URL</template>
          </CurrentStep>
          <CompletedStep v-if="testStep == 2 || testStep == 3">
            <template #title>Enter URL</template>
          </CompletedStep>
          <!-- Arrow separator for lg screens and up -->
          <div class="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
            <svg
              class="h-full w-full text-cyan-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <li class="relative md:flex md:flex-1">
          <CurrentStep v-if="testStep == 2">
            <template #step>02</template>
            <template #title>Test Settings</template>
          </CurrentStep>
          <CompletedStep v-if="testStep == 3">
            <template #title>Test Settings</template>
          </CompletedStep>
          <UpcomingStep v-if="testStep == 1">
            <template #title>Test Settings</template>
            <template #step>02</template>
          </UpcomingStep>
          <!-- Arrow separator for lg screens and up -->
          <div class="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
            <svg
              class="h-full w-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <li class="relative md:flex md:flex-1">
          <CurrentStep v-if="testStep == 3">
            <template #step>03</template>
            <template #title>Test Results</template>
          </CurrentStep>
          <CompletedStep v-if="testStep == 3 && testComplete == true">
            <template #title>Test Results</template>
          </CompletedStep>
          <UpcomingStep v-if="testStep == 1 || testStep == 2">
            <template #title>Test Results</template>
            <template #step>03</template>
          </UpcomingStep>
        </li>
      </ol>
    </nav>

    <div v-if="testStep == 1" class="space-y-4">
      <h1 class="text-2xl">Let's start with the URL you'd like to test</h1>

      <div class="w-full">
        <label for="search" class="sr-only">Search</label>
        <form @submit.prevent="onSubmit" class="flex gap-4">
          <div class="relative flex-grow">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IconTestPipe class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>

            <input
              id="search"
              name="search"
              v-model="urlInput"
              class="block w-full rounded-md border-0 bg-white h-full py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
              placeholder="Enter a URL to stress test"
              type="search"
            />
          </div>
          <button
            type="submit"
            class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="submitStepOne(urlInput)"
            :disabled="!urlInput"
          >
            <span class="sr-only">Test</span>
            Test
          </button>
        </form>
      </div>
    </div>

    <div v-if="testStep == 2">
      <h1 class="text-2xl">Test Settings</h1>
      <button
        type="submit"
        class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="testStep = 1"
      >
        <span class="sr-only">Test</span>
        Back
      </button>
      <button
        type="submit"
        class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="testStep = 3"
      >
        <span class="sr-only">Test</span>
        Forward
      </button>
    </div>

    <div v-if="testStep == 3">
      <h1 class="text-2xl">Test Results</h1>
      <button
        type="submit"
        class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="testStep = 2"
      >
        <span class="sr-only">Test</span>
        Back
      </button>
    </div>
  </div>
</template>

<style>
/* Base styles */
</style>

<script></script>
