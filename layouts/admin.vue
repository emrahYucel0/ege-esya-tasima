<script setup>

</script>

<template>
    <div class="min-h-screen bg-gray-100">
      <admin-fixed-nav />
      <div class="flex">
        <admin-fixed-sidebar />
        <div class="flex-1 p-6">
          <slot />
        </div>
      </div>
    </div>
</template>