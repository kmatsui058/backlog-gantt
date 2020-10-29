import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
  preserveState: true,
})
export default class authModule extends VuexModule {
  private domainName = ''
  private readonly clientId = process.env.CLIENT_ID
  private readonly clientSecret = process.env.CLIENT_SECRET

  get getDomainName(): string {
    return this.domainName
  }

  @Mutation
  setDomainName(value: string) {
    this.domainName = value
  }

  @Action
  doLogin() {
    if (!this.domainName) {
      alert('no domain name')
      return
    }
    location.href = `${this.domainName}/OAuth2AccessRequest.action?response_type=code&client_id=${this.clientId} `
  }
}
