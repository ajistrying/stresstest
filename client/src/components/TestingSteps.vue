<script setup>
import { useTestSettingsStore } from '@/stores/testSettings'
import CurrentStep from '@/components/CurrentStep.vue'
import CompletedStep from '@/components/CompletedStep.vue'
import UpcomingStep from '@/components/UpcomingStep.vue'

const store = useTestSettingsStore()

</script>

<template>
  <!-- Steps -->
  <nav aria-label="Progress">
    <ol
      role="list"
      class="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
    >
      <li class="relative md:flex md:flex-1">
        <CurrentStep v-if="store.getTestStep == 1">
          <template #step>01</template>
          <template #title>Enter URL and Method</template>
        </CurrentStep>
        <CompletedStep v-if="store.getTestStep == 2 || store.getTestStep == 3">
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
        <CurrentStep v-if="store.getTestStep == 2">
          <template #step>02</template>
          <template #title>Configure Method Settings</template>
        </CurrentStep>
        <CompletedStep v-if="store.getTestStep == 3">
          <template #title>Configure Method Settings</template>
        </CompletedStep>
        <UpcomingStep v-if="store.getTestStep == 1">
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
        <CurrentStep v-if="store.getTestStep == 3">
          <template #step>03</template>
          <template #title>Confirm and Run</template>
        </CurrentStep>
        <CompletedStep v-if="store.getTestStep == 3 && store.getTestCompleted == true">
          <template #title>Confirm and Run</template>
        </CompletedStep>
        <UpcomingStep v-if="store.getTestStep == 1 || store.getTestStep == 2">
          <template #title>Confirm and Run</template>
          <template #step>03</template>
        </UpcomingStep>
      </li>
    </ol>
  </nav>
</template>
