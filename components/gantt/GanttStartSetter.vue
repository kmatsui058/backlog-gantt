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
import { dateStore, ganttStore } from '~/store'

@Component({
  components: { CalendarIcon },
})
export default class GanttStartSetter extends Vue {
  date = new Date()

  get startDate(): string {
    return dateStore.getStartDate.format('YYYY-MM-DD')
  }

  get endDate(): string {
    return dateStore.getEndDate.format('YYYY-MM-DD')
  }

  onInput(date: Date): void {
    dateStore.setStart(dayjs(date).toISOString())
    ganttStore.fetchGantt()
  }

  @Watch('startDate', { immediate: true })
  onChangeStartDate(): void {
    this.date = new Date(dateStore.getStartDate.toISOString())
  }
}
</script>
