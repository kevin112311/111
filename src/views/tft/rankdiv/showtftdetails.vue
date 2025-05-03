<script lang="ts" setup>
import type { TFTParticipantDto } from '@/script/data';
import Pic from '@/views/other/pic.vue';
import Showherocard from './showherocard.vue';
const props = defineProps<{
    part: TFTParticipantDto
    puuid : string
    now : string
    version : Number
}>();
const size = props.part.units.length;
const f = size > 10;
const l = size - 10;
const u =  props.part.units.slice(0,10);
const info = "";
</script>
<script lang="ts">
export default {
    name: 'Match-overview',
}
</script>
<template>
    <div :class="props.puuid == props.now ? 'match-overview-main2' : 'match-overview-main1'">
        <div class = 'match-overview-heropic'>
            <span><Pic :width=50 :height=50 :info=info ></Pic> </span>
        </div>
        <div class="match-overview-mid4">
            <p>{{ props.part.riotIdGameName }} </p>
            <p>#{{ props.part.riotIdTagline }} </p>
        </div>
        <div class="match-overview-mid">
            <p>level</p>
            <p>{{ props.part.level }} </p>
        </div>
        <div class="match-overview-mid1">
        <li v-for="(matchid, index) in u" :key="index">
            <Showherocard :part=matchid :version=props.version />
        </li>
        <div v-if = "f" class = "match-overview-mid2">
            <span>+{{l}}</span>
        </div>
        </div>
        <div class="match-overview-mid">
            <p>damage</p>
            <p>{{ props.part.total_damage_to_players }} </p>
        </div>
        <div class="match-overview-mid">
            <p>gold_left</p>
            <p>{{ props.part.gold_left }} </p>
        </div>
    </div>
</template>
<style lang="css" scoped>
.match-overview-mid4{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
    width: 130px;
}
.match-overview-mid4 p{
    font-size: x-small;
}
.match-overview-main1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px gray solid;
    margin: 1px;
}
.match-overview-main2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px gray solid;
    background-color: bisque;
    margin: 1px;
}


.match-overview-mid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    width: 70px;
}

.match-overview-mid1 {
    display: flex;
    flex-direction: row;
    /*justify-content: center;*/
    align-items: center;
    margin: 5px;
    width: 400px;
}
.match-overview-mid2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px;
    width: 20px;
    background-color: gray;
    
}
.match-overview-mid-time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    width: 100px;
}

.match-overview-mid p {
    margin-top: 2px;
}
.match-overview-heropic {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 5px;
    width: 70px;
}
</style>
