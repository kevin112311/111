<script setup lang="ts">
  import {getcookie}from '../../script/func'
  import GameIcon from '.././GameIcon.vue'
  import '../../assets/css/main.scss'
  import { ref } from 'vue';
import Searchvalorant from './searchvalorant.vue';
import Gameinfo from '../lol/gameinfo.vue';
  const ccc = getcookie("game")
  var game = "valorant"
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
      <Searchvalorant></Searchvalorant>
    </div>
    </div>
    <div class="bottom-bar">

    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Maintab-valorant',
};
</script>
<style scoped>
.top-bar{
  width: 100%;
  background-color: red;
  padding-bottom: 10px;
}
.main-lol{
    margin: 0;
}
</style>