import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
  preserveState: true,
})
export default class AuthModule extends VuexModule {
  private backlogDomain = 'https://ediplex.backlog.jp'
  private readonly clientId = process.env.CLIENT_ID
  private readonly clientSecret = process.env.CLIENT_SECRET
  private code: string | null = null

  get getBacklogDomain(): string {
    return this.backlogDomain
  }

  @Mutation
  setBacklogDomain(value: string): void {
    this.backlogDomain = value
  }

  @Mutation
  setCode(value: string): void {
    this.code = value
  }

  @Action
  doOAuth(): void {
    if (!this.getBacklogDomain) throw new Error('no domain data')
    if (!this.clientId) throw new Error('no client id')
    location.href = `https://ediplex.backlog.jp/OAuth2AccessRequest.action?response_type=code&client_id=${this.clientId}`
  }
}
