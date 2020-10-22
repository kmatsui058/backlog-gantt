<template>
  <div class="container">
    <ArrowDown class="arrow-down" />
    <img :src="ArrowLeft" alt="arrow-left" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ArrowDown from '@/assets/images/icons/arrow-down.svg?inline'
import ArrowLeft from '@/assets/images/icons/arrow-left.svg'

@Component({ components: { ArrowDown } })
export default class IndexComponent extends Vue {
  ArrowLeft = ArrowLeft
}
</script>

<style lang="scss">
.arrow-down {
  .c {
    stroke: red;
  }
}
</style>
