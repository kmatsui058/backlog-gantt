import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { AxiosError, AxiosResponse } from 'axios'
import { $apiConfig } from '@/plugins/api-accessor'
import {
  DefaultApi,
  Oauth2TokenRequestGrantTypeEnum,
  Oauth2TokenRequestResponse,
  UserData,
} from '~/api'
import { filterStore, ganttStore } from '~/utils/store-accessor'

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
  private loading: boolean = false

  get getBacklogDomain(): string {
    return this.backlogDomain.replace(/\/$/, '')
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

  get getLoading(): boolean {
    return this.loading
  }

  @Mutation
  setBacklogDomain(value: string): void {
    this.backlogDomain = value.replace(/\/$/, '')
    $apiConfig.basePath = this.backlogDomain.replace(/\/$/, '')
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

    if (this.accessToken) {
      $apiConfig.accessToken = this.accessToken
      $apiConfig.baseOptions.Authorization = `Bearer ${this.accessToken}`
    } else {
      $apiConfig.accessToken = undefined
      $apiConfig.baseOptions.Authorization = undefined
    }
  }

  @Mutation
  setSelf(value: UserData | null): void {
    this.self = value
  }

  @Mutation
  setSelfImage(value: string | null): void {
    this.selfImage = value
  }

  @Mutation
  setLoading(value: boolean): void {
    this.loading = value
  }

  @Mutation
  logout(): void {
    this.accessToken = null
    this.refreshToken = null
    this.code = null
    this.self = null
    this.selfImage = null
    filterStore.initialize()
    ganttStore.setTask(null)
    localStorage.clear()
  }

  @Action
  async fetchToken(): Promise<void> {
    if (!this.code || !this.clientId || !this.clientSecret)
      throw new Error('no require data')
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
    if (!res) {
      return
    }
    this.setToken(res.data)
  }

  @Action
  async refresh(): Promise<void> {
    if (!this.clientId || !this.clientSecret || !this.refreshToken)
      throw new Error('no require data@refresh')
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
  }

  @Action
  async fetchSelf(): Promise<void> {
    this.setLoading(true)
    filterStore.initialize()
    if (!this.accessToken) {
      Promise.reject(new Error('no access token'))
      return
    }
    const res: AxiosResponse<UserData> = await new DefaultApi(
      $apiConfig
    ).apiV2UsersMyselfGet()
    this.setLoading(false)
    if (!res) return
    this.setSelf(res.data)
    this.fetchUserImage(res.data.id.toFixed())
  }

  @Action
  doOAuth(): void {
    if (!this.getBacklogDomain) throw new Error('no domain data')
    if (!this.clientId) throw new Error('no client id')
    location.href = `${this.getBacklogDomain}/OAuth2AccessRequest.action?response_type=code&client_id=${this.clientId}`
  }

  @Action
  async fetchUserImage(id: string): Promise<void> {
    const res: AxiosResponse<Blob> = await new DefaultApi(
      $apiConfig
    ).apiV2UsersUserIdIconGet(id, {
      responseType: 'blob',
    })
    const reader = new FileReader()
    reader.onload = (ev): void => {
      const result = ev.target?.result
      if (typeof result === 'string') {
        this.setSelfImage(result)
      }
    }
    reader.readAsDataURL(res.data)
  }
}
