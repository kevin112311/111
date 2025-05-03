<script setup lang="ts">
  import type { TFTInfoDto } from '@/script/data';
  import  { paixu } from '@/script/func';
import { defineProps } from 'vue';
import Pic from '@/views/other/pic.vue';
import Showtftdetails from './showtftdetails.vue';
const props = defineProps<{
    part : TFTInfoDto
    puuid : string
    version : Number
}>();
const newparticipants = paixu(props.part.participants)
</script>
<script lang="ts">  
export default {
    name: 'tft-showhdetail'
}
</script>
<template>
    <div class = tft-mid-hero1>
     <li v-for="(matchid, index) in newparticipants" :key="index">
        <Showtftdetails :part="matchid" :puuid = props.puuid :now = matchid.puuid :version=props.version></Showtftdetails>
    </li>
    </div>
</template>
<style lang="css" scoped>
.tft-mid-hero1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
   
    margin: 1px;
}
</style>