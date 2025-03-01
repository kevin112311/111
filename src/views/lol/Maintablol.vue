<script setup lang="ts">
  import {getcookie}from '../../script/func'
  import GameIcon from '.././GameIcon.vue'
  import '../../assets/css/main.scss'
  import { ref } from 'vue';
import Gameinfo from './gameinfo.vue';
import Searchlol from './Searchlol.vue';

  const ccc = getcookie("game")
  var game = "lol"
  const list = ["cs2","data2","lol","valorant","tft"]
  if(ccc != null){
    if(ccc in list){
      game = ccc
    }
  }
  const gameicon = ref(game)
</script>

<template>
  <div class = "main-lol">
    <div class="top-bar">
      <div class = "choose-game">
        <GameIcon :message=game>
        </GameIcon>
      </div>
      <div class = "input-info">
        <Gameinfo></Gameinfo>
      </div>
      <div class = "save-info">
        <p>保存的信息</p>
      </div>
    </div>
    <div class="mid-bar">
      <div class = "mid-bar-main">
      <Searchlol></Searchlol>
    </div>
    </div>
    <div class="bottom-bar">

    </div>
  </div>
</template>

<style scoped>
.top-bar{
  width: 100%;
  background-color: #0C60C0;
  padding-bottom: 10px;
}
.main-lol{
    margin: 0;
}
</style>
<script lang="ts">
export default {
  name: 'Maintab-lol',
};
</script>