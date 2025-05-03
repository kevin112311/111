<script setup lang="ts">
  import type { RankData,Lolsummerdata } from '@/script/data';
  import { useRoute } from 'vue-router';
  import {  ref } from 'vue';
import Showtier from './rankdiv/showtier.vue';
const props = defineProps<{
  message: RankData | string,
  name:string,
  code:string
  lolsummer:Lolsummerdata
  puuid:string
  part1:string
}>();
const norank = ref(typeof props.message === 'string')
var tier = "";
var rank = "";
var wins = 0;
var losses = 0;
var leaguePoints = 0;
if(typeof props.message !== 'string'){
tier = props.message.tier;
rank = props.message.rank;
wins = props.message.wins;
losses = props.message.losses;
leaguePoints = props.message.leaguePoints
}
</script>
<script lang="ts">  
export default {
    name: 'lol-showrank'
}
</script>
<template>
    <div>
      <Showtier  :tier=tier :rank=rank :wins=wins :losses=losses :name = props.name :code = props.code  :league-points=leaguePoints :iconid = props.lolsummer.profileIconId :norank = norank :puuid = props.puuid  :part1 =props.part1 />
    </div>
</template>