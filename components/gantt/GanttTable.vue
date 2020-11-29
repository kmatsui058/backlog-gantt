<template>
  <div class="gantt-table">
    <div class="wrapper">
      <div class="title">Gantt table</div>
      <GanttTableLeft />
      <GanttTableRight />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GanttTableRight from '@/components/gantt/GanttTableRight.vue'
import GanttTableLeft from '@/components/gantt/GanttTableLeft.vue'

@Component({
  components: { GanttTableRight, GanttTableLeft },
})
export default class Gantttable extends Vue {}
</script>
