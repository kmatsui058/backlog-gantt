<template>
  <div class="default-header">
    <h1 class="title">{{ title }}</h1>
    <div class="right">
      <div class="help"></div>
      <client-only>
        <div v-if="initLoading" class="loading">-</div>
        <v-popover v-else-if="userName" trigger="click hover focus">
          <div class="user">
            <div class="user__image">
              <img v-if="userImage" :src="userImage" alt="" />
            </div>
            <div class="user__name">{{ userName }}</div>
          </div>
          <button slot="popover" class="popup" @click="doLogout">Logout</button>
        </v-popover>
        <v-popover v-else>
          <button class="login">Login</button>
          <form slot="popover" class="login__form" @submit.prevent="doLogin">
            <input v-model="domain" type="text" />
            <button @click="doLogin">login</button>
          </form>
        </v-popover>
      </client-only>
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

  get initLoading(): boolean {
    return authStore.getLoading
  }

  get domain(): string {
    return authStore.getBacklogDomain
  }

  set domain(value: string) {
    authStore.setBacklogDomain(value)
  }

  doLogout(): void {
    authStore.logout()
  }

  doLogin(): void {
    authStore.doOAuth()
  }
}
</script>

<style lang="scss" scoped>
$h: 84px;
.default-header {
  display: flex;
  align-items: center;
  height: $h;
  padding: 0 $side-space;
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
  cursor: pointer;
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
.login {
  font-size: 13px;
  color: $c-white;
}
button {
  @include button-reset;
}
</style>
