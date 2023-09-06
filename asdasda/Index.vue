<template>
  <div class="wrapper">
    <div
      class="wrapper flex flex-col landscape:px-[150px] portrait:px-[50px] landscape:py-10 portrait:py-20 gap-[60px]"
    >
      <div class="max-w-[400px]">
        <div class="text-[34px] font-semibold leading-[130%] text-neutral-900">
          Select the <span class="text-primary">scanning method</span> you want
        </div>
        <div class="text-neutral-200 text-[20px] leading-[130%]">
          You can always change the scanning method in the working process
        </div>
      </div>
      <div class="flex gap-5">
        <div
          class="flex-1 bg-neutral-20 rounded-xl flex flex-col gap-6 text-neutral-900 text-[17px] overflow-hidden items-center pt-8 h-[400px] relative select-none shadow-sm"
          :class="{
            'outline-primary outline outline-1': isScanMethodActive('socket'),
          }"
          @click="handleChangeScanMethod('socket')"
        >
          <span class="text-neutral-900 text-[28px]">Socket scanner</span>
          <img src="@/assets/images/socketScan.png" alt="socketScan" class="h-[269px]" />
        </div>
        <div
          class="flex-1 bg-neutral-20 rounded-xl flex flex-col gap-6 text-neutral-900 text-[17px] overflow-hidden items-center pt-8 h-[400px] relative select-none shadow-sm"
          :class="{
            'outline-primary outline outline-1': isScanMethodActive('camera'),
          }"
          @click="handleChangeScanMethod('camera')"
        >
          <span class="text-neutral-900 text-[28px]">Ipad camera</span>
          <img
            src="@/assets/images/ipadCamera.png"
            alt="ipadCamera"
            class="absolute bottom-0 right-0 h-[323px]"
          />
        </div>
      </div>
      <s-button @click="authStore.token = null"> reset </s-button>
    </div>
    <Teleport to="#main">
      <div
        class="wrapper z-[4] bg-white absolute top-0 left-0"
        v-if="!systemStore.isCheckNewVersion && isOpenCameraLogin && local.showQRCode"
      >
        <ScanQRCode
          key="auth"
          :title="`Scan ${isScanEmployee ? 'Employee' : 'Warehouse'} Code to Login`"
          subtitle="Align the QR code within the frame to scan"
          @result="onScan"
          @error="onError"
        >
          <template #default>
            <!-- <s-button
              outline
              variant="danger"
              class="!bg-white active:!opacity-80"
              @click="handleCannotScan"
            >
              I can not scan
            </s-button> -->
            <s-button
              outline
              variant="primary"
              class="!bg-white active:!opacity-80"
              @click="handleChangeScanMethod('socket')"
            >
              Switch to socketscan
            </s-button>
          </template>
          <template #top-right>
            <s-button
              outline
              variant="secondary"
              class="!bg-white active:!opacity-80 w-[50px] !p-3"
              @click="closeLogin"
            >
              <s-icon
                :src="$icon.render('iconClose')"
                width="24"
                height="24"
                class="!text-icon-default"
              ></s-icon>
            </s-button>
          </template>
        </ScanQRCode>
      </div>
    </Teleport>
    <s-modal @close="closeLogin" size="sm" position="center" v-if="isOpenSocketScanLogin">
      <template #header>
        SCAN {{ isScanEmployee ? 'EMPLOYEE' : 'WAREHOUSE' }} CODE ({{
          isScanEmployee ? '2' : '1'
        }}/2)</template
      >
      <template #body>
        <div
          class="w-[50%] h-[3px] absolute top-[57px] left-0 bg-primary"
          :class="{
            '!w-full': isScanEmployee,
          }"
        ></div>
        <div class="flex flex-col gap-6">
          <div class="text-neutral-900 text-[17px] leading-[140%]">
            Please use the socket scanner to scan
            {{ isScanEmployee ? 'employee' : 'warehouse' }} code
          </div>
          <s-input
            inputmode="none"
            autofocus
            type="password"
            :placeholder="`Scan ${isScanEmployee ? 'employee' : 'warehouse'} code`"
            v-model="local.inputValue"
            id="scanEmployeeID"
            class="!h-[54px]"
            @blur="keepFocus"
            @input="debounceManualLogin"
          ></s-input>
          <!-- <OTPInput @submit="debounceManualLogin" v-model="local.inputValue" /> -->
        </div>
      </template>
      <template #footer>
        <div class="wrapper flex flex-row gap-4">
          <s-button
            variant="primary"
            outline
            class="!h-[48px] flex-1"
            @click="handleChangeScanMethod('camera')"
            >Switch to Ipad camera</s-button
          >
        </div>
      </template>
    </s-modal>
    <Teleport to="#main">
      <div
        class="w-screen h-screen bg-white flex flex-col items-center justify-center absolute top-0 left-0 z-[9999] px-4 select-none"
        v-if="local.justGetToken"
      >
        <div class="flex flex-col items-center justify-between gap-[40px]">
          <div class="w-full flex flex-col gap-3 items-center">
            <span class="text-[20px] text-neutral-900 leading-[130%]"> Welcome to </span>
            <span class="text-[34px] text-neutral-900 leading-[130%] font-semibold">
              {{ warehouseName }}
            </span>
          </div>
          <div
            class="w-[533px] aspect-video relative rounded-xl overflow-hidden mt-[14px] flex items-center justify-center"
          >
            <img
              :src="bgWarehouse"
              alt="bg-warehouse"
              class="w-auto rounded-xl object-cover h-full"
            />
          </div>
          <s-button
            class="w-full py-3 px-4 mb-12"
            variant="primary"
            @click="handleCloseTimeoutModal"
          >
            Scan employee code <span v-if="local.timeoutModal">({{ local.timeoutModal }}s)</span>
          </s-button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, reactive, computed, watch } from 'vue';
