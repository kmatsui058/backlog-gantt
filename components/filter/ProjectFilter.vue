<template>
  <form @submit.prevent="onSubmit" @change="onChangeValue">
    <div class="title">PROJECTS</div>
    <label v-for="project in allProjects" :key="project.data.id" class="item">
      <img
        v-if="project.image"
        :src="project.image"
        alt=""
        class="item__icon"
      />
      <span v-else class="item__icon item__icon--text">{{
        project.data.name &&
        project.data.name[0].toUpperCase() + project.data.name[1]
      }}</span>
      <span class="item__name">{{ project.data.name }}</span>
      <input v-model="ids" type="checkbox" :value="project.data.id" />
    </label>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { filterStore, ganttStore } from '~/store'
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

  beforeDestroy(): void {
    ganttStore.fetchGantt()
  }

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
<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: $c-navy;
  margin-bottom: 20px;
}
.item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgb(231, 231, 231);
  cursor: pointer;
  &__icon {
    width: 30px;
    height: 30px;
    margin-right: 20px;
    &--text {
      border: 1px solid $c-navy;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      font-size: 13px;
    }
  }
  &__name {
    flex-grow: 1;
  }
}
</style>
