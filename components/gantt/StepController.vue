<template>
  <div class="step-controller">
    <ButtonSet :buttons="buttons" @change="onChange" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import dayjs, { Dayjs } from 'dayjs'
import ButtonSet, { Button } from '@/components/common/ButtonSet.vue'
import { ganttStore } from '~/store'
interface StepButton extends Button {
  value: 'today' | 'back' | 'next'
}
@Component({
  components: { ButtonSet },
})
export default class GanttPeriodSetter extends Vue {
  get startDate(): Dayjs {
    return ganttStore.getStartDate
  }

  get buttons(): StepButton[] {
    return [
      { text: 'Today', value: 'today' },
      { text: 'Back', value: 'back' },
      { text: 'Next', value: 'next' },
    ]
  }

  onChange(button: StepButton): void {
    switch (button.value) {
      case 'today':
        ganttStore.setStart(dayjs().toISOString())
        break
      case 'back':
        ganttStore.setStart(this.startDate.add(-7, 'day').toISOString())
        break
      case 'next':
        ganttStore.setStart(this.startDate.add(7, 'day').toISOString())
    }
    ganttStore.fetchGantt()
  }
}
</script>
