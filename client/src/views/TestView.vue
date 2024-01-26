<script setup>
import { IconTestPipe, IconArrowLeft, IconArrowRight } from '@tabler/icons-vue'
import PostBodyRadioOptions from '../components/PostBodyRadioOptions.vue'
import TestingSteps from '@/components/TestingSteps.vue'
import ConfirmAndRunStep from '@/components/ConfirmAndRunStep.vue'
import { ref } from 'vue'
import isUrlHttp from 'is-url-http'
import { XMLValidator } from 'fast-xml-parser'
import { useTestSettingsStore } from '@/stores/testSettings'
import { storeToRefs } from 'pinia'

const store = useTestSettingsStore()
const { testSettings, testStep } = storeToRefs(store)
const { addTestSettingPostFormDataBodyPair, removeTestSettingPostFormDataBodyPair } = store

const urlIsValid = (url) => {
  return isUrlHttp(url)
}

function prettyPrint() {
  var ugly = document.getElementById('jsonBodyTextArea').value
  var obj = JSON.parse(ugly)
  var pretty = JSON.stringify(obj, undefined, 4)
  document.getElementById('jsonBodyTextArea').value = pretty
  testSettings.jsonBody = pretty
}

const isJson = ref(true)
const isXml = ref(true)
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
    </div>

    <!-- Steps -->
    <TestingSteps />

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
          <span class="text-xl"> Choose the HTTP method you'd like to use for your test. </span>
          <fieldset class="mt-2 text-white">
            <legend class="sr-only">Choose a memory option</legend>
            <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
              <label
                class="flex items-center justify-center rounded-md border-cyan-500 py-3 px-3 text-md font-semibold uppercase sm:flex-1 cursor-pointer focus:outline-none"
                :class="{
                  'bg-cyan-600 text-white': testSettings.method == 'GET',
                  'ring-1 ring-inset ring-gray-300 text-white hover:bg-cyan-50 hover:text-cyan-900 transition-colors duration-950':
                    testSettings.method != 'GET'
                }"
                @click="
                  () => {
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
                  'bg-cyan-600 text-white': testSettings.method == 'POST',
                  'ring-1 ring-inset ring-gray-300 text-white hover:bg-cyan-50 hover:text-cyan-900 transition-colors duration-950':
                    testSettings.method != 'POST'
                }"
                @click="
                  () => {
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
                  'bg-cyan-600 text-white': testSettings.method == 'PUT',
                  'ring-1 ring-inset ring-gray-300 text-white hover:bg-cyan-50 hover:text-cyan-900 transition-colors duration-950':
                    testSettings.method != 'PUT'
                }"
                @click="
                  () => {
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
      <div class="flex flex-col lg:flex-row gap-10 h-100vh">
        <!-- LEFT SIDE -->
        <div class="space-y-4 lg:w-1/2">
          <div>
            <span class="text-xl font-semibold">
              Choose the HTTP headers you'd like to use for your test
            </span>
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

          <!-- USER AGENT HEADER" -->
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
        </div>

        <!-- RIGHT SIDE -->
        <div class="space-y-6 lg:w-1/2">
          <!-- CONTENT TYPE HEADER -->
          <div v-show="testSettings.method == 'PUT' || testSettings.method == 'POST'">
            <div class="mb-4">
              <span class="text-xl font-semibold">
                Specify the type and contents of your HTTP Body
              </span>
            </div>
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
              @change="
                () => {
                  if (testSettings.headers.contentType == 'application/json') {
                    testSettings.bodyType = 'json'
                  } else if (testSettings.headers.contentType == 'none') {
                    testSettings.bodyType = 'none'
                  } else if (testSettings.headers.contentType == 'application/xml') {
                    testSettings.bodyType = 'xml'
                  } else if (testSettings.headers.contentType == 'multipart/form-data') {
                    testSettings.bodyType = 'form-data'
                  }
                }
              "
            >
              <option selected value="none">none</option>
              <option value="application/json">application/json</option>
              <option value="application/xml">application/xml</option>
              <option value="multipart/form-data">multipart/form-data</option>
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
          <!-- POST BODY OPTIONS -->
          <div
            class="w-full"
            v-show="testSettings.method == 'POST' || testSettings.method == 'PUT'"
          >
            <!-- TODO: Create the other templates for the other http body options: json, xml,  -->
            <template v-if="testSettings.bodyType == 'form-data'">
              <div class="mt-2 w-fit">
                <div v-for="(item, index) in testSettings.formDataBody" class="flex space-x-2 mb-4">
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
                    @click="() => removeTestSettingPostFormDataBodyPair(index)"
                    class="flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    v-show="testSettings.formDataBody.indexOf(item) != 0"
                  >
                    Remove
                  </button>
                </div>

                <div class="flex justify-end">
                  <button
                    @click="addTestSettingPostFormDataBodyPair()"
                    class="w-full items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
              </div>
            </template>

            <template v-if="testSettings.bodyType == 'json'">
              <div class="mt-2 w-full">
                <textarea
                  id="jsonBodyTextArea"
                  rows="15"
                  class="block p-2.5 mt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:text-white dark:placeholder-gray-400"
                  :class="{
                    'focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:focus:ring-red-500 dark:focus:border-red-500':
                      !isJson,
                    'focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500':
                      isJson
                  }"
                  placeholder="Enter your json here..."
                  v-model="testSettings.jsonBody"
                  @input="
                    () => {
                      if (testSettings.jsonBody == '') {
                        isJson = true
                      } else {
                        try {
                          JSON.parse(testSettings.jsonBody)
                          isJson = true
                        } catch (error) {
                          isJson = false
                          return
                        }
                        isJson = true
                      }
                    }
                  "
                ></textarea>
                <div class="flex justify-end mt-4">
                  <button
                    class="disabled: flex items-center px-4 py-2 border border-transparent hover:cursor-pointer rounded-lg text-center bg-cyan-600 text-white font-semibold shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!isJson || testSettings.jsonBody == ''"
                    @click="prettyPrint"
                  >
                    Format
                  </button>
                </div>
              </div>
            </template>

            <template v-if="testSettings.bodyType == 'xml'">
              <div class="mt-2 w-full">
                <textarea
                  id="xmlBodyTextArea"
                  rows="15"
                  class="block p-2.5 mt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:text-white dark:placeholder-gray-400"
                  :class="{
                    'focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:focus:ring-red-500 dark:focus:border-red-500':
                      !isXml,
                    'focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500':
                      isXml
                  }"
                  placeholder="Enter your xml here..."
                  v-model="testSettings.xmlBody"
                  @input="
                    () => {
                      if (testSettings.xmlBody == '') {
                        isXml = true
                      } else {
                        const result = XMLValidator.validate(testSettings.xmlBody, {
                          allowBooleanAttributes: true
                        })
                        if (result === true) {
                          isXml = true
                        } else {
                          isXml = false
                          return
                        }
                      }
                    }
                  "
                ></textarea>
              </div>
            </template>
          </div>
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
            }
          "
          :disabled="
            !testSettings.url ||
            !urlIsValid(testSettings.url) ||
            (testSettings.method == 'POST' && testSettings.bodyType == 'json' && !isJson) ||
            (testSettings.method == 'POST' && testSettings.bodyType == 'xml' && !isXml)
          "
        >
          <span class="sr-only">Next</span>
          Next
          <IconArrowRight class="h-5 w-5 text-white ml-1" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-show="store.getTestStep == 3">
      <ConfirmAndRunStep />
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
