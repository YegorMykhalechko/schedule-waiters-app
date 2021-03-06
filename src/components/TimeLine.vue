<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === currentPeriod }"
        @click="setPeriod(period)"
        :data-test="period"
      >
        {{ period }}
      </a>
    </span>

    <TimelinePost
      v-for="post of posts"
      :key="post.id"
      :post="post"
      class="panel-block"
    >
      <a>{{ post.title }}</a>
      <div>{{ post.created.format("Do MMM") }}</div>
    </TimelinePost>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import moment from "moment";
import { Post } from "@/mocks";
import { useStore } from "@/store";
import TimelinePost from "./TimelinePost.vue";

type Period = "Today" | "This Week" | "This Month";

export default defineComponent({
  name: "TimeLine",
  components: {
    TimelinePost
  },

  async setup() {
    const periods: Period[] = ["Today", "This Week", "This Month"];
    const currentPeriod = ref<Period>("Today");
    const store = useStore()

    if(!store.getState().posts.loaded){
      await store.fetchPosts()
    }

    const allPosts: Post[] = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const thePost = store.getState().posts.all.get(id)
      if(!thePost) {
        throw new Error('This post was not found')
      }
      return acc.concat(thePost)
    }, [])

    const posts = computed(() => {
      return allPosts.filter(post => {
        if (currentPeriod.value === "Today") {
          return post.created.isAfter(moment().subtract(1, "days"));
        }
        if (currentPeriod.value === "This Week") {
          return post.created.isAfter(moment().subtract(1, "week"));
        }
        if (currentPeriod.value === "This Month") {
          return post.created.isAfter(moment().subtract(1, "month"));
        }
      });
    });

    const setPeriod = (period: Period) => {
      currentPeriod.value = period;
    };

    return {
      posts,
      periods,
      currentPeriod,
      setPeriod
    };
  }
});
</script>

<style scoped></style>
