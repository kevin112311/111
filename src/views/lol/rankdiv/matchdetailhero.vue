<script lang = "ts" setup>
import type { ParticipantDto } from '@/script/data';
import Pic from '@/views/other/pic.vue';
import Picnumber from './picnumber.vue';
const props = defineProps<{
    info: ParticipantDto
    ppuid:string
    totaldamge: number
    totaldamagetaken: number
    totalmoney: number
}>();
const bol = (props.ppuid === props.info.puuid);
const damageper = (props.totaldamge > 0) ? parseFloat((props.info.totalDamageDealtToChampions/props.totaldamge*100).toFixed(2)) : 0;
const takenper = (props.totaldamagetaken > 0) ? parseFloat((props.info.totalDamageTaken/props.totaldamagetaken*100).toFixed(2)) : 0;
const moneyper = (props.totalmoney > 0) ? parseFloat((props.info.goldEarned/props.totalmoney*100).toFixed(2)) : 0;
const damagemoney = parseFloat((damageper/moneyper*100).toFixed(2));
const s: string = props.info.championName;
const item0:string|null = props.info.item0.toString()=='0'?  null : 'lolicon/'+ props.info.item0.toString() + '.png';
const item1:string|null = props.info.item1.toString()=='0'?  null : 'lolicon/'+ props.info.item1.toString() + '.png';
const item2:string|null = props.info.item2.toString()=='0'?  null : 'lolicon/'+ props.info.item2.toString() + '.png';
const item3:string|null = props.info.item3.toString()=='0'?  null : 'lolicon/'+ props.info.item3.toString() + '.png';
const item4:string|null = props.info.item4.toString()=='0'?  null : 'lolicon/'+ props.info.item4.toString() + '.png';
const item5:string|null = props.info.item5.toString()=='0'?  null : 'lolicon/'+ props.info.item5.toString() + '.png';
</script>
<script lang = "ts">
export default {
    name:'Match-detailhero',
}
</script>
<template>
    <div v-if=bol class="lolmatch-de-2-main">
        <div class="lolmatch-de-hero">
        <Pic :info=s :width=30 :height=30 :content="'lolchampion/'+ s + '.png'"></Pic>
    </div>
    <div class="lolmatch-de-mz">
        {{props.info.riotIdGameName}}#{{ props.info.riotIdTagline }}
    </div>
    <div class="lolmatch-de-weapons">
        <Pic :info=props.info.item0.toString() :width=20 :height=20 :content = item0></Pic>
        <Pic :info=props.info.item1.toString() :width=20 :height=20 :content = item1></Pic>
        <Pic :info=props.info.item2.toString() :width=20 :height=20 :content = item2></Pic>
        <Pic :info=props.info.item3.toString() :width=20 :height=20 :content = item3></Pic>
        <Pic :info=props.info.item4.toString() :width=20 :height=20 :content = item4></Pic>
        <Pic :info=props.info.item5.toString() :width=20 :height=20 :content = item5></Pic>
    </div>

    <div class="lolmatch-de-kda">
        <p>{{props.info.kills}}/{{props.info.deaths}}/{{props.info.assists}}</p>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=props.info.totalDamageDealtToChampions></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=props.info.totalDamageTaken></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=props.info.goldEarned></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number= props.info.visionScore ></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=damageper></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=takenper></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=damagemoney></Picnumber>
    </div>
    </div>
    <div v-else class = "lolmatch-de-2">
    <div class="lolmatch-de-hero">
        <Pic :info=s :width=30 :height=30 :content="'lolchampion/'+ s + '.png'"></Pic>
    </div>
    <div class="lolmatch-de-mz">
        {{props.info.riotIdGameName}}#{{ props.info.riotIdTagline }}
    </div>
    <div class="lolmatch-de-weapons">
        <Pic :info=props.info.item0.toString() :width=20 :height=20 :content = item0></Pic>
        <Pic :info=props.info.item1.toString() :width=20 :height=20 :content = item1></Pic>
        <Pic :info=props.info.item2.toString() :width=20 :height=20 :content = item2></Pic>
        <Pic :info=props.info.item3.toString() :width=20 :height=20 :content = item3></Pic>
        <Pic :info=props.info.item4.toString() :width=20 :height=20 :content = item4></Pic>
        <Pic :info=props.info.item5.toString() :width=20 :height=20 :content = item5></Pic>
    </div>
    <div class="lolmatch-de-kda">
        <p>{{props.info.kills}}/{{props.info.deaths}}/{{props.info.assists}}</p>
    </div>
    
    <div class="lolmatch-de-number">
        <Picnumber :number=props.info.totalDamageDealtToChampions></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=props.info.totalDamageTaken></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=props.info.goldEarned></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number= props.info.visionScore ></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=damageper></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=takenper></Picnumber>
    </div>
    <div class="lolmatch-de-number">
        <Picnumber :number=damagemoney></Picnumber>
    </div>
    </div>
</template>
<style lang="css" scoped>
.lolmatch-de-2{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.lolmatch-de-2-main{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background-color: #e7f17e;
}
.lolmatch-de-kda{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
}
.lolmatch-de-hero{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
}
.lolmatch-de-weapons{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2px;
    width: 140px;
}
.lolmatch-de-number{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
}
.lolmatch-de-mz{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    font-size: x-small;
}
</style>