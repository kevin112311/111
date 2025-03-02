<script setup lang="ts">
import '../../assets/css/main.scss'
import { getcookie, getloldata, goodexpforriotid } from '../../script/func'
</script>
<script lang="ts">
export default {
  name: 'Search-lol',
  methods: {
    search() {
      const input = document.getElementById('lol-input') as HTMLInputElement;
      if (input !== null) {
        if (goodexpforriotid(input.value)) {
          const inputval = input.value.split('#');
          if (inputval.length === 2) {
            const region = document.getElementById('lol-region') as HTMLSelectElement;
            getloldata(region.value, inputval[0], inputval[1]);
            window.location.href = '/lol/s/' + region.value + '%2B' + inputval[0] + '%23' + inputval[1];
          }
        }
      }
    }
  }
};
</script>
<template>
  <p class='sp-ziti'>隐私保护</p>
  <p class='sp-ziti'>不会收集用户的任何数据</p>
  <div class="search-main">
    <div class="custom-select-wrapper">
      <select id='lol-region' class='seachbar'>
        <option value="KR">KR</option>
        <option value="JP">JP</option>
        <option value="AMERICAS">AMERICAS</option>
        <option value="EUROPE">EU</option>
        <option value="SEA">SEA</option>
      </select>
    </div>
    <input type="text" id='lol-input' class='seachinput' placeholder="输入你的用户名加id" />
    <button @click="search" class='searchbutton'>
      <img src="../../assets/pic/search.svg" alt="搜索" />
    </button>
  </div>
</template>