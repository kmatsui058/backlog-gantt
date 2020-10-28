<template>
  <div class="container">
    <ControllerBox title="hoge">
      {{ clientId }}
    </ControllerBox>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'

@Component({ components: { ControllerBox } })
export default class IndexComponent extends Vue {
  clientId = process.env.CLIENT_ID
  created(): void {
    console.log(this.clientId)
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
