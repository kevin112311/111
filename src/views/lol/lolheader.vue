<script setup lang="ts">
  import {getcookie}from '../../script/func'
  import GameIcon from '.././GameIcon.vue'
  import '../../assets/css/main.scss'
  import { ref } from 'vue';
import Gameinfo from './gameinfo.vue';
import Searchlol from './Searchlol.vue';
import {jwtDecode} from "jwt-decode"; 
import Logview  from '../other/Logview.vue';

  const ccc = getcookie("game")
  var game = "lol"
  const list = ["cs2","data2","lol","valorant","tft"]
  if(ccc != null){
    if(ccc in list){
      game = ccc
    }
  }
  const gameicon = ref(game)
  console.log("0");
  const token = localStorage.getItem('token');
  if(token != null){
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  }
  
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
        <!--
        <a href="/login">登陆</a>-->
        <Logview></Logview>
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