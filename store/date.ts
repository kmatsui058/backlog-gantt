import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import dayjs, { Dayjs } from 'dayjs'
export type Period = 'month' | '2month' | 'quarter' | 'half'
export function addPeriod(start: Dayjs, period: Period): Dayjs {
  switch (period) {
    case 'month':
      return start.add(1, 'month')
    case '2month':
      return start.add(2, 'month')
    case 'quarter':
      return start.add(3, 'month')
    case 'half':
      return start.add(6, 'month')
  }
}
@Module({
  name: 'date',
  stateFactory: true,
  namespaced: true,
  preserveState: false,
})
export default class DateModule extends VuexModule {
  private start: string = dayjs().toISOString()
  private period: Period | null = 'quarter'
  private end: string = addPeriod(dayjs(this.start), 'quarter').toISOString()

  get getStartDate(): Dayjs {
    return dayjs(this.start)
  }

  get getEndDate(): Dayjs {
    return dayjs(this.end)
  }

  get getPeriod(): Period | null {
    return this.period
  }

  @Mutation
  setStart(value: string | Date): void {
    const diff = dayjs(this.start).diff(this.end, 'day')
    this.start = dayjs(value).toISOString()
    if (this.period) {
      this.end = addPeriod(dayjs(this.start), this.period).toISOString()
    } else {
      this.end = dayjs(this.start).add(-diff, 'day').toISOString()
    }
  }

  @Mutation
  setEnd(value: string | Date): void {
    this.end = dayjs(value).toISOString()
    this.period = null
  }

  @Mutation
  setPeriod(value: Period | null): void {
    this.period = value
    if (this.period) {
      this.end = addPeriod(dayjs(this.start), this.period).toISOString()
    }
  }

  @Action
  fetchGantt(): void {}
}
