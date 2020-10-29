import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { AxiosError } from 'axios'
import {
  $api,
  configuration,
  Oauth2TokenRequestGrantTypeEnum,
  Oauth2TokenRequestResponse,
  UserData,
} from '~/utils/api'
@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
  preserveState: true,
})
export default class AuthModule extends VuexModule {
  private backlogDomain = ''
  private readonly clientId = process.env.CLIENT_ID
  private readonly clientSecret = process.env.CLIENT_SECRET
  private code: string | null = null
  private accessToken: string | null = null
  private refleshToken: string | null = null
  private self: UserData | null = null
  get getBacklogDomain(): string {
    return this.backlogDomain
  }

  get getAccessToken(): string | null {
    return this.accessToken
  }

  get getSelf(): UserData | null {
    return this.self
  }

  @Mutation
  setBacklogDomain(value: string): void {
    this.backlogDomain = value
    configuration.basePath = this.backlogDomain
  }

  @Mutation
  setCode(value: string): void {
    this.code = value
  }

  @Mutation
  setToken(value: Oauth2TokenRequestResponse): void {
    this.accessToken = value.access_token || null
    this.refleshToken = value.refresh_token || null
    configuration.baseOptions.Authorization = `Bearer ${this.accessToken}`
  }

  @Mutation
  setSelf(value: UserData | null): void {
    this.self = value
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
        console.log(err.config)
        if (err.response && err.response.status === 400) {
          this.doOAuth()
        }
        throw err
      })
    if (!res) return
    this.setToken(res.data)
    await this.fetchSelf()
  }

  @Action
  async fetchSelf(): Promise<void> {
    if (!this.accessToken) {
      throw new Error('no access token')
    }
    const res = await $api.apiV2UsersMyselfGet()
    if (!res) return
    this.setSelf(res.data)
  }

  @Action
  doOAuth(): void {
    if (!this.getBacklogDomain) throw new Error('no domain data')
    if (!this.clientId) throw new Error('no client id')
    location.href = `${this.getBacklogDomain}/OAuth2AccessRequest.action?response_type=code&client_id=${this.clientId}`
  }
}
