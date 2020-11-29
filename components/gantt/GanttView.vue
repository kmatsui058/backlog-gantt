<template>
  <div class="gantt-view">
    <div class="wrapper">
      <div class="title">Gantt View</div>
      <client-only>
        <GanttPeriodSetter class="head" />
        <div v-if="tasks.length > 99" class="warning">
          !!取得可能件数の上限に達しています。絞り込み条件を追加してください。
        </div>
        <div v-if="taskLoading" class="loading">Loading...</div>
        <div
          v-else-if="!hasResult || groupingTask.length === 0"
          class="loading"
        >
          No Data
        </div>
        <template v-for="(group, key) in groupingTask">
          <GanttTable
            v-if="group.tasks.length"
            :key="key"
            :group="group"
            class="table"
          />
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
import { Task } from '~/api'
@Component({
  components: { GanttPeriodSetter, GanttTable },
})
export default class GanttView extends Vue {
  get groupingTask(): Group[] {
    return ganttStore.groupingTask || []
  }

  get tasks(): Task[] {
    return ganttStore.getTask || []
  }

  get hasResult(): boolean {
    return !!ganttStore.groupingTask
  }

  get taskLoading(): boolean {
    return ganttStore.getLoading
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
.warning {
  color: rgb(255, 0, 21);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
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
.table {
  margin-bottom: 30px;
}
</style>
