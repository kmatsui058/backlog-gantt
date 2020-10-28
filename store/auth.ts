import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { AxiosError } from 'axios'
import { $api, Oauth2TokenRequestGrantTypeEnum } from '~/utils/api'
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
  async fetchToken(): Promise<void> {
    if (!this.code || !this.clientId || !this.clientSecret)
      throw new Error('no require data')
    const res = await $api
      .apiV2Oauth2TokenPost(
        Oauth2TokenRequestGrantTypeEnum.AuthorizationCode,
        this.code,
        this.clientId,
        this.clientSecret
      )
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 400) {
          this.doOAuth()
        }
      })
  }

  @Action
  doOAuth(): void {
    if (!this.getBacklogDomain) throw new Error('no domain data')
    if (!this.clientId) throw new Error('no client id')
    location.href = `${this.getBacklogDomain}/OAuth2AccessRequest.action?response_type=code&client_id=${this.clientId}`
  }
}
