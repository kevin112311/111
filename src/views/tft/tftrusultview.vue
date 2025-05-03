<script setup lang="ts">
  import {getcookie,getlolppuid, getlolsummerids, gettftrankinfo , gettftmatchlist} from '../../script/func'
  import '../../assets/css/main.scss'
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Tftheader from './tftheader.vue';
  import Gettftlrank from './gettftrank.vue';
  import type { RankData } from '@/script/data';
  
  const ccc = getcookie("game")
  var game = "tft"
  const list = ["cs2","data2","lol","valorant","tft"]
  if(ccc != null){
    if(ccc in list){
      game = ccc
    }
  }
 

  const gameicon = ref(game)
  
  const route = useRoute();
  const encodedStr = route.path;
  let decodedStr = decodeURIComponent(encodedStr);
  decodedStr = decodedStr.substring(7);
  console.log(decodedStr);
  const regex = /^([a-zA-Z]+)\+([\s\S]+?)#([\s\S]+)$/;
  const match = decodedStr.match(regex);
  const lolrankinfo = ref<RankData|null>();
  const lolmacthinfo = ref<string[]|null>();
  let par1 = "?";
  let par2 = "?";
  let par3 = "?";
  let ppuid = "?";
  onMounted(async () => {
    if(match){
      const [, part1, part2, part3] = match;
      par1 = part1;
      par2 = part2;
      par3 = part3;
      const lolppuid = await getlolppuid(part1, part2, part3);
      ppuid = lolppuid;
      const lolsummerid = await getlolsummerids(part1 + '/' + lolppuid);
      lolrankinfo.value = await gettftrankinfo(part1 + '/' + lolppuid);
      lolmacthinfo.value = await gettftmatchlist(part1 + '/' +lolppuid);
      console.log(lolrankinfo.value);
      console.log(lolmacthinfo.value);
    }
});
</script>

<script lang="ts">
export default {
  name: 'tft-result',
  props: ['path'], 
  data() {
    return {
      username: '',  // 用于存储获取的用户名
    };
  },
  async mounted() {
  },
}
</script>

<template>
  <div class = "main-lol">
    <Tftheader :game = game></Tftheader>
    <div v-if="lolrankinfo != null" class="mid-bar">
        <Gettftlrank :message = lolrankinfo :name = par2 :code = par3 :match=lolmacthinfo :ppuid=ppuid :part1=par1 />
    </div>
    <div class="bottom-bar">
    </div>
  </div>
</template>


<style scoped>
.top-bar{
  width: 100%;
  background-color: #0C60C0;
  padding-bottom: 10px;
}
.main-lol{
    margin: 0;
}
</style>