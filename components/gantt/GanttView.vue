<template>
  <div class="gantt-view">
    <div class="wrapper">
      <div class="title">Gantt View</div>
      <GanttPeriodSetter class="head" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GanttPeriodSetter from '@/components/gantt/GanttPeriodSetter.vue'
@Component({
  components: { GanttPeriodSetter },
})
export default class GanttView extends Vue {}
</script>

<style lang="scss" scoped>
.gantt-view {
  padding: #{$side-space-normal}px;
}
.wrapper {
  background-color: $c-white;
  border-radius: 10px;
  padding: 18px;
}
.title {
  color: $c-navy;
  font-size: 18px;
}
</style>
