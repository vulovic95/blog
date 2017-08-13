import axios from "axios";

export function getCommentsByPostId(id) {
    const request = axios.get(`http://localhost:3000/api/posts/${id}/comments`); 
    return {
        type: "GET_COMMENTS_BY_POST_ID",
        payload: request
    }
} 

export function addComment(data) {
    const request = axios.post(`http://localhost:3000/api/comments`, data);
    return {
        type: "ADD_COMMENT",
        payload: request
    }
} 

export function deleteComment(id) {
    const request = axios.delete(`http://localhost:3000/api/comments/${id}`);
    return {
        type: "DELETE_COMMENT",
        payload: request
    }
}