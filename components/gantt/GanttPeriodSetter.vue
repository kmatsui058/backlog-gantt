<template>
  <div class="gantt-period-setter">
    <div class="wrapper">
      <GanttStartSetter />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GanttStartSetter from '@/components/gantt/GanttStartSetter.vue'
@Component({
  components: { GanttStartSetter },
})
export default class GanttPeriodSetter extends Vue {}
</script>
