import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $api, initializeApi } from '~/utils/api'

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
})
export default class AuthModule extends VuexModule {
  private backlogDomain = 'https://ediplex.backlog.jp/'
  private readonly clientId = process.env.CLIENT_ID
  private readonly clientSeacret = process.env.CLIENT_SECRET

  get getBacklogDomain(): string {
    return this.backlogDomain
  }

  @Mutation
  setBacklogDomain(value: string): void {
    this.backlogDomain = value
    initializeApi()
  }

  @Action
  async doOAuth(): Promise<void> {
    if (!this.getBacklogDomain) throw new Error('no domain data')
    if (!this.clientId) throw new Error('no client id')
    await $api.oAuth2AccessRequestActionGet('code', this.clientId)
  }
}
