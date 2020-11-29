<template>
  <form @submit.prevent="onSubmit" @change="onChangeValue">
    <label v-for="user in allUsers" :key="user.data.id" class="item">
      <img :src="user.image" alt="" class="icon" />
      <input v-model="ids" type="checkbox" :value="user.data.id" />
    </label>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { filterStore } from '~/store'
import { User } from '~/store/filter'

@Component({ components: {} })
export default class MemberFilter extends Vue {
  ids: number[] = []
  get allUsers(): User[] {
    return filterStore.allUsers
  }

  get selectedUserIds(): number[] {
    return filterStore.getSelectedUserId
  }

  beforeDestroy(): void {}

  onSubmit(): void {
    this.$modal.pop()
  }

  onChangeValue(): void {
    filterStore.setSelectedUsers(this.ids)
  }

  @Watch('selectedUserIds', { immediate: true })
  onChangeSelectedUserIds(): void {
    this.ids = this.selectedUserIds
  }
}
</script>
