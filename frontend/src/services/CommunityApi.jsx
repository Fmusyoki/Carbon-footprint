const API_BASE_URL = 'http://localhost:5000/api/community';

export const communityApi = {
  // Get all posts
  async getPosts() {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  },

  // Create new post
  async createPost(postData, token) {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    if (!response.ok) throw new Error('Failed to create post');
    return await response.json();
  },

  // Like/unlike post
  async likePost(postId, token) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to like post');
    return await response.json();
  },

  // Add comment
  async addComment(postId, commentText, token) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text: commentText })
    });
    if (!response.ok) throw new Error('Failed to add comment');
    return await response.json();
  },

  // Get user posts
  async getUserPosts(userId) {
    const response = await fetch(`${API_BASE_URL}/posts/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user posts');
    return await response.json();
  }
};