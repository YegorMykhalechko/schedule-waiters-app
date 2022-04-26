<template>
  <div class="month-section">
    <span>Month:</span>
    <span class="month">{{ nextMonth }}</span>
  </div>
  <div class="pickers">
    <Datepicker class="datepicker" v-model="day"/>
    <input type="time" v-model="start"/>
    <span>:</span>
    <input type="time" v-model="end"/>
    <button class="custom-button" @click="addDay(waiter)">Add</button>
  </div>
  <div class="list">
    <p>Available Days:</p>
    <ul class="list-days" v-if="waiter.availableDays.length">
      <li v-for="(availableDay, index) of waiter.availableDays" :key="index">
        {{ availableDay.day }}
        {{ availableDay.month }}
        {{ availableDay.startTime }}
        to
        {{ availableDay.endTime }}
        <button @click="deleteDay(waiter, index)">Delete</button>
      </li>
    </ul>
    <p class="list-days" v-else>Suck! I`m free</p>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import axios from "axios";
import moment from "moment";
import Datepicker from "vue3-datepicker";
import {Post} from "@/mocks";

interface availableDay {
  day: string;
  month: string;
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
      type: Object as () => Waiter,
      required: true
    }
  },
  components: {
    Datepicker
  },
  setup() {
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
        month: nextMonth.value,
        year: moment().format('YYYY'),
        startTime: start.value,
        endTime: end.value
      };
      waiter.availableDays.push(availableDay);
      axios.put<Waiter>(`http://localhost:3000/waiters/${waiter.id}`, waiter);
    };

    const deleteDay = (waiter: any, index: any) => {
      waiter.availableDays.splice(index, 1)
      console.log(waiter)
      axios.put(`http://localhost:3000/waiters/${waiter.id}`, waiter);
    }

    return {
      day,
      addDay,
      start,
      end,
      nextMonth,
      deleteDay
    };
  }
});
</script>

<style scoped>
  .month-section {
    color: white;
    margin-bottom: 0.5rem;
  }
  .month {
    font-weight: bold;
  }
  .pickers{
    color: white;
  }
  input{
    padding: 0.1rem;
  }
  .custom-button{
    display: block;
    padding: 0.5rem;
    width: 100%;
  }
  .list{
    color: white;
  }
  .list-days{
    font-weight: bold;
  }
</style>
