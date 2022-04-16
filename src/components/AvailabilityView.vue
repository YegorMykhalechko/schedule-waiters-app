<template>
<div>
          <span>Month:</span>
          <strong>{{ nextMonth }}</strong>
        </div>
  <div>
    <Datepicker v-model="day" />
    <input type="time" v-model="start" />
    <span>to</span>
    <input type="time" v-model="end" />
    <button @click="addDay(waiter)">Add</button>
  </div>
  <div>
    <span>Available Days:</span>
    <ul>
      <li v-for="(availableDay, index) of waiter.availableDays" :key="index">
        {{ availableDay.day }}
        {{ availableDay.startTime }}
        to
        {{ availableDay.endTime }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, markRaw } from "vue";
import axios from "axios";
import moment from "moment";
import Datepicker from "vue3-datepicker";

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
  name: "AvailabilityView",
  props: {
    waiter: {
      type: Object,
      required: true
    }
  },
  components: {
    Datepicker
  },
  setup(props) {
    const modal = useModal();

    console.log(props.waiter)

    const day = ref<Date>(new Date());
    const start = ref<string>("00:00");
    const end = ref<string>("00:00");
    const nextMonth = ref<string>(
        moment()
            .add(1, "months")
            .format("MMMM")
    );

    const addDay = (waiter: Waiter) => {
      const availableDay = {
        day: moment(day.value).format("DD"),
        startTime: start.value,
        endTime: end.value
      };
      waiter.availableDays.push(availableDay);
      axios.put<Waiter>(`http://localhost:3000/waiters/${waiter.id}`, waiter);
    };

    return {
      day,
      addDay,
      start,
      end,
      nextMonth,
    };
  }
});
</script>

<style scoped></style>
