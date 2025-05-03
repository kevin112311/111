<template>
  <div class="editor-container">
    <h2>编写游戏攻略</h2>

    <!-- 内容类型选择 -->
    <div class="add-block-row">
      <label for="block-type">内容类型：</label>
      <select id="block-type" v-model="selectedBlockType">
        <option value="heading1" :disabled="hasHeadingOne">一级标题</option>
        <option value="heading2" :disabled="contentBlocks.length === 0">二级标题</option>
        <option value="heading3" :disabled="contentBlocks.length === 0">三级标题</option>
        <option value="paragraph" :disabled="contentBlocks.length === 0">正文</option>
        <option value="image" :disabled="contentBlocks.length === 0">图片</option>
      </select>
    </div>

    <div class="textarea-row" v-if="selectedBlockType !== 'image'">
      <textarea 
        id="new-content" 
        v-model="newContent" 
        :placeholder="getPlaceholder()"
        @keydown.enter.exact.prevent="addBlock"
      ></textarea>
    </div>

    <div class="image-upload-row" v-else>
      <input 
        type="file" 
        id="image-upload" 
        ref="imageInput" 
        accept="image/*" 
        @change="handleImageUpload"
        style="display: none"
      >
      <button class="upload-button" @click="triggerImageUpload">
        {{ tempImageFile ? '更换图片' : '选择图片' }}
      </button>
      <div v-if="tempImageFile" class="image-preview">
        <img :src="tempImageFile.previewUrl" alt="预览图片" class="preview-image">
        <button class="remove-image-button" @click="removeTempImage">×</button>
      </div>
    </div>

    <div class="button-row">
      <button 
        class="add-button" 
        @click="addBlock()" 
        :disabled="isAddButtonDisabled"
        @keydown.enter.prevent
      >
        {{ selectedBlockType === 'image' ? '插入图片' : '添加内容' }}
      </button>
    </div>

    <hr>

    <h3>预览:</h3>
    <div class="preview">
      <div>
        <template v-for="(block, index) in contentBlocks" :key="index">
          <div class="block-container" :class="block.type">
            <div 
              class="block-content"
              @dblclick="startEditing(index)"
              v-if="!editingIndexes.includes(index)"
            >
              <div v-if="block.type === 'heading1'" class="heading-one">
                <button class="add-below-button" @click="addBlock(index)">+</button> 
                <span>{{ block.content }}</span>
                <button class="delete-button" @click="deleteBlock(index)">-</button> 
              </div>
              <div v-if="block.type === 'heading2'" class="heading-two">
                <button class="add-below-button" @click="addBlock(index)">+</button> 
                <span>{{ block.content }}</span>
                <button class="delete-button" @click="deleteBlock(index)">-</button> 
              </div>
              <div v-if="block.type === 'heading3'" class="heading-three">
                <button class="add-below-button" @click="addBlock(index)">+</button> 
                <span>{{ block.content }}</span>
                <button class="delete-button" @click="deleteBlock(index)">-</button> 
              </div>
              <div v-if="block.type === 'paragraph'" class="body-text">
                <button class="add-below-button" @click="addBlock(index)">+</button> 
                <span>{{ block.content }}</span>
                <button class="delete-button" @click="deleteBlock(index)">-</button> 
              </div>
              <div v-if="block.type === 'image'" class="image-container">
                <button class="add-below-button" @click="addBlock(index)">+</button> 
                <img :src="block.previewUrl" :alt="'攻略图片-' + index" class="content-image">
                <button class="delete-button" @click="deleteBlock(index)">-</button> 
              </div>
            </div>
            
            <!-- 编辑区域 -->
            <div v-else class="edit-container">
              <textarea 
                v-if="block.type !== 'image'"
                v-model="editingContent"
                @keydown.enter.exact.prevent="finishEditing(index)"
                @blur="finishEditing(index)"
                class="edit-textarea"
                autofocus
              ></textarea>
              
              <div v-else class="image-edit-container">
                <input 
                  type="file" 
                  @change="handleImageEdit"
                  ref="imageEditInput"
                  accept="image/*"
                >
                <button @click="cancelEditing(index)">取消</button>
                <button @click="finishEditing(index)">保存</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="save-button-container">
      <button class="save-button" @click="saveContent" :disabled="contentBlocks.length === 0">
        保存内容
      </button>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref, computed, nextTick } from 'vue';
  
  interface ImageBlock {
  type: 'image';
  content: File | string;  // 上传前是File，上传后是string URL
  previewUrl?: string;
}

interface TextBlock {
  type: 'heading1' | 'heading2' | 'heading3' | 'paragraph';
  content: string;
}

