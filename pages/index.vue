<template>
  <div class="index">
    <ArrowDown class="arrow-down" />
    <img :src="arrowLeft" alt="left" />
    hogehoge
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ArrowDown from '@/assets/iamges/icons/arrow-down.svg?inline'
import arrowLeft from '@/assets/iamges/icons/arrow-left.svg'
@Component({ components: { ArrowDown } })
export default class IndexComponent extends Vue {
  arrowLeft = arrowLeft
}
</script>
<style lang="scss" scoped>
.index {
  color: white;
}
.arrow-down .c {
  stroke: red;
}
</style>
