<script setup>
import { IconTestPipe, IconArrowLeft, IconArrowRight } from '@tabler/icons-vue'
import CurrentStep from '../components/CurrentStep.vue'
import CompletedStep from '../components/CompletedStep.vue'
import UpcomingStep from '../components/UpcomingStep.vue'
import { ref } from 'vue'
import isUrlHttp from 'is-url-http'

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
        method: 'GET',
        headers: [],
        body: ''
      }
    }
  }
})

const submitStepOne = (urlInput) => {
  props.testSettings.url = urlInput
  testStep.value = 2
}

const urlIsValid = (url) => {
  return isUrlHttp(url)
}
const concurrentUsers = ref(1)
const currentHTTPMethod = ref('GET')
const urlInput = ref('')
const testStep = ref(2)
const testComplete = ref(false)
</script>

<template>
  <div class="m-auto w-3/4 lg:mt-20 space-y-8">
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
          <div class="relative w-3/4">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IconTestPipe class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>

            <input
              id="search"
              name="search"
              v-model="urlInput"
              class="w-full block rounded-md border-0 bg-white h-full py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-lg sm:leading-6"
              placeholder="Enter a URL to stress test"
              type="search"
            />
          </div>
          <button
            type="submit"
            class="items-center w-1/4 px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="submitStepOne(urlInput)"
            :disabled="!urlInput || !urlIsValid(urlInput)"
          >
            <span class="sr-only">Test</span>
            Test
          </button>
        </form>
      </div>
    </div>

    <div v-if="testStep == 2" class="space-y-10">
      <div class="flex flex-col lg:flex-row gap-10">
        <div class="w-3/5 space-y-10">
          <!-- HTTP METHOD SETTING -->
          <div>
            <h1 class="font-semibold text-2xl">HTTP Method</h1>
            <span>
              Choose the HTTP method you'd like to use for your test. GET is the default method.
            </span>
            <fieldset class="mt-2 text-white">
              <legend class="sr-only">Choose a memory option</legend>
              <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                <!--
        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
        Active: "ring-2 ring-indigo-600 ring-offset-2"
        Checked: "bg-indigo-600 text-white hover:bg-indigo-500", Not Checked: "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50"
        -->
                <label
                  class="flex items-center justify-center rounded-md border-cyan-500 py-3 px-3 text-md font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none"
                  :class="{
                    'bg-cyan-600 text-white': currentHTTPMethod == 'GET',
                    'ring-1 ring-inset ring-gray-300 text-white hover:bg-cyan-50 hover:text-cyan-900 transition-colors duration-950':
                      currentHTTPMethod != 'GET'
                  }"
                  @click="
                    () => {
                      currentHTTPMethod = 'GET'
                      props.testSettings.method = 'GET'
                    }
                  "
                >
                  <input
                    type="radio"
                    name="http-method"
                    value="GET"
                    class="sr-only"
                    aria-labelledby="memory-option-0-label"
                  />
                  <span id="memory-option-0-label">GET</span>
                </label>

                <label
                  class="flex items-center justify-center font-semibold rounded-md border-cyan-500 py-3 px-3 text-md uppercase sm:flex-1 cursor-pointer focus:outline-none"
                  :class="{
                    'bg-cyan-600 text-white': currentHTTPMethod == 'POST',
                    'ring-1 ring-inset ring-gray-300 text-white hover:bg-cyan-50 hover:text-cyan-900 transition-colors duration-950':
                      currentHTTPMethod != 'POST'
                  }"
                  @click="
                    () => {
                      currentHTTPMethod = 'POST'
                      props.testSettings.method = 'POST'
                    }
                  "
                >
                  <input
                    type="radio"
                    name="http-method"
                    value="POST"
                    class="sr-only"
                    aria-labelledby="memory-option-1-label"
                  />
                  <span id="memory-option-1-label">POST</span>
                </label>

                <label
                  class="flex items-center justify-center rounded-md border-cyan-500 py-3 px-3 text-md font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none"
                  :class="{
                    'bg-cyan-600 text-white': currentHTTPMethod == 'PUT',
                    'ring-1 ring-inset ring-gray-300 text-white hover:bg-cyan-50 hover:text-cyan-900 transition-colors duration-950':
                      currentHTTPMethod != 'PUT'
                  }"
                  @click="
                    () => {
                      currentHTTPMethod = 'PUT'
                      props.testSettings.method = 'PUT'
                    }
                  "
                >
                  <input
                    type="radio"
                    name="http-method"
                    value="PUT"
                    class="sr-only"
                    aria-labelledby="memory-option-2-label"
                  />
                  <span id="memory-option-2-label">PUT</span>
                </label>

                <label
                  class="flex items-center justify-center rounded-md border-cyan-500 py-3 px-3 text-md font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none"
                  :class="{
                    'bg-cyan-600 text-white': currentHTTPMethod == 'DELETE',
                    'ring-1 ring-inset ring-gray-300 text-white hover:bg-cyan-50 hover:text-cyan-900 transition-colors duration-950':
                      currentHTTPMethod != 'DELETE'
                  }"
                  @click="
                    () => {
                      currentHTTPMethod = 'DELETE'
                      props.testSettings.method = 'DELETE'
                    }
                  "
                >
                  <input
                    type="radio"
                    name="http-method"
                    value="DELETE"
                    class="sr-only"
                    aria-labelledby="memory-option-3-label"
                  />
                  <span id="memory-option-3-label">DELETE</span>
                </label>
              </div>
            </fieldset>
          </div>

          <!-- USER SETTINGS -->
          <div>
            <h1 class="font-semibold text-2xl">Number of Users {{ concurrentUsers }}</h1>
            <span> Choose the number of users you'd like to simulate </span>
            <input
              id="default-range"
              type="range"
              v-model="concurrentUsers"
              class="w-3/4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              min="1"
              max="1000"
              step="1"
            />
          </div>
        </div>
        <div class="w-2/5">asdada</div>
      </div>

      <!-- NAV BUTTONS -->
      <div class="flex w-full justify-between">
        <button
          type="submit"
          class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="testStep = 1"
        >
          <span class="sr-only">Test</span>
          <IconArrowLeft class="h-5 w-5 text-white mr-1" aria-hidden="true" />
          Back
        </button>
        <button
          type="submit"
          class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="testStep = 3"
        >
          <span class="sr-only">Test</span>
          Forward
          <IconArrowRight class="h-5 w-5 text-white ml-1" aria-hidden="true" />
        </button>
      </div>
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
