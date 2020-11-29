<template>
  <div class="button-set">
    <button
      v-for="(button, key) in buttons"
      :key="key"
      :class="{ 'is-active': button.active }"
      class="button"
      @click="$emit('change', button)"
    >
      {{ button.text }}
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
export interface Button {
  text: string
  value: string
  active?: boolean
}
@Component
export default class IconSelector extends Vue {
  @Prop({ type: Array, required: true }) readonly buttons!: Button[]
}
</script>
<style lang="scss" scoped>
$border: 1px solid $c-navy;
.button-set {
  display: inline-block;
  border-radius: 4px;
  border: $border;
  white-space: nowrap;
  line-height: 32px;
  height: 32px;
}
.button {
  padding: 7px 15px;
  &:hover {
    color: $c-sky;
  }
  &.is-active {
    color: $c-purple;
  }
  &:not(:last-child) {
    border-right: $border;
  }
}
</style>
