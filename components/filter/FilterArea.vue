<template>
  <div class="filter-area">
    <div class="wrapper">
      <MemberFilterButton class="wrapper__item"></MemberFilterButton>
      <ProjectFilterButton class="wrapper__item"></ProjectFilterButton>
      <GroupingFilterButton class="wrapper__item"></GroupingFilterButton>
      <StatusFilterButton class="wrapper__item"></StatusFilterButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import MemberFilterButton from '@/components/filter/MemberFilterButton.vue'
import ProjectFilterButton from '@/components/filter/ProjectFilterButton.vue'
import GroupingFilterButton from '@/components/filter/GroupingFilterButton.vue'
import StatusFilterButton from '@/components/filter/StatusFilterButton.vue'

@Component({
  components: {
    MemberFilterButton,
    ProjectFilterButton,
    GroupingFilterButton,
    StatusFilterButton,
  },
})
export default class FilterArea extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  $gap: 20;

  display: flex;
  flex-wrap: wrap;
  padding: 0 #{$side-space-normal - $gap/2}px;
  &__item {
    margin: #{$gap/2}px;
    flex-grow: 1;
  }
}
</style>
