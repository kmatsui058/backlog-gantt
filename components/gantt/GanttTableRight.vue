<template>
  <div class="gantt-table">
    <div class="wrapper">
      <div class="title">Gantt right</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GanttPeriodSetter from '@/components/gantt/GanttPeriodSetter.vue'
@Component({
  components: { GanttPeriodSetter },
})
export default class GantttableRight extends Vue {}
</script>