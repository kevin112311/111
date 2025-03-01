<script setup lang="ts">
  import '../../assets/css/main.scss'
  import {goodexpforriotid} from '../../script/func.d.js';
</script>
<script lang="ts">
export default {
  name: 'search-valorant',
  methods: {
    search(){
      const input = document.getElementById('val-input') as HTMLInputElement;
      if(input !== null){
        if(goodexpforriotid(input.value)){
          return 0;
        }
      }
    }
  }
};
</script>
<template>
  <p class = 'sp-ziti'>隐私保护</p>
  <p class = 'sp-ziti'>不会收集用户的任何数据</p>
  <div class = "search-main">
  <div class = "custom-select-wrapper">
    <select id = 'lol-region' class = 'seachbar'>
      <option value="ASIA">ASIA</option>
      <option value="AMERICAS">AMERICAS</option>
      <option value="EUROPE">EUROPE</option>
      <option value="SEA">SEA</option>
    </select>
  </div>
    <input type="text" id = 'val-input' class = 'seachinput' placeholder="输入你的用户名加id"/>
    <button @click= "search" class = 'searchbutton'>
      <img src = "../../assets/pic/search.svg" alt="搜索" />
    </button>
</div>
</template>