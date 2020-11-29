<template>
  <div class="gantt-view">
    <div class="wrapper">
      <div class="title">Gantt View</div>
      <client-only>
        <GanttPeriodSetter class="head" />
        <div v-if="!hasResult" class="loading">No Data</div>
        <template v-for="(group, key) in groupingTask">
          <GanttTable v-if="group.tasks.length" :key="key" :group="group" />
        </template>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import GanttPeriodSetter from '@/components/gantt/GanttPeriodSetter.vue'
import GanttTable from '@/components/gantt/GanttTable.vue'
import { ganttStore } from '~/store'
import { Group } from '~/store/gantt'
@Component({
  components: { GanttPeriodSetter, GanttTable },
})
export default class GanttView extends Vue {
  get groupingTask(): Group[] {
    return ganttStore.groupingTask || []
  }

  get hasResult(): boolean {
    return !!ganttStore.groupingTask
  }
}
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
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: $c-gray;
  height: 200px;
}
</style>
