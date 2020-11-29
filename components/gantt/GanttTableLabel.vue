<template>
  <div class="gantt-table">
    <a class="wrapper" :href="href" target="_blank">
      <img :src="image" alt="" class="image" />
      <div class="title">{{ name }}</div>
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { authStore } from '~/store'
import { Project, User } from '~/store/filter'
@Component({
  components: {},
})
export default class GanttTableLabel extends Vue {
  @Prop({ type: Object, required: true }) readonly label!: User | Project

  get name(): string {
    return this.label.data.name
  }

  get image(): string {
    return this.label.image
  }

  get href(): string {
    const data = this.label.data
    return 'userId' in data
      ? `${authStore.getBacklogDomain}/user/${data.userId}`
      : `${authStore.getBacklogDomain}/projects/${data.projectKey}`
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.image {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.title {
  font-size: 18px;
  color: $c-navy;
}
</style>
