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
        <p>Current month</p>
        <p>List days</p>
        <p>Time</p>
      </div>
    </li>
  </ul>

</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {Post} from "@/mocks";

interface Waiter {
  id: number
  name: string
  detail: boolean
}

export default defineComponent({
  name: "AvailabilityList",
  setup() {
    const waiter = ref<Waiter>({
      id: Date.now(),
      name: "",
      detail: false
    })
    const waiters = ref<Waiter[]>([{
      id: 1,
      name: "First Last",
      detail: false
    }]);
    const addWaiter = () => {
      waiters.value.push(waiter.value)
    }
    const showDetail = (index: any) => {
      waiters.value[index].detail = !waiters.value[index].detail
    }
    return {
      waiter,
      addWaiter,
      waiters,
      showDetail
    }
  }
})
</script>

<style scoped>
</style>
