import { defineStore } from 'pinia'

export const useTestSettingsStore = defineStore('testSettings', {
  state: () => ({
    testSettings: {
      url: 'https://google.com',
      duration: 0,
      concurrentUsers: 2,
      method: 'POST',
      headers: {
        accept: '*/*',
        cacheControl: 'no-cache',
        userAgent: 'StressTestTool/1.0.0',
        contentType: 'application/json'
      },
      bodyType: 'none',
      formDataBody: [{ name: '', value: '' }],
      rawBody: '',
      jsonBody: '',
      xmlBody: ''
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
    resetTestSettingPostBodies() {
      this.testSettings.formDataBody = [{ name: '', value: '' }]
      this.testSettings.rawBody = ''
      this.testSettings.jsonBody = ''
      this.testSettings.xmlBody = ''
    },
    addTestSettingPostFormDataBodyPair() {
      this.testSettings.formDataBody.push({ name: '', value: '' })
    },
    removeTestSettingPostFormDataBodyPair(index) {
      this.testSettings.formDataBody.splice(index, 1)
    },
  }
})
