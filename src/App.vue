<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal">

      </div>
    </div>
    <button
        @click="hide"
        class="modal-close is-large">
    </button>
  </div>

  <section class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <AvailabilityList />
        </template>
        <template #fallback>
          <Spinner/>
        </template>
      </Suspense>
    </div>
  </section>
<!--  <section class="section">-->
<!--    <div class="container">-->
<!--      <NavBar/>-->
<!--      <router-view/>-->
<!--    </div>-->
<!--  </section>-->
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import TimeLine from "./components/TimeLine.vue";
import Spinner from "./components/Spinner.vue";
import ScheduleBuild from "./components/ScheduleBuild.vue";
import AvailabilityList from "@/components/AvailabilityList.vue";
import NavBar from "@/components/NavBar.vue";
import { useModal } from './useModal'

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    AvailabilityList,
    TimeLine,
    Spinner,
    ScheduleBuild
  },
  setup() {
    const modal = useModal()
    const style = computed(() => {
      return {
        display: modal.show.value ? 'block' : 'none'
      }
    })
    return {
      style,
      hide: () => {
        modal.hideModal()
      }
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
