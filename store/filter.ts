import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Axios, { AxiosError, AxiosResponse } from 'axios'
import { $apiConfig } from '@/plugins/api-accessor'
import { DefaultApi, UserData, ProjectItem, Status } from '~/api'
import { authStore } from '~/utils/store-accessor'
export async function fetchUserImage(id: number): Promise<string> {
  const res: AxiosResponse<Blob> | void = await new DefaultApi($apiConfig)
    .apiV2UsersUserIdIconGet(id.toFixed(), {
      responseType: 'blob',
    })
    .catch((err) => console.log(err))
  if (!res) throw new Error('no res')
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (): void => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new TypeError('invalid image type'))
      }
    }
    reader.readAsDataURL(res.data)
  })
}

export async function fetchProjectImage(id: number): Promise<string> {
  const res: AxiosResponse<Blob> | void = await new DefaultApi($apiConfig)
    .apiV2ProjectsProjectIdOrKeyImageGet(id.toFixed(), {
      responseType: 'blob',
    })
    .catch((err) => console.log(err))
  if (!res) throw new Error('no res')
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (): void => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new TypeError('invalid image type'))
      }
    }
    reader.readAsDataURL(res.data)
  })
}

export async function fetchProjectStatus(id: number): Promise<Status[]> {
  const res = await new DefaultApi($apiConfig)
    .apiV2ProjectsProjectIdOrKeyStatusesGet(id.toFixed())
    .catch((err) => console.log(err))
  if (!res) throw new Error('no res')
  return res.data
}
export interface Project {
  data: ProjectItem
  image: string
  users: number[]
  statuses: Status[]
}

export interface User {
  data: UserData
  image: string
}

export type Grouping = 'none' | 'member' | 'project'
export type StatusFilter = 'all' | 'without-complete' | string[]
@Module({
  name: 'filter',
  stateFactory: true,
  namespaced: true,
  preserveState: false,
})
export default class AuthModule extends VuexModule {
  private projects: Project[] = []
  private users: User[] = []
  private selectedUserId: number[] = []
  private selectedProjectId: number[] = []
  private loading: boolean = true
  private grouping: Grouping = 'none'
  private statusFilter: StatusFilter = 'without-complete'

  get getProjects(): Project[] {
    return this.projects
  }

  get prjectsIdList(): number[] {
    return this.projects.map((project): number => {
      return project.data.id
    })
  }

  get allUsers(): User[] {
    return this.users
  }

  get getSelectedUserId(): number[] {
    return this.selectedUserId
  }

  get getSelectedProjectId(): number[] {
    return this.selectedProjectId
  }

  get filteredUsers(): User[] {
    return this.users.filter((testUser) =>
      this.selectedUserId.includes(testUser.data.id)
    )
  }

  get filteredProjects(): Project[] {
    return this.projects.filter((testProject) =>
      this.selectedProjectId.includes(testProject.data.id)
    )
  }

  get getLoading(): boolean {
    return this.loading
  }

  get getGrouping(): Grouping {
    return this.grouping
  }

  get getStatusFilter(): StatusFilter {
    return this.statusFilter
  }

  get allStatusNames(): string[] {
    const result: string[] = []
    this.projects.forEach((project) => {
      project.statuses.forEach((status) => {
        if (!result.includes(status.name)) result.push(status.name)
      })
    })
    return result
  }

  @Mutation
  setProjects(value: Project[]): void {
    this.projects = value
  }

  @Mutation
  setUsers(users: User[]): void {
    this.users = users
  }

  @Mutation
  pushUsers(user: User): void {
    const test = this.users.find((refUser) => refUser.data.id === user.data.id)
    if (!test) this.users.push(user)
  }

  @Mutation
  setSelectedUsers(userIds: number[]): void {
    this.selectedUserId = userIds
  }

  @Mutation
  setSelectedProjects(projectIds: number[]): void {
    this.selectedProjectId = projectIds
  }

  @Mutation
  setLoading(value: boolean): void {
    this.loading = value
  }

  @Mutation
  initialize(): void {
    this.projects = []
    this.users = []
    this.selectedUserId = []
    this.selectedProjectId = []
  }

  @Mutation
  setGrouping(value: Grouping): void {
    this.grouping = value
  }

  @Mutation
  setStatusFilter(value: StatusFilter): void {
    this.statusFilter = value
  }

  @Action
  async fetchProjects(): Promise<void> {
    this.setLoading(true)
    this.setProjects([])
    this.setUsers([])
    const res: AxiosResponse<ProjectItem[]> = await new DefaultApi($apiConfig)
      .apiV2ProjectsGet()
      .catch(async (err: AxiosError) => {
        if (err.response && err.response.status === 401) {
          await authStore.refresh()
          return Axios.request(err.config)
        } else {
          throw err
        }
      })
    const projects: Project[] = []
    await Promise.all(
      res.data.map(
        async (project): Promise<void> => {
          const users = await this.fetchUsers(project.id).catch((err) =>
            console.log(err)
          )
          const image = await fetchProjectImage(project.id).catch((err) =>
            console.log(err)
          )
          const statuses = await fetchProjectStatus(project.id).catch((err) =>
            console.log(err)
          )
          projects.push({
            data: project,
            users: users || [],
            image: image || '',
            statuses: statuses || [],
          })
        }
      )
    )
    this.setLoading(false)
    this.setProjects(projects)
  }

  @Action
  async addUser(user: UserData): Promise<void> {
    const test = this.allUsers.find((refUser) => refUser.data.id === user.id)
    if (test) return
    const image = await fetchUserImage(user.id).catch((err) => console.log(err))
    this.pushUsers({ data: user, image: image || '' })
  }

  @Action
  async fetchUsers(projectId: number): Promise<number[]> {
    const res: AxiosResponse<UserData[]> = await new DefaultApi($apiConfig)
      .apiV2ProjectsProjectIdOrKeyUsersGet(projectId.toFixed())
      .catch(async (err: AxiosError) => {
        if (err.response && err.response.status === 401) {
          await authStore.refresh()
          return Axios.request(err.config)
        } else {
          throw err
        }
      })
    const users: number[] = []
    await Promise.all(
      res.data.map(
        async (user): Promise<void> => {
          const test = this.allUsers.find(
            (refUser) => refUser.data.id === user.id
          )
          users.push(user.id)
          if (!test) await this.addUser(user)
        }
      )
    )
    return users
  }
}
