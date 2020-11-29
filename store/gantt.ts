import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios, { AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import { Task } from '~/api'
import { $apiConfig } from '~/plugins/api-accessor'
import { dateStore, filterStore } from '~/utils/store-accessor'
@Module({
  name: 'gantt',
  stateFactory: true,
  namespaced: true,
  preserveState: false,
})
export default class DateModule extends VuexModule {
  private response: Task[] | null = null
  get getTask(): Task[] | null {
    return this.response
  }

  @Mutation
  setTask(value: Task[]): void {
    this.response = value
  }

  @Action
  async fetchGantt(): Promise<void> {
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
      headers: { Authorization: $apiConfig.baseOptions.Authorization },
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
    if (!res) return
    this.setTask(res.data)
  }
}
