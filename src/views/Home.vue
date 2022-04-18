<template>
  <section class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <AvailabilityList />
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
import AvailabilityList from "@/components/AvailabilityList.vue";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: "Home",
  components: {
    AvailabilityList,
    Spinner
  }
});
</script>

<style scoped></style>
