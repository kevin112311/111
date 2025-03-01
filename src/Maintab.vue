<script setup lang="ts">
import {getcookie}from './script/func.js'
import GameIcon from './views/GameIcon.vue';
  const ccc = getcookie("game")
  var game = "cs2"
  const list = ["cs2","data2","lol","valorant",""]
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
        <GameIcon></GameIcon>
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
<script>
export default {
  name: 'MaintabCom',
};
</script>