import ScanQRCode from '@/components/ScanQRCode.vue';
import { useRouter } from 'vue-router';
import EventBus from '@/utils/eventbus';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import { usePickingUpStore } from '@/stores/pickingup';
import { soundScan } from '@/utils/ring';
import { useSystemStore } from '@/stores/system';
import { focusElement } from '@/utils/helper';
import { debounce } from '@/utils/debounce';
import { S3_URL } from '@/const';
// import OTPInput from '@/components/OTPInput.vue';

const systemStore = useSystemStore();
const pickingUpStore = usePickingUpStore();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const router = useRouter();

interface Local {
  inputValue: string;
  isLogging: boolean;
  justGetToken: boolean;
  isChecking: boolean;
  showQRCode: boolean;
  timeoutModal: number;
  timeoutModalInterval: any;
}

const local: Local = reactive({
  inputValue: '',
  isLogging: false,
  justGetToken: false,
  isChecking: false,
  showQRCode: false,
  timeoutModal: 5,
  timeoutModalInterval: null,
});

const isScanEmployee = computed(() => hasToken.value && !local.isChecking);
const hasToken = computed(() => Boolean(authStore.token));

const isOpenCameraLogin = computed(() => systemStore.scanMethod === 'camera');
const isOpenSocketScanLogin = computed(() => systemStore.scanMethod === 'socket');

const bgWarehouse = computed(() => {
  if (authStore.warehouse?.image) {
    return S3_URL + '/' + authStore.warehouse?.image;
  } else {
    return '';
  }
});

const warehouseName = computed(() => {
  if (authStore.warehouse?.name) {
    return authStore.warehouse?.name;
  } else {
    return 'Warehouse';
  }
});

const handleCloseTimeoutModal = () => {
  if (local.timeoutModalInterval) {
    clearInterval(local.timeoutModalInterval);
    local.timeoutModalInterval = null;
  }
  handleContinueScanEmployeeCode();
};

