<template>
  <div class="container">
    <FilterArea></FilterArea>
    <GanttView />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import FilterArea from '@/components/filter/FilterArea.vue'
import GanttView from '@/components/gantt/GanttView.vue'

import { authStore, filterStore } from '@/store'
import { User } from '@/store/filter'
import { UserData } from '~/api'
@Component({ components: { FilterArea, GanttView } })
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

  created(): void {
    this.$route.meta.title = 'Dashboard'
  }

  mounted(): void {
    this.$router.push({ query: { code: undefined } })
  }
}
</script>
