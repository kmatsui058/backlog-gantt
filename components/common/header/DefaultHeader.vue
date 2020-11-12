<template>
  <div class="default-header">
    <h1 class="title">{{ title }}</h1>
    <div class="right">
      <div class="help"></div>
      <div v-if="userName" class="user">
        <div class="user__image">
          <img v-if="userImage" :src="userImage" alt="" />
        </div>
        <div class="user__name">{{ userName }}</div>
      </div>
      <button v-else class="login">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { authStore } from '~/store'

@Component
export default class DefaultHeader extends Vue {
  get title(): string {
    return this.$route.meta.title
  }

  get userImage(): string | null {
    return authStore.getSelfImage
  }

  get userName(): string | null {
    return authStore.getSelf ? authStore.getSelf.name : null
  }
}
</script>

<style lang="scss" scoped>
$h: 84px;
.default-header {
  display: flex;
  align-items: center;
  height: $h;
  padding: 0 36px;
}
.title {
  flex-grow: 1;
  color: $c-white;
  font-size: 25px;
  font-weight: bold;
  margin: 0;
  height: $h;
  line-height: $h;
}
.user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &__image {
    margin-right: 15px;
    img {
      border-radius: 50%;
    }
  }
  &__name {
    font-size: 13px;
    color: $c-white;
  }
}
</style>
