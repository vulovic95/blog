import axios from "axios";
export function getAllPosts() {
    const request = axios.get(`http://localhost:3000/api/posts`); 
    return {
        type: "GET_ALL_POSTS",
        payload: request
    }
} 
export function getPostById(id) {
    const request = axios.get(`http://localhost:3000/api/posts/${id}`); 
    return {
        type: "GET_POST_BY_ID",
        payload: request
    }
}
export function getUserPosts(email) {
    const request = axios.get(`http://localhost:3000/api/posts/email/${email}`); 
    return {
        type: "GET_USER_POSTS",
        payload: request
    }
}
export function deletePost(id) {
    const request = axios.delete(`http://localhost:3000/api/posts/${id}`);
    return {
        type: "DELETE_POST",
        payload: request
    }
}
export function addPost(data) {
    const request = axios.post(`http://localhost:3000/api/posts/`, data);
    return {
        type: "ADD_POST",
        payload: request
    }
}
export function updatePost(id,data) {
    const request = axios.patch(`http://localhost:3000/api/posts/${id}`, data);
    return {
        type: "UPDATE_POST",
        payload: request
    }
}

export function getTagsByPostId(id) {
    const request = axios.get(`http://localhost:3000/api/posts/${id}/tags`); 
    return {
        type: "GET_TAGS_BY_POST_ID",
        payload: request
    }
} 

export function getTutorialsByPostId(id) {
    const request = axios.get(`http://localhost:3000/api/posts/${id}/tutorials`); 
    return {
        type: "GET_TUTORIALS_BY_POST_ID",
        payload: request
    }
} 
/*export function getCommentsByPostId(id) {
    const request = axios.get(`http://localhost:3000/api/posts/${id}/comments`); 
    return {
        type: "GET_COMMENTS_BY_POST_ID",
        payload: request
    }
} */