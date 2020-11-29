<template>
  <div class="gantt-period-setter">
    <div class="wrapper">
      <GanttStartSetter />
      <StepController />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GanttStartSetter from '@/components/gantt/GanttStartSetter.vue'
import StepController from '@/components/gantt/StepController.vue'

@Component({
  components: { GanttStartSetter, StepController },
})
export default class GanttPeriodSetter extends Vue {}
</script>
