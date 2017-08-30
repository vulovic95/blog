import axios from "axios";

export function getCommentsByPostId(id) {
    const request = axios.get(`api/posts/${id}/comments`);
    return {
        type: "GET_COMMENTS_BY_POST_ID",
        payload: request
    }
}

export function addComment(data) {
    const request = axios.post(`api/comments`, data);
    return {
        type: "ADD_COMMENT",
        payload: request
    }
}

export function deleteComment(id) {
    const request = axios.delete(`api/comments/${id}`);
    return {
        type: "DELETE_COMMENT",
        payload: request
    }
}
