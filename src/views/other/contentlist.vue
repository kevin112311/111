<template>
    <div class="blog-container">
      <h1>博客列表</h1>
      
      <div v-if="loading" class="loading">加载中...</div>
      
      <div v-else>
        <div v-for="blog in blogs" :key="blog.id" class="blog-item">
          <h2>{{ blog.title }}</h2>
          <p class="meta">作者: {{ blog.username }} | 发布时间: {{ formatDate(blog.time) }}</p>
          <div class="content">{{ blog.content }}</div>
        </div>
        
        <div class="pagination">
          <button 
            @click="goToPage(currentPage - 1)" 
            :disabled="currentPage === 1"
          >
            上一页
          </button>
          
          <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
          
          <button 
            @click="goToPage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const blogs = ref([]);
      const loading = ref(true);
      const currentPage = ref(1);
      const totalPages = ref(1);
  
      // 获取总页数
      const fetchTotalPages = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/blog/total-pages');
          totalPages.value = response.data.totalPages;
          // 初始加载最后一页
          currentPage.value = totalPages.value;
        } catch (error) {
          console.error('获取总页数失败:', error);
        }
      };
  
      // 获取博客内容
      const fetchBlogs = async () => {
        loading.value = true;
        try {
          const response = await axios.get('http://localhost:5000/api/blog/content', {
            params: { page: currentPage.value }
          });
          blogs.value = response.data;
        } catch (error) {
          console.error('获取博客内容失败:', error);
        } finally {
          loading.value = false;
        }
      };
  
      // 切换页面
      const goToPage = (page) => {
        if (page < 1 || page > totalPages.value) return;
        currentPage.value = page;
        fetchBlogs();
      };
  
      // 格式化日期
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('zh-CN', options);
      };
  
      onMounted(async () => {
        await fetchTotalPages();
        await fetchBlogs();
      });
  
      return {
        blogs,
        loading,
        currentPage,
        totalPages,
        goToPage,
        formatDate
      };
    }
  };
  </script>
  
  <style scoped>
  .blog-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .blog-item {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .meta {
    color: #666;
    font-size: 0.9em;
  }
  
  .content {
    margin-top: 10px;
    line-height: 1.6;
  }
  
  .pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  
  button {
    padding: 5px 15px;
    cursor: pointer;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .loading {
    text-align: center;
    padding: 50px;
  }
  </style>