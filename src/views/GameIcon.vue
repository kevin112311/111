<script setup lang="ts">
import { ref } from 'vue';
import cs2Icon from '@/assets/gameicon/cs.svg';
import lolIcon from'@/assets/gameicon/lol.png'
import valorantIcon from '@/assets/gameicon/valorant.svg';
import dota2Icon from '@/assets/gameicon/dota2.svg';
import '../assets/css/main.scss'
import tftIcon from '@/assets/gameicon/tft.svg';
const props = defineProps({
  message: String
});


const gamelist =[
        { value: 'cs2', text: 'CS2', icon: cs2Icon },
        { value: 'lol', text: 'LOL', icon: lolIcon },
        { value: 'valorant', text: 'VALORANT', icon:valorantIcon },
        { value: 'dota2', text: 'DOTA2', icon: dota2Icon },
        { value: 'tft', text: 'TFT', icon: tftIcon },
    ];
    const icon = ref(cs2Icon);
    const icontext = ref('CS2');
    for (let i = 0; i < gamelist.length; i++) {
        if (gamelist[i].value == props.message) {
            icon.value = gamelist[i].icon;
            icontext.value = gamelist[i].text;
            break;
        }
    }
</script>
<script lang="ts">
export default {
  data() {
    return {
      dropdownOpen: false
    };
  },
  methods: {
    // 切换下拉框的显示状态
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    onclick1(){
        console.log("onclick1");
        window.location.href = '/cs2';
    },
    onclick2(){
        window.location.href = '/dota2';
    },
    onclick3(){
        window.location.href = '/lol';
    },
    onclick4(){
        window.location.href = '/valorant';
    },
    onclick5(){
        window.location.href = '/tft';
    }
}

};
</script>
<template>
    <div @click="toggleDropdown">
        <li  class = "game-icon-tab">
                <div class = "option-tab">
                <img :src="icon" :alt="icontext" class="game-icon" >
                </div>
            </li>
    </div>
    <div class="dropdown">
        <ul v-if="dropdownOpen" >
            <li value="cs2"  @click="onclick1">
                <div class = "option-tab">
                <img src="../assets/gameicon/cs.svg" alt="CS2" class="game-icon" >
                </div>
            </li >

            <li value="data2"  @click="onclick2">
                <div class="option-tab">
                <img src="../assets/gameicon/dota2.svg" alt="DOAT2" class="game-icon">
                </div>
            </li>

            <li value="lol"  @click="onclick3">
                <div class = "option-tab">
                <img src="../assets/gameicon/lol.png" alt="LOL" class="game-icon" >
                </div>
                
            </li>
            <li value="valorant"  @click="onclick4">
                <div class = "option-tab">
                <img src="../assets/gameicon/valorant.svg" alt="VALORANT" class="game-icon">
                </div>
            </li>
            <li value="tft"  @click="onclick5">
                <div class = "option-tab">
                <img src="../assets/gameicon/tft.svg" alt="TFT" class="game-icon">
                </div>
            </li>
        </ul >
    </div>
</template>
<style scoped>

li:hover{
    background-color: #91908F;
}
.game-icon-tab:hover {
  background: none;  
}
</style>