<template>
  <div class="gantt-table-left">
    <div class="wrapper">
      <div class="head"></div>
      <div class="row title">件名</div>
      <a
        v-for="task in tasks"
        :key="task.id"
        class="row"
        :href="`${basePath}/view/${task.issueKey}`"
        target="_blank"
      >
        {{ task.summary }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Task } from '~/api'
import { authStore } from '~/store'
@Component({
  components: {},
})
export default class GantttableLeft extends Vue {
  @Prop({ type: Array, required: true }) readonly tasks!: Task[]
  get basePath(): string {
    return authStore.getBacklogDomain
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 400px;
  white-space: nowrap;
}
.head {
  height: $table-head-height;
  border-bottom: 1px solid $c-navy;
}
.row {
  overflow: hidden;
  height: $table-row-height;
  line-height: $table-row-height;
  text-overflow: ellipsis;
  border-bottom: 1px solid $c-navy;
  font-size: 12px;
  display: block;
  text-decoration: none;
  color: $c-navy;

  &.title {
    font-size: 12px;
    text-decoration: none;
  }
}
</style>
