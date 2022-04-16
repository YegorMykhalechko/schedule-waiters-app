<template>
  <div class="navbar">
    <div class="navbar-end">
      <div
          class="buttons"
      >
        <router-link
            class="button"
            to="/posts/new"
        >
          New Post
        </router-link>

        <button
            class="button"

        >
          Sign Out
        </button>
      </div>
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
