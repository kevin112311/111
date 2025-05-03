<script setup lang="ts">
  import type { TFTunit } from '@/script/data';
import { defineProps } from 'vue';
import Pic from '@/views/other/pic.vue';
const props = defineProps<{
    part : TFTunit
    version : Number
}>();
var i = '★';
if(props.part.tier > 1){
    for(let j = 1; j < props.part.tier; j++){
        i += '★';
    }
}
const tftversion = '.tft_set' +props.version; 
console.log('tftchampion/tft13_' + props.part.character_id.toLowerCase() +'.tft_set13.png');
</script>
<script lang="ts">  
export default {
    name: 'tft-showhero'
}
</script>
<template>
    <div class = "tft-mid-hero">
        <span >{{i}}</span>
        <Pic :width=35 :height=35 :info=props.part.character_id :content="'tftchampion/' + props.part.character_id.toLowerCase() + tftversion + '.png'"></Pic>
    </div>
</template>
<style lang="css" scoped>
.tft-mid-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1px;
}
.tft-mid-hero span{
    font-size: small;
}
</style>