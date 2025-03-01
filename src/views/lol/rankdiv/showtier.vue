<script setup lang="ts">
import brozenIcon from '@/assets/pic/Season_2023_-_Bronze.webp';
import silverIcon from '@/assets/pic/Season_2023_-_Silver.webp';
import goldIcon from '@/assets/pic/Season_2023_-_Gold.webp';
import platinumIcon from '@/assets/pic/Season_2023_-_Platinum.webp';
import diamondIcon from '@/assets/pic/Season_2023_-_Diamond.webp';
import masterIcon from '@/assets/pic/Season_2023_-_Master.webp';
import grandmasterIcon from '@/assets/pic/Season_2023_-_Grandmaster.webp';
import challengerIcon from '@/assets/pic/Season_2023_-_Challenger.webp';
import { defineProps } from 'vue';
const props = defineProps({
  tier:String,
  rank:String,
  losses:Number,
  wins:Number,
  name: String,
  code: String,
  leaguePoints:Number
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
</script>
<script lang="ts">
export default {
  name: 'lol-showtier'
}
</script>

<template>
  <div class = "rankbar">
    <div class = "mid-headicon">
      <div>pic</div>
      <div>
        <p>
        {{ props.name }}#{{ props.code }}
        </p>
      </div>
      <button>like</button>
    </div>
    <div class = "rankdiv">  
      <div>
        <p>SOLO/DUO</p>
      </div>
      
      <div class="icontierdiv">
        <img :src=tiericon :alt=props.tier width="72" />
      </div>
      
      <div class="loltiermidshow">
        <p>{{ props.tier }} {{ props.rank }} </p>
        <p>{{ props.leaguePoints }}points</p>
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
</style>