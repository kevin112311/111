<script setup lang="ts">
  import {getcookie,getlolphb,getname}from '../../../script/func'
  import GameIcon from '../.././GameIcon.vue'
  import '../../../assets/css/main.scss'
  import { ref,onMounted  } from 'vue';
  import Lolpuuidtoname from './Lolpuuidtoname.vue';
import Gameinfo from '.././gameinfo.vue';
import type { phbdata } from '@/script/data';

  const ccc = getcookie("game")
  var game = "lol"
  const list = ["cs2","data2","lol","valorant","tft"]
  if(ccc != null){
    if(ccc in list){
      game = ccc
    }
  }
  const gameicon = ref(game)
  const phddata = ref<phbdata | null>(null);
  onMounted(async () => {
  phddata.value = await getlolphb();
});
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
        <p>登陆</p>
      </div>
    </div>
    <div class="mid-bar"> 
      <div v-if="phddata!=null"  class = "mid-bar-main">
        <p>段位王者</p>
        <li v-for="(phb,index) in phddata.entries.slice(0,20)" :key="index">
          <div class = "l1"><Lolpuuidtoname :puuid = phddata.entries[index].puuid></Lolpuuidtoname> </div>
          <div class = "l2">{{phddata.entries[index].leaguePoints}} </div>
        </li>
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
.l1{
  width: 300px;
}
.l2{
  width: 60px;
}
</style>
<script lang="ts">
export default {
  name: 'lol-phb',
};
</script>