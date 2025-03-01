<script setup lang="ts">
import { defineProps } from 'vue';
import Showlolrank from './showlolrank.vue';
import type {RankData} from '@/script/data';
import Onloading1 from '@/views/other/onloading1.vue';
import Showlolmatch from './rankdiv/showmatch.vue'
const props = defineProps<{
  message: RankData | null | undefined,  // 正确声明类型
  name: string,
  code: string,
  match:string[]|null|undefined,
  ppuid :string,
  part1 :string
}>();
</script>
<script lang="ts">
export default {
    name: 'lol-getrank'
}
</script>
<template>
  <div v-if="(props.message !== null) && (props.message !== undefined)">
    <Showlolrank :message="props.message" :name = props.name :code = props.code  />
  </div>
  <div v-else> 
    <Onloading1 /> 
  </div>
  <div>
  <Showlolmatch :match=props.match :name = props.name :code=props.code :ppuid=props.ppuid :part1=props.part1 />
</div>
</template> 