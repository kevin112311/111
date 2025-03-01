<script setup lang="ts">
  import type { RankData } from '@/script/data';
  import { useRoute } from 'vue-router';
import Showtier from './rankdiv/showtier.vue';
const props = defineProps<{
  message: RankData,
  name:string,
  code:string
}>();
  
const tier = props.message.tier;
const rank = props.message.rank;
const wins = props.message.wins;
const losses = props.message.losses;
const leaguePoints = props.message.leaguePoints
</script>
<script lang="ts">  
export default {
    name: 'lol-showrank'
}
</script>
<template>
    <div>
      <Showtier  :tier=tier :rank=rank :wins=wins :losses=losses :name = props.name :code = props.code  :league-points=leaguePoints />
    </div>
</template>