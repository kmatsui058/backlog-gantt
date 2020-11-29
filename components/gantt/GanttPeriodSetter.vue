<template>
  <div class="gantt-period-setter">
    <div class="wrapper">
      <StepController />
      <GanttStartSetter class="start" />
      <RangePicker class="range" />
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
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > * {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
.start {
  margin-left: 20px;
}
.range {
  flex-grow: 1;
}
</style>
