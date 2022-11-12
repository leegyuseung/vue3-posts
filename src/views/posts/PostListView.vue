<template>
  <div>
    <h2>게시글목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />
    <hr class="my-4" />
    <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
        ></PostItem>
      </template>
    </AppGrid>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="(page) => (params._page = page)"
    />
    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import AppCard from "@/components/AppCard.vue";
import AppGrid from "@/components/AppGrid.vue";
import AppPagination from "@/components/AppPagination.vue";
import PostFilter from "@/components/posts/PostFilter.vue";
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";

import { getPosts } from "@/api/posts";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const posts = ref([]);
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _limit: 3,
  _page: 1,
  title_like: "",
});
// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);
const fetchPosts = async () => {
  try {
    // ({data:posts.value}=await getPosts())
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers["x-total-count"];
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
// fetchPosts();
watchEffect(fetchPosts);
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
