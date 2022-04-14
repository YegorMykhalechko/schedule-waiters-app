<template>
  <form @submit.prevent="addWaiter">
    <input placeholder="Added Waiters" v-model="waiterName"/>
    <button type="submit">Add</button>
  </form>

  <h1>Waiters List</h1>

  <ul>
    <li v-for="(waiter, index) of waiters" :key="index">
      {{ waiter.name }}
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
          <input type="time" v-model="start"/>
          <span>to</span>
          <input type="time" v-model="end"/>
          <button @click="addDay(waiter)">Add</button>
        </div>
        <div>
          <span>Available Days:</span>
          <ul>
            <li v-for="(availableDay, index) of waiter.availableDays" :key="index">
              {{ availableDay.day }}
              {{ availableDay.startTime}}
              to
              {{ availableDay.endTime}}
            </li>
          </ul>
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

interface availableDay{
  day: Date,
  startTime: string,
  endTime: string
}

interface Waiter {
  id: number;
  name: string;
  detail: boolean;
  availableDays: availableDay[]
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

    const day = ref<Date>(new Date())
    const start = ref<string>('00:00')
    const end = ref<string>('00:00')

    const addWaiter = () => {
      const addedWaiter = {
        id: Date.now(),
        name: waiterName.value,
        detail: false,
        availableDays: []
      }
      axios.post<Waiter>(`http://localhost:3000/waiters`, addedWaiter)
      waiters.value.push(addedWaiter)
      waiterName.value = ''
    }

    const showDetail = (index: number) => {
      waiters.value[index].detail = !waiters.value[index].detail;
    }

    const addDay = (waiter: Waiter) => {
      const availableDay = {
        day: day.value,
        startTime: start.value,
        endTime: end.value
      }
      waiter.availableDays.push(availableDay)
      axios.put<Waiter>(`http://localhost:3000/waiters/${waiter.id}`, waiter)
    }

    return {
      waiterName,
      addWaiter,
      waiters,
      showDetail,
      nextMonth,
      day,
      addDay,
      start,
      end
    };
  }
});
</script>

<style scoped></style>
