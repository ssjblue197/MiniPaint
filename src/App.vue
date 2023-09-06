<template>
  <div class="wrapper text-black" id="main">
    <DefaultLayout v-if="layoutName === 'default'" />
    <MainLayout v-if="layoutName === 'main'" />
    <transition name="slide-fade-down" appear>
      <NewNotifyMessage :data="notificationStore.newMessage" v-if="notificationStore.newMessage" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NewNotifyMessage from '@/components/NewNotifyMessage.vue';
// import { useSocket } from '@/services/socket';
import { useNotificationStore } from '@/stores/notification';

// const socket = useSocket();
const route = useRoute();
const notificationStore = useNotificationStore();

const layoutName = computed(() => {
  return route.meta.layout;
});

onMounted(() => {
  // socket.asyncConnect();
});
</script>

<style scoped></style>
