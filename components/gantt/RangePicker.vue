<template>
  <div class="range-picker">
    <v-date-picker
      v-model="range"
      :input-debounce="500"
      is-range
      @input="onInput"
    >
      <template v-slot="{ inputEvents }">
        <button class="" v-on="inputEvents.start">
          {{ startDateFormetted }} - {{ endDateFormetted }}
        </button>
      </template>
    </v-date-picker>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import dayjs, { Dayjs } from 'dayjs'
import { ganttStore } from '~/store'
@Component({
  components: {},
})
export default class RangePicker extends Vue {
  range = {
    start: new Date(),
    end: new Date(),
  }

  get startDate(): Dayjs {
    return ganttStore.getStartDate
  }

  get endDate(): Dayjs {
    return ganttStore.getEndDate
  }

  get startDateFormetted(): string {
    return this.startDate.format('YYYY-MM-DD')
  }

  get endDateFormetted(): string {
    return this.endDate.format('YYYY-MM-DD')
  }

  onInput(date: { start: Date; end: Date }): void {
    ganttStore.setStart(dayjs(date.start).toISOString())
    ganttStore.setEnd(dayjs(date.end).toISOString())
    ganttStore.fetchGantt()
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
