<script setup lang="ts">
  import type { RankData } from '@/script/data';
import Showtier from './rankdiv/showtfttier.vue';
import Showtftmatch from './rankdiv/showtftmatch.vue';
import { defineProps } from 'vue';
const props = defineProps<{
  message: RankData,  // 正确声明类型
  name: string,
  code: string,
  match:string[]|null|undefined,
  ppuid :string,
  part1 :string
}>();
const tier = props.message.tier;
const rank = props.message.rank;
const wins = props.message.wins;
const losses = props.message.losses;
const leaguePoints = props.message.leaguePoints

console.log("rankbar")
</script>
<script lang="ts">  
export default {
    name: 'tft-showrank'
}
</script>
<template>
    <div>
      <Showtier  :tier=tier :rank=rank :wins=wins :losses=losses :name = props.name :code = props.code  :league-points=leaguePoints :part1=props.part1 :puuid=props.ppuid />
    </div>
    <div>
      <Showtftmatch :match=props.match :name = props.name :code=props.code :ppuid=props.ppuid :part1=props.part1 />
    </div>
</template>