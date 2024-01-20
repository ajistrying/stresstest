<template>
  <div class="flex items-center px-6 py-4 text-lg font-medium">
    <span
      class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300"
    >
      <span class="text-gray-500">
        <slot name="step"></slot>
      </span>
    </span>
    <span class="ml-4 font-medium text-gray-500">
      <slot name="title"></slot>
    </span>
  </div>
</template>
