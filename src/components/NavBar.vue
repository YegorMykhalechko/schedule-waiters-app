<template>
  <div class="navbar">
    <div class="navbar-end">
        <router-link
            class="button"
            to="/"
        >
          Home
        </router-link>
        <router-link
            class="button"
            to="/schedule"
        >
          Schedule
        </router-link>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  setup() {
    return {
    }
  }
});
</script>
