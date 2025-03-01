<script lang="ts" setup>
import type { ParticipantDto } from '@/script/data';
import Pic from '@/views/other/pic.vue';
const props = defineProps<{
    part: ParticipantDto
    time : number|undefined
}>();
let timestamp = props.time!= undefined ? props.time : 0;
let date = new Date(timestamp);
let month:number = date.getMonth() + 1;
</script>
<script lang="ts">
export default {
    name: 'Match-overview',
}
</script>
<template>
    <div :class="props.part.win ? 'match-overview-main' : 'match-overview-main-red'">
        <div class = 'match-overview-heropic'>
            <span><Pic :info=props.part.championName :width=50 :height=50 :content="'lolchampion/'+ props.part.championName + '.png'"></Pic> </span>
        </div>
        <div class="match-overview-mid">
            <p>level</p>
            <p>{{ props.part.champLevel }} </p>
        </div>
        <div class="match-overview-mid">
            <p>kills</p>
            <p>{{ props.part.kills }} </p>
        </div>
        <div class="match-overview-mid">
            <p>deaths</p>
            <p>{{ props.part.deaths }} </p>
        </div>
        <div class="match-overview-mid">
            <p>assists</p>
            <p>{{ props.part.assists }} </p>
        </div>
        <div class="match-overview-mid">
            <p>damage</p>
            <p>{{ props.part.totalDamageDealtToChampions }} </p>
        </div>
        <div class="match-overview-mid">
            <p>taken</p>
            <p>{{ props.part.totalDamageTaken }} </p>
        </div>
        <div class="match-overview-mid">
            <p>money</p>
            <p>{{ props.part.goldEarned }} </p>
        </div>
        <div class="match-overview-mid">
            <p>time</p>
            <p>{{ date.getFullYear() }}.{{ month}}.{{ date.getDate()}}</p>
        </div>
    </div>
</template>
<style lang="css" scoped>
.match-overview-main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: #a4e0ae;
    margin: 10px;
}

.match-overview-main-red {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    background-color: #e0b09f;
    margin: 10px;
}

.match-overview-mid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    width: 70px;
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
