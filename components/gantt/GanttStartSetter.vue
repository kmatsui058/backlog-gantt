<template>
  <div class="start">
    start:
    <v-date-picker v-model="date" :input-debounce="500" @input="onInput">
      <template v-slot="{ inputValue, inputEvents }">
        <button class="" :value="inputValue" v-on="inputEvents">
          {{ startDate }} <CalendarIcon width="10" height="10" />
        </button>
      </template>
    </v-date-picker>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import CalendarIcon from '@/assets/images/icons/calendar.svg?inline'
import dayjs from 'dayjs'
import { ganttStore } from '~/store'
@Component({
  components: { CalendarIcon },
})
export default class GanttPeriodSetter extends Vue {
  date = new Date()

  get startDate(): string {
    return ganttStore.getStartDate.format('YYYY-MM-DD')
  }

  get endDate(): string {
    return ganttStore.getEndDate.format('YYYY-MM-DD')
  }

  onInput(date: Date): void {
    ganttStore.setStart(dayjs(date).toISOString())
    ganttStore.fetchGantt()
  }

  @Watch('startDate')
  onChangeStartDate(): void {
    this.date = new Date(ganttStore.getStartDate.toISOString())
  }
}
</script>
