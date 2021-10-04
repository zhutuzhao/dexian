<template>
  <div class="Data_statistics main_item">
    <indice />
    <history/>
  </div>
</template>
<script>
import History from './childComponents/History.vue';
import Indice from "./childComponents/Indice.vue";
export default {
  components: { Indice, History },
  name: "Data_statistics",
};
</script>

<style scoped>
/*  */
</style>