// import axios from "axios";
import { posts } from ".";
// axios

export function getPosts(params) {
  return posts.get("/", { params });
}

export function getPostById(id) {
  return posts.get(`/${id}`);
}

export function createPost(data) {
  return posts.post("", data);
}

// export function updatePost(id, data) {
//   return posts.put(`/${id}`, data);
// }

// 일부 데이터만 수정하려면 put이 아닌 patch 사용해야한다.
export function updatePost(id, data) {
  return posts.patch(`/${id}`, data);
}

export function deletePost(id) {
  return posts.delete(`/${id}`);
}
