<template>
  <div class="step-controller">
    <ButtonSet :buttons="buttons" @change="onChange" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ButtonSet, { Button } from '@/components/common/ButtonSet.vue'
import { dateStore, ganttStore } from '~/store'
import { Period } from '~/store/date'
interface StepButton extends Button {
  value: Period
}
@Component({
  components: { ButtonSet },
})
export default class SwitchPeriod extends Vue {
  get selectedPeriod(): Period | null {
    return dateStore.getPeriod
  }

  get buttons(): StepButton[] {
    return [
      {
        text: 'Month',
        value: 'month',
        active: this.selectedPeriod === 'month',
      },
      {
        text: '2 Month',
        value: '2month',
        active: this.selectedPeriod === '2month',
      },
      {
        text: 'Quarter',
        value: 'quarter',
        active: this.selectedPeriod === 'quarter',
      },
      { text: 'Half', value: 'half', active: this.selectedPeriod === 'half' },
    ]
  }

  onChange(button: StepButton): void {
    dateStore.setPeriod(button.value)
    ganttStore.fetchGantt()
  }
}
</script>
