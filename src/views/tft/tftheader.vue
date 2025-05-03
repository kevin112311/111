<script setup lang="ts">
  import {getcookie}from '../../script/func'
  import GameIcon from '.././GameIcon.vue'
  import '../../assets/css/main.scss'
  import { ref } from 'vue';
import Searchtft from './searchtft.vue';
import Tftgameinfo from './tftgameinfo.vue';
import Logview  from '../other/Logview.vue';

  const ccc = getcookie("game")
  var game = "tft"
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
        <Tftgameinfo></Tftgameinfo>
      </div>
      <div class = "save-info">
        <Logview></Logview>
      </div>
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
  name: 'tft-header',
};
</script>