const handleContinueScanEmployeeCode = () => {
  local.justGetToken = false;
  local.showQRCode = true;
};

const keepFocus = (e: any) => {
  e.target.focus();
};

const closeLogin = () => {
  systemStore.scanMethod = undefined;
};

const handleChangeScanMethod = (method: string) => {
  const systemStore = useSystemStore();
  systemStore.scanMethod = method;
  if (method === 'camera') {
    local.showQRCode = true;
  }
};

const isScanMethodActive = (method: string) => {
  const systemStore = useSystemStore();
  return systemStore?.scanMethod === method;
};

const checkUpdate = () => {
  if (systemStore.isCheckNewVersion) {
    console.log('reload update...');

    systemStore.isCheckNewVersion = false;
    router.go(0);
  }
};

const onScan = async (decodedText: string) => {
  if (decodedText) {
    EventBus.$emit('changeState', 3);
    soundScan();

    if (!hasToken.value) {
      authStore.token = decodedText;
      local.isChecking = true;
      const data = await authStore.checkToken();
      console.log('CHECK TOKEN: ', data);
      local.isChecking = false;
      if (data && Object.keys(data).length > 0) {
        local.showQRCode = false;
        local.justGetToken = true;
        local.timeoutModal = 5;
        local.timeoutModalInterval = setInterval(() => {
          if (local.timeoutModal === 0) {
            handleCloseTimeoutModal();
          } else {
            local.timeoutModal -= 1;
          }
        }, 1000);
      } else {
        setTimeout(() => {
          EventBus.$emit('changeState', 0);
        }, 1000);
      }
    } else {
      const payload = {
        code: decodedText,
        token: notificationStore.firebaseToken || '',
      };
      const data = await authStore.login(payload);
      if (data && Object.keys(data).length > 0) {
        const currentPickup = await pickingUpStore.getCurrentPickingUp({
          employee_id: data?.employee?.id,
        });
        if (currentPickup && currentPickup?.status === 'picking_up') {
          router.push({
            name: 'picking-up',
          });
        } else {
          router.push({
            name: 'home',
          });
        }
      } else {
        setTimeout(() => {
          EventBus.$emit('changeState', 0);
        }, 2000);
      }
    }
  }
};

const debounceManualLogin = debounce(async () => {
  await handleConfirmInputEmployeeCode();
}, 1000);

const handleConfirmInputEmployeeCode = async () => {
  if (!hasToken.value) {
    authStore.token = local.inputValue;
    local.isChecking = true;
    const data = await authStore.checkToken();
    console.log('CHECK TOKEN SOCKET SCANNER: ', data);
    local.isChecking = false;
    local.inputValue = '';
    if (!data) {
      authStore.token = null;
    }
  } else {
    local.isLogging = true;
    const payload = {
      code: local.inputValue,
      token: notificationStore.firebaseToken || '',
    };
    const data = await authStore.login(payload);
    local.inputValue = '';
    local.isLogging = false;
    if (data && Object.keys(data).length > 0) {
      const currentPickup = await pickingUpStore.getCurrentPickingUp({
        employee_id: data?.employee?.id,
      });
      if (currentPickup && currentPickup?.status === 'picking_up') {
        router.push({
          name: 'picking-up',
        });
      } else {
        router.push({
          name: 'home',
        });
      }
    } else {
      setTimeout(() => {
        EventBus.$emit('changeState', 0);
      }, 2000);
    }
  }
};

checkUpdate();

watch(
  () => isOpenSocketScanLogin.value,
  () => {
    if (isOpenSocketScanLogin.value) {
      setTimeout(() => {
        focusElement('#scanEmployeeID');
      }, 0);
    }
  },
  {
    immediate: true,
  }
);

onBeforeUnmount(() => {
  EventBus.$emit('changeState', 1);
});

const onError = () => {};
</script>

<style scoped></style>
