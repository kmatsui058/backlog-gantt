<template>
  <div class="controller-box">
    <p class="title">{{ title }}</p>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ControllerBox extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string
}
</script>

<style lang="scss" scoped>
.controller-box {
  background-color: $c-white;
  border-radius: 10px;
  padding: 9px 20px;
  height: 66px;
  display: inline-block;
  min-width: 172px;
}
.title {
  font-size: 11px;
  color: $c-gray;
  margin: 0;
  text-transform: uppercase;
}
</style>
