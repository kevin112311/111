<script setup lang="ts">
import { gettftmatchinfo } from '@/script/func';
import type{ TFTMatchinfo,TFTParticipantDto } from '@/script/data';
import { defineProps, ref,onMounted } from 'vue';
import type { Ref } from 'vue';
import Tftmatchoverview from '@/views/tft/rankdiv/tftmatchoverview.vue';
import Showtftderail from './showtftderail.vue';
const props = defineProps<{
    region:string,
    index:number,
    matchid:string,
    puuid:string,
}>();
const matchinfo:Ref<TFTMatchinfo|null> = ref(null);

const loading = ref(true);   
const seedetails = ref(false);   
function handleClicks() {
    seedetails.value = !seedetails.value;
}
//let self = ref<any>({});
const self:Ref<TFTParticipantDto|null> = ref(null);
onMounted(async () => {
    matchinfo.value = await gettftmatchinfo(props.region + '/' + props.matchid);
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
    <div v-if="loading || self == null">Loading...</div>
    <div v-else   class =lolmatch-mid2>
      <div @click=handleClicks class =lolmatch-mid3>
        <Tftmatchoverview :part = self :time=matchinfo?.info.game_datetime :version = matchinfo?.info.tft_set_number />
      </div>
      <div v-if="seedetails && matchinfo != null">
        <Showtftderail :part = matchinfo.info :puuid=self.puuid :version=matchinfo?.info.tft_set_number />
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.lolmatch-mid2{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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