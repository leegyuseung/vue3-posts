<template>
  <app-loading v-if="loading" />

  <app-error v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>id: {{ props.id }}, isOdd:{{ isOdd }}</p>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format("YYYY. MM. DD HH:mm:ss") }}
    </p>
    <hr class="my-4" />
    <app-error v-if="removeError" :message="removeError.message" />
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
        <button
          class="btn btn-outline-danger"
          @click="remove"
          :disabled="removeLoading"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
        <button class="btn btn-primary"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useAlert } from "@/composables/alert";
import { useAxios } from "@/hooks/useAxios";
import { useNumber } from "@/composables/number";

const { vAlert, vSuccess } = useAlert();
const props = defineProps({
  id: [String, Number],
});

const router = useRouter();
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef);
/*
ref 장점) 객체할당을 할 수 있다. 일관성 단점) .value 로 접근해야한다.
reactive 장점) .value로 접근할 필요 없다. 단점) 객체할당 불가능 하나씩 입력해주어야한다.
*/
const url = computed(() => `/posts/${props.id}`);
const { error, loading, data: post } = useAxios(url);

const {
  error: removeError,
  loading: removeLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: "delete" },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess("삭제가 완료되었습니다.");
      router.push({ name: "PostList" });
    },
    onError: (err) => {
      vAlert(err.message);
    },
  }
);

const remove = async () => {
  if (confirm("삭제 하시겠습니까?")) {
    return;
  }
  execute();
};

const goListPage = () => router.push({ name: "PostList" });
const goEditPage = () =>
  router.push({ name: "PostEdit", params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
