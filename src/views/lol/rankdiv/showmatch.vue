<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { Ref } from 'vue';
import Onloading1 from '@/views/other/onloading1.vue';
import {getlolmatchlist} from '@/script/func'
import Showlolmacths from './showmatchs.vue'
const props = defineProps<{
  match:string[]|null|undefined,
  name:string,
  code:string,
  ppuid:string,
  part1 :string
}>();
const now: Ref<string[]> = ref([]);
const update = ref(false);
const getmorematchs = async () => {
    if(props.match !== null && props.match !== undefined){
        const message = props.part1 + '/' +  props.ppuid
            if(!update.value){
                const temp = await getlolmatchlist(message,20);
                if(temp !== null && temp !== undefined){
                    now.value = props.match.concat(temp);
                    update.value = true;
                }
            }
            else{
                const temp = await getlolmatchlist(message,now.value.length);
                if(temp !== null && temp !== undefined){
                    now.value = now.value.concat(temp);
                }
            }
        }  
}
</script>
<script lang="ts">
export default {
    name: 'lol-showmatch',
}
</script>

<template>
  <div class="lolmatch-mid">
    <div class="lolmatch-mid1" v-if="(props.match !== null) && (props.match !== undefined) && !update">
        <!--
        
        <li v-for="(matchid, index) in props.match" :key="index">
            <Showlolmacths :region=props.part1 :matchid=matchid :index=index :puuid = props.ppuid />
        </li>
        正常显示
        测试用
    -->
        <li>
            <Showlolmacths :region=props.part1 :matchid=props.match[0] :index=0 :puuid = props.ppuid />
        </li>
        <button class="showmorebutton" @click="getmorematchs"><span>show more</span></button>
    </div>
    <div class="lolmatch-mid1" v-else-if="(props.match !== null) && (props.match !== undefined) && update">
        <li v-for="(matchid, index) in now" :key="index">
            <Showlolmacths :region=props.part1 :matchid=matchid :index=index :puuid = props.ppuid />
        </li>
        <button class="showmorebutton" @click="getmorematchs"><span>show more</span></button>
    </div>
    <div class="lolmatch-mid1" v-else> 
        <Onloading1 /> 
    </div>
  </div>
</template>
<style lang="css" scoped>
.lolmatch-mid{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.lolmatch-mid1{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
}
.showmorebutton{
    margin: 10px;
    width: 100px;
    height: 50px;
    border-radius: 20%;
    background-color: aliceblue;
}
.showmorebutton :last-child{
    display: flex;
    align-items: center;
    justify-content: center;
    
}
</style>