<template>
  <div class="gantt-table">
    <client-only>
      <div class="wrapper">
        <GanttTableLabel v-if="group.label" :label="group.label" />
        <div class="table-body">
          <GanttTableLeft :tasks="group.tasks" />
          <GanttTableRight :tasks="group.tasks" class="table-right" />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import GanttTableLabel from '@/components/gantt/GanttTableLabel.vue'

import GanttTableRight from '@/components/gantt/GanttTableRight.vue'
import GanttTableLeft from '@/components/gantt/GanttTableLeft.vue'
import { Group } from '~/store/gantt'

@Component({
  components: { GanttTableLabel, GanttTableRight, GanttTableLeft },
})
export default class Gantttable extends Vue {
  @Prop({ type: Object, required: true }) readonly group!: Group
}
</script>
<style lang="scss" scoped>
.table-body {
  display: flex;
}
.table-right {
  flex-shrink: 1;
  overflow: scroll;
}
</style>
