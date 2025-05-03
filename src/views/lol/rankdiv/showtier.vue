<script setup lang="ts">
import brozenIcon from '@/assets/pic/Season_2023_-_Bronze.webp';
import silverIcon from '@/assets/pic/Season_2023_-_Silver.webp';
import goldIcon from '@/assets/pic/Season_2023_-_Gold.webp';
import platinumIcon from '@/assets/pic/Season_2023_-_Platinum.webp';
import diamondIcon from '@/assets/pic/Season_2023_-_Diamond.webp';
import masterIcon from '@/assets/pic/Season_2023_-_Master.webp';
import grandmasterIcon from '@/assets/pic/Season_2023_-_Grandmaster.webp';
import challengerIcon from '@/assets/pic/Season_2023_-_Challenger.webp';
import Pic from '@/views/other/pic.vue';
import { defineProps,onMounted,ref,onUnmounted, type Ref ,computed } from 'vue';
import { updateloldata,updatetime } from '@/script/func';
const props = defineProps({
  tier:String,
  rank:String,
  losses:Number,
  wins:Number,
  name: String,
  code: String,
  leaguePoints:Number,
  iconid:Number,
  norank:Boolean,
  puuid:String,
  part1:String
});


var tiericon = silverIcon; 
switch(props.tier){
  case 'BRONZE':
    tiericon = brozenIcon;
    break;
  case 'SILVER':
    tiericon = silverIcon;
    break;
  case 'GOLD':
    tiericon = goldIcon;
    break;
  case 'PLATINUM':
    tiericon = platinumIcon;
    break;
  case 'DIAMOND':
    tiericon = diamondIcon;
    break;
  case 'MASTER':
    tiericon = masterIcon;
    break;
  case 'GRANDMASTER':
    tiericon = grandmasterIcon;
    break;
  case 'CHALLENGER':
    tiericon = challengerIcon;
    break;
}
var winrate = 0.00;
if(props.wins!= null &&  props.losses!= null && props.wins+props.losses != 0){
winrate = Math.round((props.wins/(props.wins+props.losses))*100);
} 
const rank = (props.tier == 'MASTER' || props.tier == 'GRANDMASTER' || props.tier == 'CHALLENGER') ? '':  props.rank ;
const picid = 'profileicon/'+ props.iconid + '.png';
const iconid = props.iconid?.toString();
const canupdate = ref(false);
const time :Ref<number> = ref(0);
let timer: NodeJS.Timeout | null = null;
const numericTime = computed(() => Number(time.value));
onMounted(async () => {
  if(props.part1 != undefined && props.puuid != undefined){
    const res = await updatetime('lol',props.puuid,props.part1);
    if (res == null || res === undefined || res <= 0) {
      canupdate.value = true; 
      return;
    }
    time.value = res;
    startCountdown()
  }
},
)
function startCountdown() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  timer = setInterval(() => {
    time.value -= 1; 
    if (numericTime.value <= 0) {
      time.value = 0
      canupdate.value = true
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }, 1000); 
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});
</script>
<script lang="ts">
export default {
  name: 'lol-showtier'
}
</script>

<template>
  <div class = "rankbar">
    <div class = "mid-headicon">
      <Pic :info=iconid :content = picid :width=60 :height=60></Pic>
      <div>
        <p>
        {{ props.name }}#{{ props.code }}
        </p>
        <div v-if = canupdate>
        <button class="login-button" @click="updateloldata(props.part1,props.puuid)" >
          UPDATE  
        </button>
        </div>
        <div v-else>
          <button class="login-button-disable" disabled >UPDATE</button>

          <span>{{time}}s</span>
        </div>
      </div>
    </div>
    <div class = "rankdiv">  
      <div>
        <p>SOLO/DUO</p>
      </div>
      <div v-if ="!props.norank" class = "rankdiv">
      <div class="icontierdiv">
        <img :src=tiericon :alt=props.tier width="72" />
      </div>
      
      <div class="loltiermidshow">
        <p>{{ props.tier }} {{ rank }} </p>
        <p>{{ props.leaguePoints }}points</p>
      </div>
      </div>
      <div v-else class = "rankdiv">
        <p>UNRANKED</p>
      </div>
      <div class="smalltext">
        <span>W: {{ props.wins }} L: {{ props.losses }} </span>
        <span>{{ winrate }}%</span>
      </div>
  </div>
</div>
</template>
<style lang="css" scoped>
.rankbar{
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  margin-right: 50px;
  justify-content: space-between;
}
.mid-headicon{
  display: flex;
  align-items: center;
}
.mid-headicon :first-child{
  margin-right: 10px;
}
.smalltext{
  font-size: smaller;
}
.smalltext :last-child{
  margin-left: 10px;
}

  .rankdiv{
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .icontierdiv{
    display: flex;
    width: 72px;
    /*border: 2px solid #123547;*/
    align-items: center;
    justify-content: center;
    justify-items: center;
    border-radius: 80%;
    background-color: azure;
  }
  p{
    margin: 2px;
  }
.loltiermidshow{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  .login-button {
  padding: 8px 16px;
  background-color: #EE6363;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: 	#CD5555;
}
.login-button-disable {
  padding: 8px 16px;
  background-color: #708090;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.login-button-disable:disabled {
  background-color: #ccc; /* 灰色背景，表示不可用 */
  color: #666; /* 淡色文字 */
  cursor: not-allowed; /* 鼠标悬停时显示“禁止”光标 */
  pointer-events: none; /* 禁用鼠标交互 */
}
</style>