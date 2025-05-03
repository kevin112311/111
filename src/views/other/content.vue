<template>
    <div class="post-content">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class = "blog-content-main">
        <h1 class = "blog-headline1" >{{ post.title }}</h1>
        <div v-for="(block, index) in parsedContent" :key="index" class="blog-content">
          <h2 v-if="block.type === 'heading2'">{{ block.content }}</h2>
          <h3 v-if="block.type === 'heading3'">{{ block.content }}</h3>
          <p v-else-if="block.type === 'paragraph'" class = "paragraph">{{ block.content }}</p>
          <img  v-else-if="block.type === 'image'"  :src="getImageUrl(block.content)"  :alt="block.content" class="blog-image" >
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const post = ref(null)
  const loading = ref(true)
  const error = ref(null)


  const getImageUrl = (filename) => {
    return 'http://localhost:5000/uploadpic/' + filename +'?=t123'
}
  
  const parsedContent = computed(() => {
    try {
      return JSON.parse(post.value?.content || '[]')
    } catch {
      return []
    }
  })
  
  onMounted(async () => {
    try {
      const response = await axios.get(`/api/blogselectbyid/${route.params.id}`)
      post.value = response.data[0]
      console.log(post.value)
    } catch (err) {
      error.value = 'Failed to load post content'
      console.error(err)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  .post-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  .error {
    color: red;
  }
  .blog-content-main{
    display: flex;
    flex-direction: column;
  }
  .blog-headline1{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .blog-image{
    display: block; 
    margin: 0 auto; 
    width: 50%;    
  }
  .blog-content{
    display: flex;
  }
  h2{
    font-size: 1.5em;
    margin: 0.5em 0;
  }
  h3{
    font-size: 1.2em;
    margin: 0.5em 0;
  }
  .heading2{
  }
  .heading3{
  }
  .paragraph{
    text-indent: 2em;
  }
  </style>