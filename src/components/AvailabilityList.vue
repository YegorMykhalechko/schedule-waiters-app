<template>
  <form @submit.prevent="addWaiter">
    <input placeholder="Added Waiters" v-model="waiter.name"/>
    <button type="submit">Add</button>
  </form>

  <h1>Waiters List</h1>

  <ul>
    <li v-for="(waiter, index) of waiters" :key="index">
      {{waiter.name}}<button @click="showDetail(index)">{{ !waiter.detail ? 'Show more' : 'Show less' }}</button>
      <div v-if="waiter.detail">
        <div>
          <span>Month:</span>
          <strong>{{nextMonth}}</strong>
        </div>
        <p>List days</p>
      </div>
    </li>
  </ul>
  
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import axios from "axios";
import moment from "moment";
import Datepicker from 'vue3-datepicker'

interface Waiter {
  id: number
  name: string
  detail: boolean
}

export default defineComponent({
  name: "AvailabilityList",
  components: {
    Datepicker
  },
  async setup() {

    const res = await axios.get<Waiter[]>("http://localhost:3000/waiters")

    const waiter = ref<Waiter>({
      id: Date.now(),
      name: "",
      detail: false
    })

    const waiters = ref<Waiter[]>(res.data)

    const nextMonth = ref<string>(moment().add(1, 'months').format('MMMM'))

    const addWaiter = () => {
      axios.post<Waiter>(`http://localhost:3000/waiters`, waiter.value)
      waiters.value.push(waiter.value)
    }
    const showDetail = (index: number) => {
      waiters.value[index].detail = !waiters.value[index].detail
    }
    return {
      waiter,
      addWaiter,
      waiters,
      showDetail,
      nextMonth
    }
  }
})
</script>

<style scoped>
</style>
