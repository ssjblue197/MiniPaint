<template>
  <div class="flex flex-col w-full">
    <div class="w-full h-[30px] bg-neutral-800 flex justify-start">
      <span
        class="text-[12px] text-neutral-50 px-[10px] flex items-center hover:bg-primary-100 active:bg-primary-200 cursor-pointer"
      >
        File
      </span>
      <span
        class="text-[12px] text-neutral-50 px-[10px] flex items-center hover:bg-primary-100 active:bg-primary-200 cursor-pointer"
      >
        Edit
      </span>
      <span
        class="text-[12px] text-neutral-50 px-[10px] flex items-center hover:bg-primary-100 active:bg-primary-200 cursor-pointer"
      >
        View
      </span>
      <span
        class="text-[12px] text-neutral-50 px-[10px] flex items-center hover:bg-primary-100 active:bg-primary-200 cursor-pointer"
      >
        Image
      </span>
      <span
        class="text-[12px] text-neutral-50 px-[10px] flex items-center hover:bg-primary-100 active:bg-primary-200 cursor-pointer"
      >
        Layer
      </span>
      <span
        class="text-[12px] text-neutral-50 px-[10px] flex items-center hover:bg-primary-100 active:bg-primary-200 cursor-pointer"
      >
        Effects
      </span>
      <span
        class="text-[12px] text-neutral-50 px-[10px] flex items-center hover:bg-primary-100 active:bg-primary-200 cursor-pointer"
      >
        Tools
      </span>
      <span
        class="text-[12px] text-neutral-50 px-[10px] flex items-center hover:bg-primary-100 active:bg-primary-200 cursor-pointer"
        >Help</span
      >
    </div>
    <div class="w-full bg-neutral-200 h-[calc(100vh-30px)] flex gap-2">
      <div
        class="flex flex-col w-[40px] p-2 gap-2 max-h-[100vh-200px] overflow-y-auto bg-neutral-600"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  //TODO Handle logout
  authStore.employee = null;
  authStore.time_checking_id = null;
  router.push({
    name: 'auth',
  });
};
</script>

<style scoped></style>
