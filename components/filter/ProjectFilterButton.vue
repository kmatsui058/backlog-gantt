<template>
  <div
    class="project-filter-button"
    :class="{ disabled: projectLoading }"
    @click="onClick"
  >
    <ControllerBox
      title="PROJECT"
      help="ガントを表示するプロジェクトを選択します"
    >
      <div v-if="projectLoading" class="loading">wait a moment...</div>
      <IconSelector v-else-if="icons.length" :icons="icons" />
      <div v-else class="no-member">select project...</div>
    </ControllerBox>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'
import IconSelector, { Icon } from '@/components/common/IconSelector.vue'
import { Project } from '~/store/filter'
import { filterStore } from '~/store'

@Component({ components: { ControllerBox, IconSelector } })
export default class ProjectFilterButton extends Vue {
  get filteredProjects(): Project[] {
    return filterStore.filteredProjects
  }

  get projectLoading(): boolean {
    return filterStore.getLoading
  }

  get icons(): Icon[] {
    return this.filteredProjects.map((user) => {
      return { path: user.image, text: user.data.name }
    })
  }

  onClick(): void {
    if (this.projectLoading) return
    this.$modal.push('project-filter')
  }
}
</script>
<style lang="scss" scoped>
.project-filter-button {
  transition: opacity 0.2s;
  cursor: pointer;
  &.disabled {
    cursor: wait;
    opacity: 0.2;
  }
}
.no-member {
  height: 1em;
  line-height: 1;
}
</style>
