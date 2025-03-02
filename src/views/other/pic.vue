<script lang="ts" setup>
import type { ParticipantDto } from '@/script/data';

const props = defineProps<{
    width?: number;
    height?: number;
    info: string;
    content?: string|null;
}>();
//const imagePath = new URL('../../assets/pic/' + props.content, import.meta.url).href;
const imagePath = '/pic/' + props.content;
const width = props.width != null ? props.width : 20;
const height = props.height != null ? props.height : 20;
</script>

<template>
    <div v-if="props.content==null || props.content == undefined" class="pic" :style="{ width: width + 'px', height: height + 'px' }" :title="props.info">
    </div>
    <div v-else class="pic" :style="{ width: width + 'px', height: height + 'px' }" :title="props.info">
        <img :src= imagePath  :width="width" :height="height"   />
    </div>
</template>

<script lang="ts">
export default {
    name: 'pic-1',
}
</script>

<style lang="css" scoped>
.pic {
    border: 1px solid black;
}
</style>