<template>
  <div class="container">
    <input v-model="domain" type="text" />
    <button @click="doLogin">login</button>
    <ControllerBox title="hoge"> {{ self }}</ControllerBox>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'
import { authStore } from '@/store'
import { UserData } from '~/api'
@Component({ components: { ControllerBox } })
export default class IndexComponent extends Vue {
  get domain(): string {
    return authStore.getBacklogDomain
  }

  get self(): UserData | null {
    return authStore.getSelf
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

  async created(): Promise<void> {}
}
</script>

<style lang="scss">
.arrow-down {
  .c {
    stroke: red;
  }
}
</style>
