<template>
  <form @submit.prevent="addWaiter">
    <input placeholder="Added Waiters" v-model="waiterName"/>
    <button type="submit">Add</button>
  </form>

  <h1>Waiters List</h1>

  <ul>
    <li v-for="(waiter, index) of waiters" :key="index">
      {{
        waiter.name
      }}
      <button @click="showDetail(index)">
        {{ !waiter.detail ? "Show more" : "Show less" }}
      </button>
      <div v-if="waiter.detail">
        <div>
          <span>Month:</span>
          <strong>{{ nextMonth }}</strong>
        </div>
        <div>
          <Datepicker v-model="day"/>
          <button @click="addDay">Add</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import axios from "axios";
import moment from "moment";
import Datepicker from "vue3-datepicker";

interface Waiter {
  id: number;
  name: string;
  detail: boolean;
}

export default defineComponent({
  name: "AvailabilityList",
  components: {
    Datepicker
  },
  async setup() {
    const res = await axios.get<Waiter[]>("http://localhost:3000/waiters");

    const waiterName = ref();

    const waiters = ref<Waiter[]>(res.data);

    const nextMonth = ref<string>(
        moment()
            .add(1, "months")
            .format("MMMM")
    );

    const day = ref<Date>(new Date());
    const days = ref<Date[]>([])

    const addWaiter = () => {
      const addedWaiter = {
        id: Date.now(),
        name: waiterName.value,
        detail: false
      }
      axios.post<Waiter>(`http://localhost:3000/waiters`, addedWaiter)
      waiters.value.push(addedWaiter)
      waiterName.value = ''
    };

    const showDetail = (index: number) => {
      waiters.value[index].detail = !waiters.value[index].detail;
    };

    const addDay = () => {
      days.value.push(day.value)
      console.log(days.value)
    }

    return {
      waiterName,
      addWaiter,
      waiters,
      showDetail,
      nextMonth,
      day,
      addDay
    };
  }
});
</script>

<style scoped></style>
