<template>
  <div>
    <h2>게시글목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeLimit"
    />
    <hr class="my-4" />

    <app-loading v-if="loading" />

    <app-error v-else-if="error" :message="error.message" />

    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">No Results</p></template
    >
    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="(page) => (params._page = page)"
      />
    </template>

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>

    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostModal from "@/components/posts/PostModal.vue";
import PostFilter from "@/components/posts/PostFilter.vue";
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";

// import { getPosts } from "@/api/posts";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAxios } from "@/hooks/useAxios";
const router = useRouter();

const previewId = ref(null);
const selectPreview = (id) => (previewId.value = id);

const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _limit: 6,
  _page: 1,
  title_like: "",
});
const changeLimit = (value) => {
  params.value._limit = value;
  params.value._page = 1;
};
const {
  data: posts,
  error,
  loading,
  response,
} = useAxios("/posts", { params });
const isExist = computed(() => posts.value && posts.value.length > 0);
// pagination
const totalCount = computed(() => response.value.headers["x-total-count"]);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);
// const fetchPosts = async () => {
//   try {
//     loading.value = true;
//     // ({data:posts.value}=await getPosts())
//     const { data, headers } = await getPosts(params.value);
//     posts.value = data;
//     totalCount.value = headers["x-total-count"];
//   } catch (err) {
//     error.value = err;
//   } finally {
//     loading.value = false;
//   }
// getPosts()
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };
// fetchPosts();
// watchEffect(fetchPosts);
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

// modal
const show = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
const modalCreatedAt = ref("");

const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
