<template>
  <div class="upload-container">
    <input 
      type="file" 
      ref="fileInput" 
      @change="handleFileChange" 
      accept="image/*" 
      multiple
      style="display: none"
      name="image"
    >
    <button @click="triggerFileInput" class="upload-btn">选择图片</button>
    
    <div v-if="previewImages.length > 0" class="preview-container">
      <div class="preview-grid">
        <div v-for="(image, index) in previewImages" :key="index" class="preview-item">
          <img :src="image.url" alt="预览" class="preview-image">
          <button @click="removeFile(index)" class="remove-btn">×</button>
        </div>
      </div>
      <div class="action-buttons">
        <button @click="uploadImages" class="upload-btn">上传全部</button>
        <button @click="cancelUpload" class="cancel-btn">取消</button>
      </div>
    </div>
    
    <div v-if="uploadProgress > 0" class="progress-container">
      <div class="progress-bar" :style="{ width: `${uploadProgress}%` }"></div>
      <span class="progress-text">{{ uploadProgress }}%</span>
    </div>
    
    <div v-if="uploadStatus" class="status-message" :class="{ error: isError }">
      {{ uploadStatus }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import type { AxiosProgressEvent } from 'axios';

interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

interface PreviewImage {
  url: string;
  file: File;
}

export default {
  name: 'MultiImageUploader',
  
  emits: ['upload-success', 'upload-error'],
  
  setup(props, { emit }) {
    const fileInput = ref<HTMLInputElement | null>(null);
    const selectedFiles = ref<File[]>([]);
    const previewImages = ref<PreviewImage[]>([]);
    const uploadProgress = ref<number>(0);
    const uploadStatus = ref<string>('');
    const isError = ref<boolean>(false);

    const triggerFileInput = () => {
      fileInput.value?.click();
    };

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      
      if (!files || files.length === 0) return;
      
      // 验证每个文件
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('image/')) {
          setStatus(`文件 ${file.name} 不是有效的图片`, true);
          continue;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          setStatus(`文件 ${file.name} 大小不能超过5MB`, true);
          continue;
        }
        
        // 避免重复添加
        if (!selectedFiles.value.some(f => f.name === file.name && f.size === file.size && f.lastModified === file.lastModified)) {
          selectedFiles.value.push(file);
          createPreview(file);
        }
      }
    };

    const createPreview = (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.value.push({
          url: e.target?.result as string,
          file: file
        });
      };
      reader.readAsDataURL(file);
    };

    const removeFile = (index: number) => {
      previewImages.value.splice(index, 1);
      selectedFiles.value.splice(index, 1);
    };

    const uploadImages = async () => {
      if (selectedFiles.value.length === 0) return;
      
      const formData = new FormData();
      selectedFiles.value.forEach(file => {
        formData.append('image', file); // 注意字段名改为复数形式
      });
      
      try {
        setStatus(`正在上传 ${selectedFiles.value.length} 个文件...`, false);
        uploadProgress.value = 0;
        
        const response = await axios.post<UploadResponse[]>('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              uploadProgress.value = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            }
          }
        });
      
        setStatus(`${selectedFiles.value.length} 个文件上传成功!`, false);        
        setTimeout(resetUploader, 3000);
        
      } catch (error) {
        console.error('上传失败:', error);
        let errorMessage = '上传失败';
        
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        setStatus(`上传失败: ${errorMessage}`, true);
        emit('upload-error', error);
      }
    };

    const cancelUpload = () => {
      resetUploader();
    };

    const resetUploader = () => {
      selectedFiles.value = [];
      previewImages.value = [];
      uploadProgress.value = 0;
      uploadStatus.value = '';
      isError.value = false;
      if (fileInput.value) {
        fileInput.value.value = '';
      }
    };

    const setStatus = (message: string, error: boolean) => {
      uploadStatus.value = message;
      isError.value = error;
    };

    return {
      fileInput,
      previewImages,
      uploadProgress,
      uploadStatus,
      isError,
      triggerFileInput,
      handleFileChange,
      uploadImages,
      cancelUpload,
      removeFile
    };
  }
};
</script>

<style scoped>
.upload-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.upload-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #d32f2f;
}

.preview-container {
  margin-top: 20px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.preview-item {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.remove-btn:hover {
  opacity: 1;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.progress-container {
  margin-top: 15px;
  height: 20px;
  background-color: #e1e1e1;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  font-size: 12px;
}

.status-message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  background-color: #e8f5e9;
  color: #2e7d32;
  text-align: center;
}

.status-message.error {
  background-color: #ffebee;
  color: #c62828;
}
</style>