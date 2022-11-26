<template>
  <div>
    <h2>About View</h2>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="$router.push('/')">
      Home으로 이동
    </button>
    <h2>Store</h2>
    <p>counter:{{ counter }}</p>
    <p>doubleCounter:{{ doubleCounter }}</p>
    <p>doubleCounterPlusOne:{{ doubleCounterPlusOne }}</p>
    <button @click="increment()">Click</button>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const route = useRoute();
console.log("route.path:", route.path);

const store = useCounterStore();
console.log(store);

// 반응성을 유지
const { counter, doubleCounter, doubleCounterPlusOne } = storeToRefs(store);
const { increment } = store;
// counter.value = 100;
// increment();
</script>

<style lang="scss" scoped></style>
