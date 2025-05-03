<template>
    <div class="post-list">
      <h1>My Blog</h1>
      <p>---{{ userName }}</p>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <ul v-else>
        <li v-for="post in posts" :key="post.id">
          <router-link :to="`/content/${post.id}`"><span>{{post.id}}</span> {{ post.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const posts = ref([])
  const loading = ref(true)
  const error = ref(null)
  const token = localStorage.getItem('token');
  const userName = ref('')
  onMounted(async () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
        try {
            const payload = JSON.parse(atob(storedToken.split('.')[1]))
            userName.value = payload.name || '用户'
         } catch (e) {
      console.error('Token解析错误:', e)
    }
  }
    try {   
      const response = await axios.get('/api/blogselect', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      posts.value = response.data
      console.log(posts.value)
    } catch (err) {
      error.value = 'Failed to load posts'
      console.error(err)
    } finally {
      loading.value = false
    }
  })
  </script>
  <style scoped>
  .post-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
  }
  a {
    text-decoration: none;
    color: #2c3e50;
  }
  a:hover {
    text-decoration: underline;
  }
  .error {
    color: red;
  }
  </style>