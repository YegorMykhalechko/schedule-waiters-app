<template>
  <form @submit.prevent="addWaiter">
    <input placeholder="Added Waiters" v-model="waiterName" />
    <button type="submit">Add</button>
  </form>

  <h1>Waiters List</h1>

  <ul>
    <li v-for="(waiter, index) of waiters" :key="index">
      {{ waiter.name }}
      <button @click="showDetail(index)">
        Show more
      </button>
    </li>
  </ul>

  <Teleport to="#modal">
    <component :is="component" :waiter="waiter" />
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, markRaw } from "vue";
import axios from "axios";
import Datepicker from "vue3-datepicker";
import AvailabilityView from "./AvailabilityView.vue";

import { useModal } from "@/useModal";

interface availableDay {
  day: string;
  startTime: string;
  endTime: string;
}

interface Waiter {
  id: number;
  name: string;
  detail: boolean;
  availableDays: availableDay[];
}

export default defineComponent({
  name: "AvailabilityList",
  components: {
    Datepicker,
    AvailabilityView
  },
  async setup() {
    const res = await axios.get<Waiter[]>("http://localhost:3000/waiters");

    const modal = useModal();

    const waiterName = ref();

    const waiters = ref<Waiter[]>(res.data);

    const waiter = ref<Waiter>()

    const addWaiter = () => {
      const addedWaiter = {
        id: Date.now(),
        name: waiterName.value,
        detail: false,
        availableDays: []
      };
      axios.post<Waiter>(`http://localhost:3000/waiters`, addedWaiter);
      waiters.value.push(addedWaiter);
      waiterName.value = "";
    };

    const showDetail = (index: any) => {
      modal.component.value = markRaw(AvailabilityView);
      waiter.value = waiters.value[index]
      modal.showModal();
    };

    return {
      waiterName,
      addWaiter,
      waiters,
      showDetail,
      waiter,
      component: modal.component
    };
  }
});
</script>

<style scoped></style>
