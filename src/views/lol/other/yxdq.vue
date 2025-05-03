<script setup lang="ts">
  import {getcookie}from '../../../script/func'
  import GameIcon from '../.././GameIcon.vue'
  import '../../../assets/css/main.scss'
  import { ref } from 'vue';
import Gameinfo from '.././gameinfo.vue';
import Searchlol from '.././Searchlol.vue';

  const ccc = getcookie("game")
  var game = "lol"
  const list = ["cs2","data2","lol","valorant","tft"]
  if(ccc != null){
    if(ccc in list){
      game = ccc
    }
  }
  const gameicon = ref(game)
</script>

<template>
   <div class = "main-lol">
    <div class="top-bar">
      <div class = "choose-game">
        <GameIcon :message=game>
        </GameIcon>
      </div>
      <div class = "input-info">
        <Gameinfo></Gameinfo>
      </div>
      <div class = "save-info">
        <p>登陆</p>
      </div>
    </div>
    <div class="mid-bar">
      <div class = "mid-bar-main">
        <div class="champions-page">
    <h1>英雄联盟英雄大全</h1>
    <div class="champions-container">
      <div 
        v-for="champion in championNames" 
        :key="champion" 
        class="champion-item"
      >
        <img 
          :src="getImageUrl(champion)"
          :alt="champion"
          class="champion-image"
          loading="lazy"
        />
        <div class="champion-name">{{ formatName(champion) }}</div>
      </div>
    </div>
  </div>
    </div>
    </div>
    <div class="bottom-bar">

    </div>
  </div>
  
</template>

<script lang="ts">
export default {
  name: 'ChampionsGallery',
  data() {
    return {
      championNames: [
        "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Ambessa", "Amumu", "Anivia", 
        "Annie", "Aphelios", "Ashe", "AurelionSol", "Aurora", "Azir", "Bard", "Belveth", 
        "Blitzcrank", "Brand", "Braum", "Briar", "Caitlyn", "Camille", "Cassiopeia", 
        "Chogath", "Corki", "Darius", "Diana", "Draven", "DrMundo", "Ekko", "Elise", 
        "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", 
        "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Hwei", 
        "Illaoi", "Irelia", "Ivern", "Janna", "JarvanIV", "Jax", "Jayce", "Jhin", 
        "Jinx", "Kaisa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", 
        "Kayle", "Kayn", "Kennen", "Khazix", "Kindred", "Kled", "KogMaw", "KSante", 
        "Leblanc", "LeeSin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", 
        "Malphite", "Malzahar", "Maokai", "MasterYi", "Mel", "Milio", "MissFortune", 
        "MonkeyKing", "Mordekaiser", "Morgana", "Naafiri", "Nami", "Nasus", "Nautilus", 
        "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu", "Olaf", "Orianna", "Ornn", 
        "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "RekSai", 
        "Rell", "Renata", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", 
        "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", 
        "Sion", "Sivir", "Skarner", "Smolder", "Sona", "Soraka", "Swain", "Sylas", 
        "Syndra", "TahmKench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", 
        "Tristana", "Trundle", "Tryndamere", "TwistedFate", "Twitch", "Udyr", "Urgot", 
        "Varus", "Vayne", "Veigar", "Velkoz", "Vex", "Vi", "Viego", "Viktor", 
        "Vladimir", "Volibear", "Warwick", "Xayah", "Xerath", "XinZhao", "Yasuo", 
        "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"
      ],
      defaultImage: '/pic/lolchampion/default.png' // 默认图片路径
    }
  },
  methods: {
    getImageUrl(champion:string) {
      // 图片放在public/pic/lolchampion目录下
      return `/pic/lolchampion/${champion}.png`
    },
    formatName(name:string) {
      // 格式化名称（如AurelionSol -> Aurelion Sol）
      return name.replace(/([a-z])([A-Z])/g, '$1 $2')
    },
  }
}
</script>

<style scoped>
.champions-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2rem;
}

.champions-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.champion-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(12.5% - 20px); /* 一行8个 */
  margin-bottom: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.champion-item:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.champion-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #e0a526;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-color: #f5f5f5;
}

.champion-name {
  margin-top: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .champion-item {
    width: calc(14.28% - 20px); /* 一行7个 */
  }
}

@media (max-width: 1024px) {
  .champion-item {
    width: calc(16.666% - 20px); /* 一行6个 */
  }
}

@media (max-width: 768px) {
  .champion-item {
    width: calc(25% - 20px); /* 一行4个 */
  }
}

@media (max-width: 480px) {
  .champion-item {
    width: calc(33.333% - 20px); /* 一行3个 */
  }
  
  .champion-image {
    width: 70px;
    height: 70px;
  }
}
.top-bar{
  width: 100%;
  background-color: #0C60C0;
  padding-bottom: 10px;
}
.main-lol{
    margin: 0;
}
</style>