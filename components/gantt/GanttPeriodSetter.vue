<template>
  <div class="gantt-period-setter">
    <div class="wrapper">
      <GanttStartSetter />
      <StepController />
      <RangePicker />
      <SwitchPeriod />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GanttStartSetter from '@/components/gantt/GanttStartSetter.vue'
import StepController from '@/components/gantt/StepController.vue'
import RangePicker from '@/components/gantt/RangePicker.vue'
import SwitchPeriod from '@/components/gantt/SwitchPeriod.vue'

@Component({
  components: { GanttStartSetter, StepController, RangePicker, SwitchPeriod },
})
export default class GanttPeriodSetter extends Vue {}
</script>
