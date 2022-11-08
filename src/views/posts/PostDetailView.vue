<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ post.createdAt }}
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
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deletePost, getPostById } from "@/api/posts";
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
const post = ref({});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id);
    setPost(data);
  } catch (err) {
    console.error(err);
  }
};
const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};

fetchPost();
const remove = async () => {
  try {
    if (confirm("삭제 하시겠습니까?")) {
      await deletePost(props.id);
      router.push({ name: "PostList" });
    }
  } catch (err) {
    console.error(err);
  }
};
const goListPage = () => router.push({ name: "PostList" });
const goEditPage = () =>
  router.push({ name: "PostEdit", params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
