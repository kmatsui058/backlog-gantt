<template>
  <div class="container">
    <ControllerBox title="hoge"> hogegege </ControllerBox>
    aaaaああああ
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'

@Component({ components: { ControllerBox } })
export default class IndexComponent extends Vue {
  created() {
    console.log(process.env.CLIENT_ID)
  }
}
</script>

<style lang="scss">
.arrow-down {
  .c {
    stroke: red;
  }
}
</style>
