<template>
  <div>
    <h2>게시글목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
        ></PostItem>
      </div>
    </div>
    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="2"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import AppCard from "@/components/AppCard.vue";
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";

import { getPosts } from "@/api/posts";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const posts = ref([]);

const fetchPosts = async () => {
  try {
    // ({data:posts.value}=await getPosts())
    const { data } = await getPosts();
    posts.value = data;
  } catch (err) {
    console.error(err);
  }
  // getPosts()
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
fetchPosts();
const goPage = (id) => {
  // router.push(`/posts/${id}`);
  // http://localhost:5173/posts/1?searchText=hello#world
  router.push({
    name: "PostDetail",
    params: {
      id,
    },
    // query: {
    //   searchText: "hello",
    // },
    // hash: "#world",
  });
};
</script>

<style lang="scss" scoped></style>
