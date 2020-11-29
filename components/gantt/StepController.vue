<template>
  <div class="step-controller">
    <ButtonSet :buttons="buttons" @change="onChange" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import dayjs, { Dayjs } from 'dayjs'
import ButtonSet, { Button } from '@/components/common/ButtonSet.vue'
import { dateStore } from '~/store'
interface StepButton extends Button {
  value: 'today' | 'back' | 'next'
}
@Component({
  components: { ButtonSet },
})
export default class StepController extends Vue {
  get startDate(): Dayjs {
    return dateStore.getStartDate
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
        dateStore.setStart(dayjs().toISOString())
        break
      case 'back':
        dateStore.setStart(this.startDate.add(-7, 'day').toISOString())
        break
      case 'next':
        dateStore.setStart(this.startDate.add(7, 'day').toISOString())
    }
    dateStore.fetchGantt()
  }
}
</script>
