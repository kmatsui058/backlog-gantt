import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Axios, { AxiosError, AxiosResponse } from 'axios'
import { $apiConfig } from '@/plugins/api-accessor'
import { DefaultApi, UserData, ProjectItem } from '~/api'
import { authStore } from '~/utils/store-accessor'
async function fetchUserImage(id: number): Promise<string> {
  return await new Promise((resolve) => resolve(id.toFixed()))
  // console.log(`fetchUserImage ${id}`)
  // const res: AxiosResponse<Blob> | void = await new DefaultApi($apiConfig)
  //   .apiV2UsersUserIdIconGet(id.toFixed(), {
  //     responseType: 'blob',
  //   })
  //   .catch((err) => console.log(err))
  // if (!res) throw new Error('no res')
  // return new Promise((resolve, reject) => {
  //   const reader = new FileReader()
  //   reader.onload = (): void => {
  //     if (typeof reader.result === 'string') {
  //       resolve(reader.result)
  //     } else {
  //       reject(new TypeError('invalid image type'))
  //     }
  //   }
  //   reader.readAsDataURL(res.data)
  // })
}
export interface Project {
  data: ProjectItem
  users: User[]
}

export interface User {
  data: UserData
  image: string
}
@Module({
  name: 'filter',
  stateFactory: true,
  namespaced: true,
  preserveState: false,
})
export default class AuthModule extends VuexModule {
  private projects: Project[] = []

  get getProjects(): Project[] {
    return this.projects
  }

  get prjectsIdList(): number[] {
    return this.projects.map((project): number => {
      return project.data.id
    })
  }

  get allUsers(): User[] {
    const result: User[] = []
    this.projects.forEach((project): void => {
      project.users.forEach((user): void => {
        const test = result.find((refUser) => {
          return refUser.data.id === user.data.id
        })
        if (!test) result.push(user)
      })
    })
    return result
  }

  @Mutation
  setProjects(value: Project[]): void {
    this.projects = value
  }

  @Action
  async fetchProjects(): Promise<void> {
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
          const users = await this.fetchUsers(project.id)
          projects.push({ data: project, users })
        }
      )
    )

    this.setProjects(projects)
  }

  @Action
  async fetchUsers(projectId: number): Promise<User[]> {
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
    const users: User[] = []
    await Promise.all(
      res.data.map(
        async (user): Promise<void> => {
          const image = await fetchUserImage(user.id)
          users.push({ data: user, image })
        }
      )
    )
    return users
  }
}
