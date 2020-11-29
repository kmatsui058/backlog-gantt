<template>
  <div class="gantt-table">
    <div class="wrapper">
      <img :src="image" alt="" class="image" />
      <div class="title">{{ name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
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
