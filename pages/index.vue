<template>
  <div class="container">
    <input v-model="domainName" type="text" />
    <button @click="doLogin">login</button>
    <ControllerBox title="hoge"> hogegege </ControllerBox>
    aaaaああああ
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'
import { authStore } from '~/store'

@Component({ components: { ControllerBox } })
export default class IndexComponent extends Vue {
  get domainName(): string {
    return authStore.getDomainName
  }

  set domainName(value: string) {
    authStore.setDomainName(value)
  }

  doLogin(): void {
    authStore.doLogin()
  }

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
