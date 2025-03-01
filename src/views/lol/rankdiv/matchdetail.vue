<script lang = "ts" setup>
import type { Matchinfo } from '@/script/data';
import matchdetailhero from './matchdetailhero.vue';
const props = defineProps<{
    info: Matchinfo
    ppuid: string  
}>();
const totaldamge1 = props.info.info.participants.slice(0, 5).reduce((acc, item) => acc + item.totalDamageDealtToChampions, 0);
const totaldamge2 = props.info.info.participants.slice(5, 10).reduce((acc, item) => acc + item.totalDamageDealtToChampions, 0);
const totaldamagetaken1 = props.info.info.participants.slice(0, 5).reduce((acc, item) => acc + item.totalDamageTaken, 0);
const totaldamagetaken2 = props.info.info.participants.slice(5, 10).reduce((acc, item) => acc + item.totalDamageTaken, 0);
const totalmoney1 = props.info.info.participants.slice(0, 5).reduce((acc, item) => acc + item.goldEarned, 0);
const totalmoney2 = props.info.info.participants.slice(5, 10).reduce((acc, item) => acc + item.goldEarned, 0);
const time = props.info.info.gameEndTimestamp;
const dtime = Math.floor(props.info.info.gameDuration / 60); 
</script>
<script lang = "ts">
export default {
    name:'Match-detail',
}
</script>
<template>
    <div class = "lolmatch-de-1">
        <div class="lolmatch-de-table">
            <div :style="{ width: '55px' }"  class = "lolmatch-de-tablemid">英雄</div>
            <div :style="{ width: '170px' }"  class = "lolmatch-de-tablemid">名字</div>
            <div :style="{ width: '130px' }" class = "lolmatch-de-tablemid">装备</div>
            <div :style="{ width: '90px' }" class = "lolmatch-de-tablemid">kda</div>
            <div :style="{ width: '65px' }" class = "lolmatch-de-tablemid">输出</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">承受</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">金钱</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">视野</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">伤比</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">承比</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">伤转</div>
        </div>
        <div v-for="(participants, index) in props.info.info.participants.slice(0, 5)" :key="index">
            <matchdetailhero :info = participants :ppuid = props.ppuid :totaldamge=totaldamge1 :totaldamagetaken=totaldamagetaken1 :totalmoney=totalmoney1></matchdetailhero>
        </div>
        <div class="lolmatch-de-status">
            <div class = 'lolmatch-de-tablemid-left'>持续时间: {{ dtime }}m</div>
            <div class="lolmatch-de-tablemid-center">{{props.info.info.teams[0].objectives.champion.kills }} VS {{ props.info.info.teams[1].objectives.champion.kills }}</div>
            <div class = 'lolmatch-de-tablemid-right'></div>
        </div>
        <div class="lolmatch-de-table">
            <div :style="{ width: '55px' }"  class = "lolmatch-de-tablemid">英雄</div>
            <div :style="{ width: '170px' }"  class = "lolmatch-de-tablemid">名字</div>
            <div :style="{ width: '130px' }" class = "lolmatch-de-tablemid">装备</div>
            <div :style="{ width: '90px' }" class = "lolmatch-de-tablemid">kda</div>
            <div :style="{ width: '65px' }" class = "lolmatch-de-tablemid">输出</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">承受</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">金钱</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">视野</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">伤比</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">承比</div>
            <div :style="{ width: '65px' }"  class = "lolmatch-de-tablemid">伤转</div>
        </div>
        <div v-for="(participants, index) in props.info.info.participants.slice(5, 10)" :key="index">
            <matchdetailhero :info = participants :ppuid = props.ppuid :totaldamge=totaldamge2 :totaldamagetaken=totaldamagetaken2 :totalmoney=totalmoney2></matchdetailhero>
        </div>
    </div>
</template>
<style lang="css" scoped>
.lolmatch-de-1{
    display: flex;
    flex-direction: column;
}
.lolmatch-de-table{
    display: flex;
    flex-direction: row;
}
.lolmatch-de-tablemid{
    display: flex;  
    justify-content: center; 
    align-items: center;
}
.lolmatch-de-status{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background-color: #f0f0f0;
    /*width: 800px;*/
    position: relative;  
}


.lolmatch-de-tablemid-left,.lolmatch-de-tablemid-right {
    margin: 10px;              
}
.lolmatch-de-tablemid-center {
  position: absolute;          
  left: 50%;                  
  transform: translateX(-50%);    
}
</style>