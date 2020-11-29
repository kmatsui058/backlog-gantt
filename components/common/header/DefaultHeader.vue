<template>
  <div class="default-header">
    <h1 class="title">{{ title }}</h1>
    <div class="right">
      <div class="help"></div>
      <client-only>
        <div v-if="initLoading" class="loading">-</div>
        <v-popover v-else-if="userName">
          <div class="user">
            <div class="user__image">
              <img v-if="userImage" :src="userImage" alt="" />
            </div>
            <div class="user__name">{{ userName }}</div>
          </div>
          <div slot="popover" class="popup logged-in">
            <button @click="doLogout">Logout</button>
            <button @click="reflesh">Reflesh</button>
          </div>
        </v-popover>
        <v-popover v-else>
          <button class="login">Login</button>
          <form slot="popover" class="login__form" @submit.prevent="doLogin">
            <p>Backlog Space URL</p>
            <input
              v-model="domain"
              type="text"
              placeholder="https://xxx.backlog.jp/"
            />
            <button class="login__submit" @click="doLogin"><Login /></button>
          </form>
        </v-popover>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Login from '@/assets/images/icons/log-in.svg?inline'
import { authStore, filterStore, ganttStore } from '~/store'
@Component({ components: { Login } })
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

  async reflesh(): Promise<void> {
    ganttStore.setTask(null)
    await authStore.fetchSelf()
    await filterStore.fetchProjects()
    await ganttStore.fetchGantt()
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
  &__submit:hover {
    color: $c-sky;
  }
}
.logged-in {
  display: flex;
  flex-direction: column;
  > * {
    padding: 10px 5px;
    &:hover {
      color: $c-sky;
    }
  }
}

button {
  @include button-reset;
}
</style>
