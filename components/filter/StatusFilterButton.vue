<template>
  <div class="status-filter-button">
    <client-only>
      <ControllerBox title="Status" :wrappable="true">
        <RoundButton
          text="すべて"
          :checked="statusFilter === 'all'"
          class="item"
          @click="onClickStaticItem('all')"
        />
        <RoundButton
          v-for="(status, key) in statuses"
          :key="key"
          :text="status"
          :checked="statusFilter.includes(status)"
          class="item"
          @click="onClickFetchedItem(status)"
        />
        <RoundButton
          text="完了以外"
          :checked="statusFilter === 'without-complete'"
          class="item"
          @click="onClickStaticItem('without-complete')"
        />
      </ControllerBox>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'
import IconSelector from '@/components/common/IconSelector.vue'
import RoundButton from '@/components/common/RoundButton.vue'
import { filterStore } from '~/store'
import { StatusFilter } from '~/store/filter'
@Component({ components: { ControllerBox, IconSelector, RoundButton } })
export default class StatusFilterButton extends Vue {
  get statuses(): string[] {
    return filterStore.allStatusNames
  }

  get statusFilter(): StatusFilter {
    return filterStore.getStatusFilter
  }

  onClickStaticItem(value: 'all' | 'without-complete'): void {
    filterStore.setStatusFilter(value)
  }

  onClickFetchedItem(value: string): void {
    if (typeof this.statusFilter === 'string') {
      filterStore.setStatusFilter([value])
      return
    }
    const testIndex = this.statusFilter.findIndex((status) => status === value)
    if (testIndex !== -1) {
      const result = [...this.statusFilter].splice(testIndex, 1)
      filterStore.setStatusFilter(result)
    } else {
      const result = [...this.statusFilter]
      result.push(value)
      filterStore.setStatusFilter(result)
    }
  }
}
</script>
<style lang="scss" scoped>
.status-filter-button {
  transition: opacity 0.2s;
  cursor: pointer;
  &.disabled {
    cursor: wait;
    opacity: 0.2;
  }
}
.item {
  margin: 5px;
}
</style>
