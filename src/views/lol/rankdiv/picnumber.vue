<script lang = "ts" setup>
import type { Matchinfo } from '@/script/data';
import matchdetailhero from './matchdetailhero.vue';
const props = defineProps<{
    info?: string,
    number: Number   
}>();
</script>
<script lang = "ts">
export default {
    name:'pic-number',
}
</script>
<template>
    <p>{{props.number}}</p>
</template>
<style lang="css" scoped>
</style>