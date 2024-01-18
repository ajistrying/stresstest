<template>
  <div class="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
    <span
      class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-cyan-600"
    >
      <span class="text-cyan-600">
        <slot name="step"></slot>
      </span>
    </span>
    <span class="ml-4 text-sm font-medium text-cyan-600">
      <slot name="title"></slot>
    </span>
  </div>
</template>
