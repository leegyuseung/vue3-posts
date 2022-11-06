<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">
      {{ form.createdAt }}
    </p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPostById } from "@/api/posts";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: Number,
});

const router = useRouter();
/* 
ref 장점) 객체할당을 할 수 있다. 일관성 단점) .value 로 접근해야한다.
reactive 장점) .value로 접근할 필요 없다. 단점) 객체할당 불가능 하나씩 입력해주어야한다.
*/
const form = ref({});

const fetchPost = () => {
  const data = getPostById(props.id);
  form.value = { ...data };
};
fetchPost();
const goListPage = () => router.push({ name: "PostList" });
const goEditPage = () =>
  router.push({ name: "PostEdit", params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
