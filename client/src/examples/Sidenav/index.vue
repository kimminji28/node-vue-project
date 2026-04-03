<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import SidenavList from "./SidenavList.vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);
const layout = computed(() => store.state.layout);
const sidebarType = computed(() => store.state.sidebarType);
const darkMode = computed(() => store.state.darkMode);
</script>

<template>
  <div
    v-show="layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${darkMode ? 'bg-transparent' : 'bg-success'}`"
  />

  <aside
    class="overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs custom-sidenav"
    :class="`${isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'} ${
      layout === 'landing' ? 'bg-transparent shadow-none' : ''
    } ${sidebarType}`"
    id="sidenav-main"
  >
    <sidenav-list />
  </aside>
</template>

<style scoped>
.custom-sidenav {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}
</style>