type ContentBlock = TextBlock | ImageBlock;
  
  interface TempImageFile {
    file: File;
    previewUrl: string;
  }
  
  // 响应式数据
  const contentBlocks = ref<ContentBlock[]>([]);
  const newContent = ref('');
  const selectedBlockType = ref<'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'image'>('heading1');
  const tempImageFile = ref<TempImageFile | null>(null);
  const imageInput = ref<HTMLInputElement | null>(null);
  const editingIndexes = ref<number[]>([]);
  const editingContent = ref<string | File>('');
  const editingPreviewUrl = ref<string>('');
  const imageEditInput = ref<HTMLInputElement | null>(null);
  
  // 计算属性
  const hasHeadingOne = computed(() => contentBlocks.value.some(block => block.type === 'heading1'));
  const isAddButtonDisabled = computed(() => {
    if (selectedBlockType.value === 'image') return !tempImageFile.value;
    return !newContent.value.trim();
  });
  
  // 方法
  const getPlaceholder = () => {
    switch (selectedBlockType.value) {
      case 'heading1': return '请输入一级标题...';
      case 'heading2': return '请输入二级标题...';
      case 'heading3': return '请输入三级标题...';
      case 'paragraph': return '请输入正文内容...';
      default: return '';
    }
  };
  
  const triggerImageUpload = () => {
    imageInput.value?.click();
  };
  
  const handleImageUpload = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // 验证图片大小 (例如不超过5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        return;
      }
      
      // 创建临时文件和预览URL
      tempImageFile.value = {
        file,
        previewUrl: URL.createObjectURL(file)
      };
    }
  };
  
  const removeTempImage = () => {
    if (tempImageFile.value) {
      URL.revokeObjectURL(tempImageFile.value.previewUrl);
      tempImageFile.value = null;
    }
    if (imageInput.value) {
      imageInput.value.value = '';
    }
  };
  
  const addBlock = (index?: number) => {
    if (selectedBlockType.value === 'image') {
      if (!tempImageFile.value) {
        alert('请先选择图片。');
        return;
      }
      
      const newBlock: ContentBlock = {
        type: 'image',
        content: tempImageFile.value.file,
        previewUrl: tempImageFile.value.previewUrl
      };
      
      if (index == undefined || isNaN(index)) {
        contentBlocks.value.push(newBlock);
      } else {
        if (index >= 0) {
          contentBlocks.value.splice(index + 1, 0, newBlock);
        }
      }
      removeTempImage();
    } else {
      if (!newContent.value.trim()) {
        alert('请输入内容。');
        return;
      }
      
      if (selectedBlockType.value === 'heading1' && hasHeadingOne.value) {
        alert('一篇文章只能有一个一级标题。');
        return;
      }
      
      const newBlock: ContentBlock = {
        type: selectedBlockType.value,
        content: newContent.value.trim()
      };
      
      if (index == undefined || isNaN(index)) {
        contentBlocks.value.push(newBlock);
      } else {
        if (index >= 0) {
          contentBlocks.value.splice(index + 1, 0, newBlock);
        }
      }
      newContent.value = '';
    }
    
    // 默认下一项为段落
    if (selectedBlockType.value !== 'image') {
      selectedBlockType.value = 'paragraph';
    }
  };
  
  const deleteBlock = (index: number) => {
    const block = contentBlocks.value[index];
    // 如果是图片且是 File 对象，释放预览URL
    if (block.type === 'image' && block.previewUrl) {
      URL.revokeObjectURL(block.previewUrl);
    }
    contentBlocks.value.splice(index, 1);
  };
  
  const startEditing = (index: number) => {
    const block = contentBlocks.value[index];
    if (block.type === 'image') {
      editingIndexes.value.push(index);
      editingContent.value = block.content;
      editingPreviewUrl.value = block.previewUrl || '';
    } else {
      editingIndexes.value.push(index);
      editingContent.value = block.content as string;
      
      nextTick(() => {
        const textarea = document.querySelector('.edit-textarea') as HTMLTextAreaElement;
        if (textarea) textarea.focus();
      });
    }
  };
  
  const handleImageEdit = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      editingContent.value = file;
      editingPreviewUrl.value = URL.createObjectURL(file);
    }
  };
  
  const finishEditing = (index: number) => {
    const block = contentBlocks.value[index];
    
    if (block.type === 'image') {
      if (editingContent.value) {
        // 释放旧图片预览URL
        if (block.previewUrl) {
          URL.revokeObjectURL(block.previewUrl);
        }
        
        contentBlocks.value[index] = {
          type: 'image',
          content: editingContent.value as File,
          previewUrl: editingPreviewUrl.value
        };
      }
    } else {
      if (typeof editingContent.value === 'string' && editingContent.value.trim()) {
        contentBlocks.value[index].content = editingContent.value.trim();
      }
    }
    
    editingIndexes.value = editingIndexes.value.filter(i => i !== index);
    editingContent.value = '';
    editingPreviewUrl.value = '';
  };
  
  const cancelEditing = (index: number) => {
    // 如果是图片编辑且创建了新预览URL，释放它
    if (editingPreviewUrl.value) {
      URL.revokeObjectURL(editingPreviewUrl.value);
    }
    
    editingIndexes.value = editingIndexes.value.filter(i => i !== index);
    editingContent.value = '';
    editingPreviewUrl.value = '';
  };
  
  const saveContent = async () => {
  if (contentBlocks.value.length === 0) {
    alert('请添加一些内容后再保存。');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert('请先登录');
    return;
  }

  try {
    
    // 1. 上传所有图片
    const imageBlocks = contentBlocks.value.filter(b => b.type === 'image');
    const uploadPromises = imageBlocks.map(async (block) => {
      // 如果已经是URL（之前上传过），跳过
      if (typeof block.content === 'string') return;

      const formData = new FormData();
      formData.append('image', block.content);

      // 增强的请求处理
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      // 检查响应状态
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`上传失败: ${uploadResponse.status} - ${errorText}`);
      }

      // 安全解析JSON
      let result;
      try {
        result = await uploadResponse.json();
      } catch (parseError) {
        console.error('JSON解析失败:', parseError);
        throw new Error('服务器返回了无效的响应格式');
      }

      if (!result.success || !result.urls?.[0]) {
        throw new Error(result.message || '上传失败: 无效的服务器响应');
      }
    });
    
  
    // 2. 保存文章内容
    const title = contentBlocks.value.find(b => b.type === 'heading1')?.content || '未命名文章';
    const saveResponse = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        blocks: contentBlocks.value.map(block => ({
          type: block.type,
          content: block.type === 'image' && typeof block.content === 'string' 
            ? block.content 
            : block.type === 'image' && block.content instanceof File
            ? block.content.name
              : block.type !== 'image' 
              ?block.content 
              : ''
        }))
      })
    });
    
    // 检查保存响应
    if (!saveResponse.ok) {
      const errorText = await saveResponse.text();
      throw new Error(`保存失败: ${saveResponse.status} - ${errorText}`);
    }

    const saveResult = await saveResponse.json();
    if (!saveResult.success) {
      throw new Error(saveResult.message || '保存失败');
    }

    // 清理资源
    contentBlocks.value.forEach(block => {
      if (block.type === 'image' && block.previewUrl && typeof block.content !== 'string') {
        URL.revokeObjectURL(block.previewUrl);
      }
    });

    // 重置编辑器
    contentBlocks.value = [];
    newContent.value = '';
    selectedBlockType.value = 'heading1';
    
    alert('保存成功！');
  } catch (error) {
    console.error('保存失败:', error);
    
    // 更友好的错误提示
    let errorMessage = '保存失败';
    if (error instanceof Error) {
      if (error.message.includes('413')) {
        errorMessage = '文件大小超过限制(5MB)';
      } else if (error.message.includes('401')) {
        errorMessage = '登录已过期，请重新登录';
      } else {
        errorMessage = error.message;
      }
    }
    
    alert(errorMessage);
  }
};
  </script>
  
  <style scoped>
  .editor-container {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
  }
  
  .editor-container h2 {
    margin-bottom: 20px;
  }
  
  .add-block-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .add-block-row label {
    flex-shrink: 0;
    width: 120px;
    margin-right: 10px;
    font-weight: bold;
    text-align: left;
  }
  
  .add-block-row select {
    flex-grow: 1;
    max-width: 260px;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .textarea-row {
    margin-bottom: 10px;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  textarea {
    width: 400px;
    height: 40px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  
  .image-upload-row {
    width: 400px;
    margin: 0 auto 10px;
    text-align: left;
  }
  
  .upload-button {
    padding: 8px 15px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .upload-button:hover {
    background-color: #0b7dda;
  }
  
  .image-preview {
    position: relative;
    margin-top: 10px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .preview-image {
    max-width: 100%;
    max-height: 150px;
    display: block;
  }
  
  .remove-image-button {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 25px;
    height: 25px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .button-row {
    margin-bottom: 10px;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .preview {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    margin-top: 20px;
    text-align: left;
  }
  
  .preview h3 {
    text-align: center;
  }
  
  .block-container {
    position: relative;
    margin-bottom: 10px;
    padding-left: 30px;
  }
  
  .block-controls {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .add-below-button, .delete-button {
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding: 0;
  }
  
  .add-below-button {
    background-color: #4CAF50;
    color: white;
  }
  
  .delete-button {
    background-color: #ff4444;
    color: white;
  }
  
  .block-content {
    cursor: text;
    min-height: 20px;
  }
  
  .heading-one {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 1em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
  }
  
  .heading-two {
    font-size: 1.2em;
    margin-top: 1em;
    margin-bottom: 0.5em;
    display: flex;
    flex-direction: row;
    font-family: 'Poppins', sans-serif;
  }
  
  .heading-three {
    font-size: 1em;
    margin-top: 1em;
    margin-bottom: 0.5em;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: row;
  }
  
  .body-text {
    text-indent: 2em;
    margin-bottom: 0.5em;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: row;
  }
  
  .image-container {
    margin: 1em 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .content-image {
    max-width: 100%;
    max-height: 400px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .edit-container {
    margin: 10px 0;
  }
  
  .edit-textarea {
    width: 100%;
    min-height: 100px;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: inherit;
  }
  
  .image-edit-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .save-button-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .add-button,
  .save-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .add-button:hover,
  .save-button:hover {
    background-color: #45a049;
  }
  
  .add-button:disabled,
  .save-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>