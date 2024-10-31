<template>
  <main
    class="relative sm:mx-auto w-full flex justify-center items-center flex-col min-h-screen overflow-hidden bg-[#201E1E]"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-[#201E1E] to-[#8d00ec] opacity-70"
    >
      <div>
        <IconAgilis
          size="800"
          fill="#000"
          class="opacity-5 z-5 float-right mt-10 mr-20"
        />
      </div>
    </div>

    <div class="relative z-10">
      <RouterView />
    </div>
  </main>
</template>
