<template>
  <div class="default">
    <header>
      <default-header />
    </header>
    <main><Nuxt /></main>
    <client-only>
      <modal name="member-filter">
        <MemberFilter />
      </modal>
      <modal name="project-filter">
        <ProjectFilter />
      </modal>
    </client-only>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import DefaultHeader from '@/components/common/header/DefaultHeader.vue'
import MemberFilter from '@/components/filter/MemberFilter.vue'
import ProjectFilter from '@/components/filter/ProjectFilter.vue'
@Component({ components: { DefaultHeader, MemberFilter, ProjectFilter } })
export default class DefaultLayout extends Vue {
  get title(): string {
    return this.$route.meta.title
  }
}
</script>
<style lang="scss" scoped>
.default {
  background-color: #f1f3f9;
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 378px;
    background-color: $c-navy;
  }
}
header,
main {
  position: relative;
}
</style>
