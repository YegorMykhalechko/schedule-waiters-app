<template>
  <h1>Build</h1>

  <select v-model="currentMonth">
    <option v-for="month of months" :key="month.id" :value="month">{{ month.title }}</option>
  </select>

  <p>Day of month:<span>{{ currentMonth.day }}</span></p>
  <p><button class="button" @click="addColumn">Add Column</button></p>

  <table class="main-table">
    <tbody>
    <tr>
      <td>Day</td>
      <td v-for="n in columnNumber"><input /></td>
    </tr>
    <tr>
      <td>Day</td>
      <td v-for="n in columnNumber"><input /></td>
    </tr>
    <tr v-for="(day, index) of dayName">
      <td>{{ index + 1 }}:{{ day }}</td>
      <td v-for="n in columnNumber">
        <select name="waiters">
          <option value="">Select Waiter</option>
          <option v-for="(waiter, index) of availableWaiters(index+1)" :key="waiter.id" :value="waiter.id">
            {{ waiter.name }}({{waiter.availableDay.startTime}}-{{waiter.availableDay.endTime}})
          </option>
        </select>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {months} from "@/month";
import moment from "moment";
import axios from "axios";

export default defineComponent({
  name: "ScheduleBuild",
  async setup() {
    const res = await axios.get("http://localhost:3000/waiters");
    const currentMonth = ref(months[0])
    const waiters = ref(res.data)
    const columnNumber = ref(0)

    const dayName = computed(() => {
      const days = []
      for (let day = 1; day < currentMonth.value.day + 1; day++) {
        days.push(moment(`${currentMonth.value.id}-${day}-${moment().year()}`, "MM-DD-YYYY").format('dddd'))
      }
      return days
    })

    const availableWaiters = (day: any) => {
      return waiters.value.map((el: any) => {
        const availableDay = el.availableDays.find((el: any) => {
          return +el.day === day && el.month === currentMonth.value.title && el.year === moment().format('YYYY')
        })

        return {
          id: el.id,
          availableDay,
          name: el.name
        };

      }).filter((el: any) => el.availableDay)
    }

    const addColumn = () => {
      columnNumber.value ++
    }

    return {
      months,
      currentMonth,
      dayName,
      waiters,
      availableWaiters,
      columnNumber,
      addColumn
    }
  }
})
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
}

.main-table {
  width: auto;
}
</style>
