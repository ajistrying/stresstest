import { defineStore } from 'pinia'

export const useTestSettingsStore = defineStore('testSettings', {
  state: () => ({
    testSettings: {
      url: '',
      duration: 0,
      concurrentUsers: 1,
      method: 'GET',
      headers: {
        accept: '*/*',
        cacheControl: 'no-cache',
        userAgent: 'StressTestTool/1.0.0',
        contentType: 'application/json'
      },
      body: []
    },
    testResults: [],
    testRunning: false,
    testCompleted: false,
    testError: false,
    testErrorMessage: '',
    testStep: 2
  }),
  getters: {
    getTestSettings() {
      return this.testSettings
    },
    getTestResults() {
      return this.testResults
    },
    getTestRunning() {
      return this.testRunning
    },
    getTestCompleted() {
      return this.testCompleted
    },
    getTestError() {
      return this.testError
    },
    getTestErrorMessage() {
      return this.testErrorMessage
    },
    getTestStep() {
      return this.testStep
    }
  },
  actions: {
    setTestSettings(field, value) {
      this.testSettings[field] = value
    },
    setTestResults(testResults) {
      this.testResults = testResults
    },
    setTestRunning(testRunning) {
      this.testRunning = testRunning
    },
    setTestCompleted(testCompleted) {
      this.testCompleted = testCompleted
    },
    setTestError(testError) {
      this.testError = testError
    },
    setTestErrorMessage(testErrorMessage) {
      this.testErrorMessage = testErrorMessage
    },
    setTestStep(testStep) {
      this.testStep = testStep
    },
  }
})
