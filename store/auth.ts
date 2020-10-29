import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Axios, { AxiosError } from 'axios'
import { $apiConfig } from '@/plugins/api-accessor'
import {
  DefaultApi,
  Oauth2TokenRequestGrantTypeEnum,
  Oauth2TokenRequestResponse,
  UserData,
} from '~/api'

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
  private refreshToken: string | null = null
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
    $apiConfig.basePath = this.backlogDomain
  }

  @Mutation
  setCode(value: string): void {
    this.code = value
  }

  @Mutation
  setToken(value: Oauth2TokenRequestResponse | null): void {
    if (value) {
      this.accessToken = value.access_token || null
      this.refreshToken = value.refresh_token || null
    } else {
      this.accessToken = null
    }

    if (this.accessToken) $apiConfig.accessToken = this.accessToken
  }

  @Mutation
  setSelf(value: UserData | null): void {
    this.self = value
  }

  @Action
  async fetchToken(): Promise<void> {
    if (!this.code || !this.clientId || !this.clientSecret)
      throw new Error('no require data')
    console.log({ $apiConfig })
    const res = await new DefaultApi($apiConfig)
      .apiV2Oauth2TokenPost(
        Oauth2TokenRequestGrantTypeEnum.AuthorizationCode,
        this.clientId,
        this.clientSecret,
        this.code
      )
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 400) {
          this.doOAuth()
        } else {
          throw err
        }
      })
    if (!res) return
    this.setToken(res.data)
    await this.fetchSelf()
  }

  @Action
  async refresh(): Promise<void> {
    if (!this.clientId || !this.clientSecret || !this.refreshToken)
      throw new Error('no require data@refresh')
    console.log({ $apiConfig })
    this.setToken(null)
    const res = await new DefaultApi($apiConfig)
      .apiV2Oauth2TokenPost(
        Oauth2TokenRequestGrantTypeEnum.RefreshToken,
        this.clientId,
        this.clientSecret,
        undefined,
        undefined,
        this.refreshToken
      )
      .catch(async (err: AxiosError) => {
        if (err.response && err.response.status === 400) {
          await this.doOAuth()
        } else {
          throw err
        }
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
    console.log({ $apiConfig })
    const res = await new DefaultApi($apiConfig)
      .apiV2UsersMyselfGet()
      .catch(async (err: AxiosError) => {
        console.log(err.response)
        if (err.response && err.response.status === 401) {
          await this.refresh()
          return Axios.request(err.config)
        } else {
          throw err
        }
      })
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
