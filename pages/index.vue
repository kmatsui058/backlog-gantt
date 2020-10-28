<template>
  <div class="container">
    <input v-model="domain" type="text" />
    <button @click="doLogin">login</button>
    <ControllerBox title="hoge"> </ControllerBox>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'
import { authStore } from '@/store'
@Component({ components: { ControllerBox } })
export default class IndexComponent extends Vue {
  get domain(): string {
    return authStore.getBacklogDomain
  }

  set domain(value: string) {
    authStore.setBacklogDomain(value)
  }

  get code(): string | undefined {
    const code = this.$route.query.code
    if (typeof code === 'string') {
      return code
    }
  }

  doLogin(): void {
    authStore.doOAuth()
  }

  created(): void {
    if (this.code) {
      authStore.setCode(this.code)
    }
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
