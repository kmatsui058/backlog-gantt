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
      <div v-for="task in tasks" :key="task.id" class="row"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import ArrowLeft from '@/assets/images/icons/arrow-left.svg?inline'
import dayjs, { Dayjs } from 'dayjs'
import * as holidayJp from '@holiday-jp/holiday_jp'
import { Task } from '~/api'
import { dateStore } from '~/store'
interface Month {
  style: string
  month: string
}
@Component({
  components: { ArrowLeft },
})
export default class GantttableLeft extends Vue {
  @Prop({ type: Array, required: true }) readonly tasks!: Task[]

  get wrapperStyle(): string {
    return `width: ${this.days.length * 20}px;`
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
        20
      const left =
        this.days.findIndex((testDay) => testDay.month() === day.month()) * 20
      result.push({
        month: day.format('YYYY/MM'),
        style: `width: ${width}px;left: ${left}`,
      })
    }
    return result
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
  &.today {
    background-color: rgba(248, 128, 128, 0.404);
  }
  &.weekday {
    background-color: rgba(146, 146, 146, 0.5);
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
  &.title {
    font-size: 12px;
    color: $c-gray;
  }
}
</style>
