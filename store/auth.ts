import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Axios, { AxiosError, AxiosResponse } from 'axios'
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
  private selfImage: string | null = null

  get getBacklogDomain(): string {
    return this.backlogDomain
  }

  get getAccessToken(): string | null {
    return this.accessToken
  }

  get getSelf(): UserData | null {
    return this.self
  }

  get getSelfImage(): string | null {
    return this.selfImage
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

  @Mutation
  setSelfImage(value: string | null): void {
    this.selfImage = value
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
    const res: AxiosResponse<UserData> = await new DefaultApi($apiConfig)
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
    await this.fetchUserImage(res.data.id.toFixed())
  }

  @Action
  doOAuth(): void {
    if (!this.getBacklogDomain) throw new Error('no domain data')
    if (!this.clientId) throw new Error('no client id')
    location.href = `${this.getBacklogDomain}/OAuth2AccessRequest.action?response_type=code&client_id=${this.clientId}`
  }

  @Action
  async fetchUserImage(id: string): Promise<void> {
    const res: AxiosResponse<Blob> = await new DefaultApi($apiConfig)
      .apiV2UsersUserIdIconGet(id, {
        responseType: 'blob',
      })
      .catch(async (err: AxiosError) => {
        console.log(err.response)
        if (err.response && err.response.status === 401) {
          await this.refresh()
          return Axios.request(err.config)
        } else {
          throw err
        }
      })
    const reader = new FileReader()
    reader.onload = (ev): void => {
      const result = ev.target?.result
      if (typeof result === 'string') {
        this.setSelfImage(result)
      }
    }
    reader.readAsDataURL(res.data)
    console.log(typeof res.data)
  }
}
