<script setup lang="ts">
import { getlolmatchinfo } from '@/script/func';
import type{ Matchinfo } from '@/script/data';
import { defineProps, ref,onMounted } from 'vue';
import type { Ref } from 'vue';
import Matchdetail from './matchdetail.vue';
import Matchoverview from './matchoverview.vue';
import type { ParticipantDto } from '@/script/data';
const props = defineProps<{
    region:string,
    index:number,
    matchid:string,
    puuid:string,
}>();
const matchinfo:Ref<Matchinfo|null> = ref(null);

const loading = ref(true);   
const seedetails = ref(false);   
function handleClicks() {
    seedetails.value = !seedetails.value;
}
//let self = ref<any>({});
const self:Ref<ParticipantDto|null> = ref(null);
onMounted(async () => {
    matchinfo.value = await getlolmatchinfo(props.region + '/' + props.matchid);
    if(matchinfo.value != null || matchinfo.value != undefined){
      for(let i = 0; i < matchinfo.value.info.participants.length; i++){
          if(matchinfo.value.info.participants[i].puuid == props.puuid){
            self.value = matchinfo.value.info.participants[i];
            break;
          }
      }
    }
    loading.value = false;
});
</script>
<script lang="ts">
export default {
  name: 'lol-showmatch1',
}
</script>
<template>
    <div class = 'lolmatch-mid2'>
    <div v-if="loading || self == null ">Loading...</div>
    <div v-else   class =lolmatch-mid2>
      <div @click=handleClicks class =lolmatch-mid3>
        <Matchoverview :part = self :time = matchinfo?.info.gameEndTimestamp></Matchoverview>
      </div>
      <div v-if="seedetails && matchinfo != null">
        <Matchdetail :info= matchinfo :ppuid=props.puuid></Matchdetail>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.lolmatch-mid2{
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
}
.lolmatch-mid3{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>