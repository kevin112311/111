<script setup lang="ts">
import '../../assets/css/main.scss'
  import GameIcon from '.././GameIcon.vue'
  import Gameinfo from './gameinfo.vue';
const game = "lol"
</script>
<template>
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
</template>
<script lang="ts">
export default {
  name: 'lol-header',
  props: ['path'], 
}
</script>