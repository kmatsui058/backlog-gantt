<template>
  <div
    class="member-filter-button"
    :class="{ disabled: projectLoading }"
    @click="onClick"
  >
    <ControllerBox title="MEMBER" help="ガントを表示するユーザーを選択します">
      <client-only>
        <div v-if="projectLoading" class="loading">wait a moment...</div>
        <IconSelector v-else-if="icons.length" :icons="icons" />
        <div v-else class="no-member">select member...</div>
      </client-only>
    </ControllerBox>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'
import IconSelector, { Icon } from '@/components/common/IconSelector.vue'
import { User } from '~/store/filter'
import { filterStore } from '~/store'

@Component({ components: { ControllerBox, IconSelector } })
export default class MemberFilterButton extends Vue {
  get filteredUsers(): User[] {
    return filterStore.filteredUsers
  }

  get projectLoading(): boolean {
    return filterStore.getLoading
  }

  get icons(): Icon[] {
    return this.filteredUsers.map((user) => {
      return { path: user.image, text: user.data.name }
    })
  }

  onClick(): void {
    if (this.projectLoading) return
    this.$modal.push('member-filter')
  }
}
</script>
<style lang="scss" scoped>
.member-filter-button {
  transition: opacity 0.2s;
  cursor: pointer;
  &.disabled {
    cursor: wait;
    opacity: 0.2;
  }
}
.no-member {
  height: 1em;
  line-height: 1;
}
</style>
