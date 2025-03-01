<script setup lang="ts">
  import {getcookie,getlolppuid, getlolsummerid, getlolrankinfo , getlolmatchlist} from '../../script/func'
  import '../../assets/css/main.scss'
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Lolheader from './lolheader.vue';
  import Getlolrank from './getlolrank.vue';
  import type { RankData } from '@/script/data';
  
  const ccc = getcookie("game")
  var game = "lol"
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
      const lolsummerid = await getlolsummerid(part1 + '/' + lolppuid);
      lolrankinfo.value = await getlolrankinfo(part1 + '/' + lolsummerid);
      lolmacthinfo.value = await getlolmatchlist(part1 + '/' +lolppuid);
    }
});
</script>

<script lang="ts">
export default {
  name: 'lol-result',
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
    <Lolheader :game = game></Lolheader>
    <div class="mid-bar">
        <Getlolrank :message = lolrankinfo :name = par2 :code = par3 :match=lolmacthinfo :ppuid=ppuid :part1=par1 />
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