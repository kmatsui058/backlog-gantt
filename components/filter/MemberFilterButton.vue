<template>
  <button @click="$modal.push('member-filter')">
    <ControllerBox title="MEMBER">
      <IconSelector v-if="icons.length" :icons="icons" />
      <div v-else class="no-member">select member...</div>
    </ControllerBox>
  </button>
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

  get icons(): Icon[] {
    return this.filteredUsers.map((user) => {
      return { path: user.image, text: user.data.name }
    })
  }
}
</script>
<style lang="scss" scoped>
.no-member {
  height: 1em;
  line-height: 1;
}
</style>
