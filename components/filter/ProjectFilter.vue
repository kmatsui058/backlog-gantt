<template>
  <form @submit.prevent="onSubmit" @change="onChangeValue">
    <label v-for="project in allProjects" :key="project.data.id" class="item">
      <img :src="project.image" alt="" class="icon" />
      <input v-model="ids" type="checkbox" :value="project.data.id" />
    </label>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { filterStore } from '~/store'
import { Project } from '~/store/filter'

@Component({ components: {} })
export default class ProjectFilter extends Vue {
  ids: number[] = []
  get allProjects(): Project[] {
    return filterStore.getProjects
  }

  get selectedProjectIds(): number[] {
    return filterStore.getSelectedProjectId
  }

  beforeDestroy(): void {}

  onSubmit(): void {
    this.$modal.pop()
  }

  onChangeValue(): void {
    filterStore.setSelectedProjects(this.ids)
  }

  @Watch('selectedProjectIds', { immediate: true })
  onChangeSelectedProjectIds(): void {
    this.ids = this.selectedProjectIds
  }
}
</script>
