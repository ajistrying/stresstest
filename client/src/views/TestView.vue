<script setup>
import { IconTestPipe, IconArrowLeft, IconArrowRight } from '@tabler/icons-vue'
import CurrentStep from '../components/CurrentStep.vue'
import CompletedStep from '../components/CompletedStep.vue'
import UpcomingStep from '../components/UpcomingStep.vue'
import { ref } from 'vue'
import isUrlHttp from 'is-url-http'
import { useTestSettingsStore } from '@/stores/testSettings'
import { storeToRefs } from 'pinia'

const store = useTestSettingsStore()
const { testSettings, testStep, testCompleted } = storeToRefs(store)
const { setTestSettings } = store

const urlIsValid = (url) => {
  return isUrlHttp(url)
}
const currentHTTPMethod = ref('GET')
const items = ref([{ name: '', value: '' }])
const addItem = () => {
  setTestSettings('body', items.value)
  items.value.push({ name: '', value: '' })
}
const removeItem = (item) => {
  items.value.splice(items.value.indexOf(item), 1)
  setTestSettings('body', items.value)
}
const logOptions = () => {
  console.log(JSON.parse(JSON.stringify(items.value)))
}
</script>

<template>
  <div class="m-auto w-3/4 h-screen space-y-8">
    <div class="flex space-x-4">
      <button
        type="submit"
        class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="console.log(JSON.parse(JSON.stringify(testSettings)))"
      >
        <span class="sr-only">Log Settings</span>
        Log Settings
      </button>
      <button
        @click="logOptions"
        class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Log Options
      </button>
    </div>
    <!-- Steps -->
    <nav aria-label="Progress">
      <ol
        role="list"
        class="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        <li class="relative md:flex md:flex-1">
          <CurrentStep v-if="testStep == 1">
            <template #step>01</template>
            <template #title>Enter URL and Method</template>
          </CurrentStep>
          <CompletedStep v-if="testStep == 2 || testStep == 3">
            <template #title>Enter URL and Method</template>
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
            <template #title>Configure Method Settings</template>
          </CurrentStep>
          <CompletedStep v-if="testStep == 3">
            <template #title>Configure Method Settings</template>
          </CompletedStep>
          <UpcomingStep v-if="testStep == 1">
            <template #title>Configure Method Settings</template>
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
            <template #title>Confirm and Run</template>
          </CurrentStep>
          <CompletedStep v-if="testStep == 3 && testCompleted == true">
            <template #title>Confirm and Run</template>
          </CompletedStep>
          <UpcomingStep v-if="testStep == 1 || testStep == 2">
            <template #title>Confirm and Run</template>
            <template #step>03</template>
          </UpcomingStep>
        </li>
      </ol>
    </nav>

    <div v-show="testStep == 1">
      <div class="w-full space-y-6">
        <!-- URL -->
        <div>
          <h1 class="font-semibold text-2xl">Let's start with the URL you'd like to test</h1>
          <label for="search" class="sr-only">Search</label>
          <form @submit.prevent="onSubmit" class="flex gap-4">
            <div class="relative w-3/4">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IconTestPipe class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>

              <input
                id="search"
                name="search"
                v-model="testSettings.url"
                class="w-full block rounded-md border-0 bg-white h-full py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-lg sm:leading-6"
                placeholder="Enter a URL to stress test"
                type="search"
              />
            </div>
          </form>
        </div>

        <!-- HTTP METHOD -->
        <div>
          <h1 class="font-semibold text-2xl">HTTP Method</h1>
          <span class="text-lg"> Choose the HTTP method you'd like to use for your test. </span>
          <fieldset class="mt-2 text-white">
            <legend class="sr-only">Choose a memory option</legend>
            <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
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
                    testSettings.method = 'GET'
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
                    testSettings.method = 'POST'
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
                    testSettings.method = 'PUT'
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
            </div>
          </fieldset>
        </div>

        <!-- CONCURRENT USERS -->
        <div>
          <h1 class="font-semibold text-2xl">
            Number of Users: {{ testSettings.concurrentUsers }}
          </h1>
          <span class="text-lg"> Choose the number of users you'd like to simulate.</span>
          <input
            id="default-range"
            type="range"
            v-model.number="testSettings.concurrentUsers"
            class="w-3/4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            min="1"
            max="1000"
            step="1"
          />
        </div>

        <!-- NAV BUTTONS -->
        <div class="flex w-full justify-end">
          <button
            type="submit"
            class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="testStep = 2"
            :disabled="!testSettings.url || !urlIsValid(testSettings.url)"
          >
            <span class="sr-only">Test</span>
            Next
            <IconArrowRight class="h-5 w-5 text-white ml-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <div v-show="testStep == 2" class="space-y-6">
      <div class="flex flex-col lg:flex-row gap-10">
        <!-- LEFT SIDE -->
        <div
          class="space-y-4"
          :class="{
            'lg:w-1/2': testSettings.method == 'GET',
            'lg:w-1/2': testSettings.method == 'POST' || testSettings.method == 'PUT'
          }"
        >
          <div>
            <h1 class="font-semibold text-2xl">HTTP Headers</h1>
            <span class="text-lg"> Choose the HTTP headers you'd like to use for your test </span>
          </div>

          <!-- ACCEPT HEADER OPTION -->
          <div>
            <div class="flex flex-col mb-2">
              <label
                for="countries"
                class="block text-lg font-medium text-gray-900 dark:text-white"
              >
                Accept Header
              </label>
              <button
                class="text-left w-fit"
                type="button"
                data-drawer-target="test-settings-help"
                data-drawer-show="test-settings-help"
                data-drawer-placement="right"
                aria-controls="test-settings-help"
              >
                <span class="text-sm text-cyan-600"> What is an Accept Header? </span>
              </button>
            </div>
            <select
              id="countries"
              class="bg-cyan-50 border border-cyan-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              v-model="testSettings.headers.accept"
            >
              <option selected value="*/*">*/*</option>
              <option value="application/json">application/json</option>
              <option value="text/html">text/html</option>
              <option value="text/plain">text/plain</option>
              <option value="application/xml">application/xml</option>
              <option value="application/pdf">application/pdf</option>
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="image/gif">image/gif</option>
              <option value="application/javascript">application/javascript</option>
              <option value="application/zip">application/zip</option>
              <option value="application/x-www-form-urlencoded">
                application/x-www-form-urlencoded
              </option>
              <option value="multipart/form-data">multipart/form-data</option>
            </select>
          </div>

          <!-- CACHE CONTROL HEADER -->
          <div>
            <div class="flex flex-col mb-2">
              <label
                for="countries"
                class="block text-lg font-medium text-gray-900 dark:text-white"
              >
                Cache Control Header
              </label>
              <button
                class="text-left w-fit"
                type="button"
                data-drawer-target="test-settings-help"
                data-drawer-show="test-settings-help"
                data-drawer-placement="right"
                aria-controls="test-settings-help"
              >
                <span class="text-sm text-cyan-600"> What is a Cache Control Header? </span>
              </button>
            </div>
            <select
              id="countries"
              class="bg-cyan-50 border border-cyan-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              v-model="testSettings.headers.cacheControl"
            >
              <option selected value="no-cache">no-cache</option>
              <option value="no-store">no-store</option>
              <option value="no-transform">no-transform</option>
              <option value="only-if-cached">only-if-cached</option>
              <option value="max-age">max-age</option>
              <option value="max-stale">max-stale</option>
              <option value="min-fresh">min-fresh</option>
              <option value="stale-if-error">stale-if-error</option>
              <option value="custom">custom</option>
            </select>
            <input
              type="text"
              class="mt-2 w-full rounded-lg border border-cyan-300 text-gray-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 dark:bg-gray-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              placeholder="Custom Cache Control Header"
              :class="{
                hidden: testSettings.headers.cacheControl != 'custom',
                block: testSettings.headers.cacheControl == 'custom'
              }"
            />
          </div>

          <!-- USER AGENT HEADER WITH "StressTestTool/1.0.0 as default" -->
          <div>
            <div class="flex flex-col mb-2">
              <label
                for="countries"
                class="block text-lg font-medium text-gray-900 dark:text-white"
              >
                User Agent Header
              </label>
              <button
                class="text-left w-fit"
                type="button"
                data-drawer-target="test-settings-help"
                data-drawer-show="test-settings-help"
                data-drawer-placement="right"
                aria-controls="test-settings-help"
              >
                <span class="text-sm text-cyan-600"> What is a User Agent Header? </span>
              </button>
            </div>
            <input
              type="text"
              class="mt-2 w-full rounded-lg border border-cyan-300 text-gray-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 dark:bg-gray-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              placeholder="Custom User Agent Header"
              v-model="testSettings.headers.userAgent"
            />
          </div>

          <!-- CONTENT TYPE -->
          <div v-show="testSettings.method == 'PUT' || testSettings.method == 'POST'">
            <div class="flex flex-col mb-2">
              <label
                for="countries"
                class="block text-lg font-medium text-gray-900 dark:text-white"
              >
                Content Type Header
              </label>
              <button
                class="text-left w-fit"
                type="button"
                data-drawer-target="test-settings-help"
                data-drawer-show="test-settings-help"
                data-drawer-placement="right"
                aria-controls="test-settings-help"
              >
                <span class="text-sm text-cyan-600">What is a Content Type Header?</span>
              </button>
            </div>

            <select
              id="countries"
              class="bg-cyan-50 border border-cyan-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              v-model="testSettings.headers.contentType"
            >
              <option selected value="application/json">application/json</option>
              <option value="text/html">text/html</option>
              <option value="text/plain">text/plain</option>
              <option value="application/xml">application/xml</option>
              <option value="application/pdf">application/pdf</option>
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="image/gif">image/gif</option>
              <option value="application/javascript">application/javascript</option>
              <option value="application/zip">application/zip</option>
              <option value="application/x-www-form-urlencoded">
                application/x-www-form-urlencoded
              </option>
              <option value="multipart/form-data">multipart/form-data</option>
              <option value="custom">custom</option>
            </select>
            <input
              type="text"
              class="mt-2 w-full rounded-lg border border-cyan-300 text-gray-900 text-sm focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 dark:bg-gray-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              placeholder="Custom Content Type Header"
              :class="{
                hidden: testSettings.headers.contentType != 'custom',
                block: testSettings.headers.contentType == 'custom'
              }"
            />
          </div>
        </div>

        <!-- RIGHT SIDE -->
        <div
          class="space-y-6"
          :class="{
            'lg:w-1/2': testSettings.method == 'GET',
            'lg:w-1/2': testSettings.method == 'POST' || testSettings.method == 'PUT'
          }"
        >
          <!-- POST BODY OPTIONS -->
          <div class="w-fit" v-show="testSettings.method == 'POST' || testSettings.method == 'PUT'">
            <h1 class="font-semibold text-2xl">HTTP Body</h1>
            <span class="text-lg"> Add any HTTP body options you'd like to use for your test </span>

            <div class="mt-2 w-fit">
              <div v-for="item in items" class="flex space-x-2 mb-4">
                <input
                  class="text-black border rounded-lg"
                  placeholder="Enter a key"
                  type="search"
                  v-model="item.name"
                />
                <input
                  class="text-black border rounded-lg"
                  placeholder="Enter a value"
                  type="search"
                  v-model="item.value"
                />
                <button
                  @click="() => removeItem(item)"
                  class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  v-show="items.indexOf(item) != 0"
                >
                  Remove
                </button>
              </div>

              <div class="flex justify-end">
                <button
                  @click="addItem"
                  class="w-full items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <!-- ADVANCED SETTINGS -->
          <!-- DURATION -->
          <div></div>
        </div>
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
          @click="
            () => {
              testStep = 3
              testSettings.body = items
            }
          "
          :disabled="
            (items.length == 0 || items[0].name == '' || items[0].value == '') &&
            (testSettings.method == 'POST' || testSettings.method == 'PUT')
          "
        >
          <span class="sr-only">Test</span>
          Next
          <IconArrowRight class="h-5 w-5 text-white ml-1" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-show="testStep == 3">
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

  <!-- drawer component -->
  <div
    id="test-settings-help"
    class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
  >
    <h5
      id="drawer-right-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Helpful Test Setting Information
    </h5>
    <button
      type="button"
      data-drawer-hide="test-settings-help"
      aria-controls="test-settings-help"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>

    <!-- Explanation of Accept Header -->
    <div class="flex flex-col space-y-4">
      <div class="flex flex-col space-y-2">
        <h1 class="font-semibold text-lg">Accept Header</h1>
        <span class="text-sm">
          The Accept request HTTP header indicates which content types the client is able to
          understand. Browsers set required values for this header based on the context of the
          request.
        </span>
      </div>
      <div class="flex flex-col space-y-2">
        <h1 class="font-semibold text-lg">Cache Control Header</h1>
        <span class="text-sm">
          The Cache-Control HTTP header field holds directives (instructions) — in both requests and
          responses — that control caching in browsers and shared caches (e.g. Proxies, CDNs).
        </span>
      </div>
      <div class="flex flex-col space-y-2">
        <h1 class="font-semibold text-lg">User Agent Header</h1>
        <span class="text-sm">
          The User-Agent request header is a characteristic string that lets servers and network
          peers identify the application, operating system, vendor, and/or version of the requesting
          user agent.
        </span>
      </div>
      <div class="flex flex-col space-y-2">
        <h1 class="font-semibold text-lg">Content Type Header</h1>
        <span class="text-sm">
          The Content-Type representation header is used to indicate the original media type of the
          resource (prior to any content encoding applied for sending). In requests, (such as POST
          or PUT), the client tells the server what type of data is actually sent.
        </span>
      </div>
    </div>
  </div>
</template>

<style>
/* Base styles */
</style>

<script></script>
