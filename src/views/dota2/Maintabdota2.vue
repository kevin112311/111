<script setup lang="ts">
  import {getcookie}from '../../script/func'
  import GameIcon from '.././GameIcon.vue'
  import '../../assets/css/main.scss'
  import { ref } from 'vue';

  const ccc = getcookie("game")
  var game = "dota2"
  const list = ["cs2","data2","lol","valorant","tft"]
  if(ccc != null){
    if(ccc in list){
      game = ccc
    }
  }
</script>

<template>
  <div>
    <div class="top-bar">
      <div class = "choose-game">
        <GameIcon :message=game>
        </GameIcon>
      </div>
      <div class = "input-info">

      </div>
      <div class = "choose-seach">

      </div>
    </div>
    <div class="mid-bar">
    </div>
    <div class="bottom-bar">

    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Maintab-lol',
};
</script>