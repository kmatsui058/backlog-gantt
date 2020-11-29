<template>
  <div class="gantt-table-right">
    <div class="wrapper" :style="wrapperStyle">
      <div class="days">
        <div
          v-for="(day, key) in days"
          :key="key"
          class="day"
          :class="classByDate(day)"
        >
          {{ day.format('D') }}
        </div>
      </div>
      <div class="monthes">
        <div
          v-for="(month, key) in monthes"
          :key="key"
          class="month"
          :style="month.style"
        >
          {{ month.month }}
        </div>
      </div>
      <div class="head"></div>
      <div class="row title"></div>
      <div v-for="taskRect in taskRects" :key="taskRect.task.id" class="row">
        <a
          class="task"
          :style="taskRect.style"
          :href="taskRect.href"
          target="_blank"
        >
          <div class="task__bg" :style="taskRect.bgStyle"></div>
          <span class="task__text">{{ taskRect.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import ArrowLeft from '@/assets/images/icons/arrow-left.svg?inline'
import dayjs, { Dayjs } from 'dayjs'
import * as holidayJp from '@holiday-jp/holiday_jp'
import { Task } from '~/api'
import { authStore, dateStore } from '~/store'
interface Month {
  style: string
  month: string
}
interface TaskRect {
  style: string
  bgStyle: string
  title: string
  task: Task
  href: string
}
@Component({
  components: { ArrowLeft },
})
export default class GantttableLeft extends Vue {
  @Prop({ type: Array, required: true }) readonly tasks!: Task[]

  get tableColWidth(): number {
    return 20
  }

  get tableHeadHeight(): number {
    return 30
  }

  get wrapperStyle(): string {
    return `width: ${this.days.length * this.tableColWidth}px;`
  }

  get startDate(): Dayjs {
    return dateStore.getStartDate
  }

  get endDate(): Dayjs {
    return dateStore.getEndDate
  }

  get days(): Dayjs[] {
    const diffDate = this.endDate.diff(this.startDate, 'day')
    const result: Dayjs[] = []
    for (let i = 0; i <= diffDate; i++) {
      result.push(this.startDate.add(i, 'day'))
    }
    return result
  }

  get monthes(): Month[] {
    const diffMonth = this.endDate.diff(this.startDate, 'month')
    const result: Month[] = []
    for (let i = 0; i <= diffMonth; i++) {
      const day = this.startDate.add(i, 'month')
      const width =
        this.days.filter((testDay) => testDay.month() === day.month()).length *
        this.tableColWidth
      const left =
        this.days.findIndex((testDay) => testDay.month() === day.month()) *
        this.tableColWidth
      result.push({
        month: day.format('YYYY/MM'),
        style: `width: ${width}px;left: ${left}`,
      })
    }
    return result
  }

  get taskRects(): TaskRect[] {
    return this.tasks.map((task) => {
      const opacity = !task.startDate || !task.dueDate ? 0 : 0.4
      const taskStartDate = dayjs(task.startDate || '')
      const taskDueDate = dayjs(task.dueDate || '')
      const leftEdge = taskStartDate.isBefore(this.startDate)
        ? this.startDate
        : taskStartDate
      console.log({ leftEdge })
      const rightEdge = taskDueDate.isBefore(this.endDate)
        ? taskDueDate
        : this.endDate
      console.log({ rightEdge })

      const leftPosition =
        this.days.findIndex(
          (testDay) =>
            testDay.format('YYYY/MM/DD') === leftEdge.format('YYYY/MM/DD')
        ) * this.tableColWidth
      const rightPosition =
        this.days.findIndex(
          (testDay) =>
            testDay.format('YYYY/MM/DD') === rightEdge.format('YYYY/MM/DD')
        ) * this.tableColWidth
      return {
        style: `left: ${leftPosition}px;width: ${
          rightPosition - leftPosition + this.tableColWidth
        }px;`,
        bgStyle: `background-color:${task.status.color};opacity: ${opacity};`,
        title: task.summary,
        task,
        href: `${authStore.getBacklogDomain}/view/${task.issueKey}`,
      }
    })
  }

  classByDate(day: Dayjs): string[] {
    const result: string[] = []
    if (day.format('YYYY/MM/DD') === dayjs().format('YYYY/MM/DD'))
      result.push('today')
    if (holidayJp.isHoliday(day.toDate()) || day.day() === 0 || day.day() === 6)
      result.push('weekday')
    return result
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  white-space: nowrap;
  position: relative;
  border-left: 1px solid $c-navy;
}
.days,
.monthes {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  bottom: 0;
}
.days {
  top: $table-head-height;
  &.hide {
    border: none;
    position: static;
  }
}
.day {
  width: $table-col-width;
  border-right: 1px solid rgb(221, 221, 221);
  text-align: center;
  font-size: 11px;
  padding-top: #{$table-head-height-normal - 10}px;
  color: $c-gray;
  flex-shrink: 0;

  &.weekday {
    background-color: rgba(216, 216, 216, 0.5);
  }
  &.today {
    background-color: rgba(255, 184, 184, 0.404);
  }
}
.month {
  overflow: hidden;
  border-right: 1px solid $c-navy;
  text-align: center;
  font-size: 13px;
  padding-top: 5px;
}
.head {
  height: $table-head-height;
  border-bottom: 1px solid $c-navy;
}
.row {
  overflow: hidden;
  height: $table-row-height;
  line-height: $table-row-height;
  text-overflow: ellipsis;
  border-bottom: 1px solid $c-navy;
  font-size: 12px;
  position: relative;
  &.title {
    font-size: 12px;
    color: $c-gray;
  }
}
.task {
  position: relative;
  display: block;
  padding: 0 5px;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
  &__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 5px;
  }
  &__text {
    position: relative;
    color: #000;
  }
}
</style>
