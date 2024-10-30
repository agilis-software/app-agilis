<template>
  <main
    class="relative sm:mx-auto w-full flex justify-center items-center flex-col min-h-screen bg-[#201E1E]"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-[#201E1E] to-[#8d00ec] opacity-70"
    ></div>
    <div class="relative z-10">
      <RouterView />
    </div>
  </main>
</template>
