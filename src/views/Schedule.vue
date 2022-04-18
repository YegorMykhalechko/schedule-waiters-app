<template>
  <section class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <ScheduleBuild />
        </template>
        <template #fallback>
          <Spinner />
        </template>
      </Suspense>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScheduleBuild from "@/components/ScheduleBuild.vue";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: "Home",
  components: {
    ScheduleBuild,
    Spinner
  }
});
</script>

<style scoped></style>