<script setup lang="ts">
import { getname } from '@/script/func';
import type { name } from '@/script/data';
import { ref,onMounted } from 'vue';
const props = defineProps<{
    puuid:string,
}>();
const i = ref<string | null>(null);  
onMounted(async () => {
    i.value = await getname(props.puuid);
}); 
</script>
<script lang="ts">
export default {
  name: 'lol-phd1',
}
</script>
<template>
    <span v-if="i!=null">{{ i }}</span>
</template>
<style lang="css" scoped>
</style>