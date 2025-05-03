<template>
    <editor
      :id="editorId"
      v-model="editorContent"
      :init="config"
      @change="onEditorChange"
    />
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch, type Ref} from 'vue';
  //import { Editor } from '@tinymce/tinymce-vue';
  
  const props = defineProps({
    modelValue: String,
    config: Object,
    editorId: {
      type: String,
      default: () => 'tinymce-' + Math.random().toString(36).substring(2, 15), // 生成一个随机 ID
    },
  });
  
  const emit = defineEmits(['update:modelValue', 'change']);
  
  const editor = ref<any>(null);
  const editorContent:Ref<string|null|undefined> = ref<string>('');


  
  onMounted(() => {
    // 组件挂载后，如果 props 中有初始值，设置到 editorContent
    if (props.modelValue) {
      editorContent.value = props.modelValue;
    }
  });
  
  watch(editorContent, (newValue) => {
    // 当编辑器内容变化时，更新 v-model 绑定的值
    emit('update:modelValue', newValue);
    emit('change', newValue);
  });
  
  watch(
    () => props.modelValue,
    (newValue) => {
      // 当父组件传递的 modelValue 变化时，更新编辑器内容
      if (newValue !== editorContent.value && editor.value && !editor.value.isDirty()) {
        editorContent.value = newValue;
      }
    }
  );
  
  const onEditorChange = (event: any) => {
    // 可以根据需要处理 change 事件
    // console.log('Editor content was changed:', event.target.getContent());
  };
  </script>
<script lang="ts">
  export default {
    name: 'vue-tiny',
  };
</script>