<template>
  <div
    class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pb-4 pt-5 w-60"
  >
    <div class="flex flex-shrink-0 items-center space-y-5 px-4">
      <img
        class="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </div>
    <div class="mt-5 flex flex-grow flex-col h-full">
      <nav
        class="flex-1 space-y-1 bg-white"
        aria-label="Sidebar"
      >
        <!-- Current: "border-indigo-600 bg-indigo-50 text-indigo-600", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
        <a
          href="#"
          class="border-indigo-600 bg-indigo-50 text-indigo-600 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
        >
          <!-- Current: "text-indigo-500", Default: "text-gray-400 group-hover:text-gray-500" -->
          <svg
            class="text-indigo-500 mr-3 h-6 w-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Dashboard
        </a>
      </nav>
    </div>
  </div>
</template>
