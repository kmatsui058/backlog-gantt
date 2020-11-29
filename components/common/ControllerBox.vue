<template>
  <div class="controller-box">
    <p class="title">{{ title }}</p>
    <div class="slot"><slot /></div>
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
  text-align: left;
  vertical-align: baseline;
}
.title {
  font-size: 11px;
  color: $c-gray;
  margin: 0;
  text-transform: uppercase;
}
.slot {
  height: 30px;
  color: #4d4f5c;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
}
</style>
