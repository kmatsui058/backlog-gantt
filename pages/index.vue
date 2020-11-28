<template>
  <div class="container">
    <ControllerBox title="hoge"> {{ self }}</ControllerBox>
    <ul>
      <li v-for="user in users" :key="user.data.id">
        <img :src="user.image" alt="" />
        {{ user.data.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'
import { authStore, filterStore } from '@/store'
import { User } from '@/store/filter'
import { UserData } from '~/api'
@Component({ components: { ControllerBox } })
export default class IndexComponent extends Vue {
  get self(): UserData | null {
    return authStore.getSelf
  }

  get code(): string | undefined {
    const code = this.$route.query.code
    if (typeof code === 'string') {
      return code
    }
  }

  get users(): User[] {
    return filterStore.allUsers
  }

  dofetch(): void {
    if (!this.code) {
      alert('no code')
      return
    }
    authStore.setCode(this.code)
    authStore.fetchToken()
  }

  created(): void {
    this.$route.meta.title = 'Dashboard'
  }

  mounted(): void {
    this.$router.push({ query: { code: undefined } })
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
