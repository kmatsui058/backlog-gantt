<template>
  <div class="gantt-table-left">
    <div class="wrapper" :class="{ 'is-shrink': !isExpand }">
      <div class="head">
        <button
          v-if="isExpand"
          class="shrink head__button"
          @click="isExpand = false"
        >
          &lt; shrink</button
        ><button v-else class="head__button expand" @click="isExpand = true">
          &gt;
        </button>
      </div>
      <div class="row title">件名</div>
      <client-only>
        <a
          v-for="task in tasks"
          :key="task.id"
          class="row"
          :href="`${basePath}/view/${task.issueKey}`"
          target="_blank"
        >
          {{ task.summary }}
        </a>
      </client-only>
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
  isExpand = true
  get basePath(): string {
    return authStore.getBacklogDomain
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 400px;
  white-space: nowrap;
  &.is-shrink {
    width: 20px;
  }
}
.head {
  height: $table-head-height;
  border-bottom: 1px solid $c-navy;
  &__button {
    padding: 7px;
    font-size: 11px;
    color: $c-gray;
  }
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
