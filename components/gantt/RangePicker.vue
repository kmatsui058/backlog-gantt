<template>
  <div class="range-picker">
    <v-date-picker
      v-model="range"
      :input-debounce="500"
      is-range
      @input="onInput"
    >
      <template v-slot="{ inputEvents }">
        <div class="wrapper">
          <button class="button" v-on="inputEvents.start">
            {{ startDateFormetted }}
            <CalendarIcon width="10" height="10" class="icon" />
          </button>
          -
          <button class="button" v-on="inputEvents.end">
            {{ endDateFormetted }}
            <CalendarIcon width="10" height="10" class="icon" />
          </button>
        </div>
      </template>
    </v-date-picker>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import dayjs, { Dayjs } from 'dayjs'
import CalendarIcon from '@/assets/images/icons/calendar.svg?inline'
import { dateStore } from '~/store'

@Component({
  components: { CalendarIcon },
})
export default class RangePicker extends Vue {
  range = {
    start: new Date(),
    end: new Date(),
  }

  get startDate(): Dayjs {
    return dateStore.getStartDate
  }

  get endDate(): Dayjs {
    return dateStore.getEndDate
  }

  get startDateFormetted(): string {
    return this.startDate.format('YYYY-MM-DD')
  }

  get endDateFormetted(): string {
    return this.endDate.format('YYYY-MM-DD')
  }

  onInput(date: { start: Date; end: Date }): void {
    dateStore.setStart(dayjs(date.start).toISOString())
    dateStore.setEnd(dayjs(date.end).toISOString())
    dateStore.fetchGantt()
  }

  @Watch('startDate', { immediate: true })
  onChangeStartDate(): void {
    this.range = { ...this.range, start: this.startDate.toDate() }
  }

  @Watch('endDate', { immediate: true })
  onChangeEndDate(): void {
    this.range = { ...this.range, end: this.endDate.toDate() }
  }
}
</script>
<style lang="scss" scoped>
.range-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: $c-navy;
  padding: 0 20px;
}
.button {
  font-weight: bold;
}
</style>
