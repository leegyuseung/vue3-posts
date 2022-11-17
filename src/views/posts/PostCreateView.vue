<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글등록</h2>
    <hr class="my-4" />
    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { createPost } from "@/api/posts";
import { ref } from "vue";
import { useRouter } from "vue-router";
import PostForm from "@/components/posts/PostForm.vue";

const router = useRouter();
const form = ref({
  title: null,
  content: null,
});
const goListPage = () => {
  router.push({ name: "PostList" });
};
const visibleForm = ref(true);
const save = () => {
  try {
    createPost({
      ...form.value,
      createdAt: Date.now(),
    });
    router.push({ name: "PostList" });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped></style>
