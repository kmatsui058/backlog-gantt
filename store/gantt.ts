import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios, { AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import { Project, User } from './filter'
import { Task } from '~/api'
import { $apiConfig } from '~/plugins/api-accessor'
import { authStore, dateStore, filterStore } from '~/utils/store-accessor'

export interface Group {
  label: User | Project | null
  tasks: Task[]
}

@Module({
  name: 'gantt',
  stateFactory: true,
  namespaced: true,
  preserveState: false,
})
export default class DateModule extends VuexModule {
  private response: Task[] | null = null
  private loading = false
  get getTask(): Task[] | null {
    return this.response
  }

  get getLoading(): boolean {
    return this.loading
  }

  get groupingTask(): Group[] | null {
    if (!this.response || this.response.length === 0) return null
    const grouping = filterStore.getGrouping
    switch (grouping) {
      case 'none': {
        return [
          {
            label: null,
            tasks: this.response,
          },
        ]
      }
      case 'member': {
        if (filterStore.getSelectedUserId.length) {
          return filterStore.getSelectedUserId.map((userId) => {
            const label =
              filterStore.allUsers.find((user) => user.data.id === userId) ||
              null
            const tasks = this.response
              ? this.response.filter((task) => task.assignee.id === userId)
              : []
            return { label, tasks }
          })
        } else {
          return filterStore.allUsers.map((testUser) => {
            const userId = testUser.data.id
            const label = testUser
            const tasks = this.response
              ? this.response.filter((task) => task.assignee.id === userId)
              : []
            return { label, tasks }
          })
        }
      }
      case 'project': {
        if (filterStore.getSelectedProjectId.length) {
          return filterStore.getSelectedProjectId.map((projectId) => {
            const label =
              filterStore.getProjects.find(
                (project) => project.data.id === projectId
              ) || null
            const tasks = this.response
              ? this.response.filter((task) => task.projectId === projectId)
              : []
            return { label, tasks }
          })
        } else {
          return filterStore.getProjects.map((project) => {
            const projectId = project.data.id
            const label = project
            const tasks = this.response
              ? this.response.filter((task) => task.projectId === projectId)
              : []
            return { label, tasks }
          })
        }
      }
    }
  }

  @Mutation
  setTask(value: Task[] | null): void {
    this.response = value
  }

  @Mutation
  setLoading(value: boolean): void {
    this.loading = value
  }

  @Action
  async fetchGantt(): Promise<void> {
    this.setLoading(true)
    this.setTask(null)
    const projectId = filterStore.getSelectedProjectId.length
      ? filterStore.getSelectedProjectId
      : undefined
    const statusId =
      filterStore.getSelectedStatus && filterStore.getSelectedStatus.length
        ? filterStore.getSelectedStatus
        : undefined
    const assigneeId = filterStore.getSelectedUserId.length
      ? filterStore.getSelectedUserId
      : undefined
    const startDate = dateStore.getStartDate.format('YYYY-MM-DD')
    const endDate = dateStore.getEndDate.format('YYYY-MM-DD')
    // openapi generatorのバグで配列を処理できないようなので応急処置 https://github.com/OpenAPITools/openapi-generator/issues/7966
    const res: void | AxiosResponse<Task[]> = await axios({
      headers: { Authorization: `Bearer ${authStore.getAccessToken}` },
      baseURL: $apiConfig.basePath,
      method: 'get',
      url: '/api/v2/issues',
      params: {
        projectId,
        statusId,
        assigneeId,
        count: 100,
        startDateUntil: endDate,
        dueDateSince: startDate,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params)
      },
    }).catch((err: AxiosError) => console.log(err.config))
    this.setLoading(false)
    if (!res) {
      return
    }
    this.setTask(res.data)
  }
}
