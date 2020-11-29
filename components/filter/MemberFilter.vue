<template>
  <form @submit.prevent="onSubmit" @change="onChangeValue">
    <div class="title">MEMBERS</div>
    <label v-for="user in allUsers" :key="user.data.id" class="item">
      <img v-if="user.image" :src="user.image" alt="" class="item__icon" />
      <span v-else class="item__icon item__icon--text">{{
        user.data.name && user.data.name[0].toUpperCase() + user.data.name[1]
      }}</span>
      <span class="item__name">{{ user.data.name }}</span>
      <input v-model="ids" type="checkbox" :value="user.data.id" />
    </label>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { filterStore, ganttStore } from '~/store'
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

  beforeDestroy(): void {
    ganttStore.fetchGantt()
  }

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
<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: $c-navy;
  margin-bottom: 20px;
}
.item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgb(231, 231, 231);
  cursor: pointer;
  &__icon {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    &--text {
      border: 1px solid $c-navy;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      font-size: 13px;
    }
  }
  &__name {
    flex-grow: 1;
  }
}
</style>
