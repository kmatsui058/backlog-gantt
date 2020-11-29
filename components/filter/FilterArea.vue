<template>
  <div class="filter-area">
    <div class="wrapper">
      <MemberFilterButton class="wrapper__item"></MemberFilterButton>
      <ProjectFilterButton class="wrapper__item"></ProjectFilterButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import MemberFilterButton from '@/components/filter/MemberFilterButton.vue'
import ProjectFilterButton from '@/components/filter/ProjectFilterButton.vue'

@Component({ components: { MemberFilterButton, ProjectFilterButton } })
export default class FilterArea extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  $gap: 20;

  display: flex;
  padding: 0 #{$side-space-normal - $gap}px;
  &__item {
    margin: 0 #{$gap}px;
  }
}
</style>
