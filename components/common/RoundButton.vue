<template>
  <button
    class="round-button"
    :class="{ 'not-selected': checked === false }"
    @click="$emit('click')"
  >
    <span class="text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class IconSelector extends Vue {
  @Prop({ type: String, required: true }) readonly text!: string
  @Prop({ type: Boolean, required: false }) readonly checked?: boolean
}
</script>
<style lang="scss" scoped>
@mixin not-selected {
  .round-button.not-selected & {
    @content;
  }
}
.round-button {
  border-radius: 25px;
  background-color: $c-navy;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 24px;
  &.not-selected {
    background: transparent;
  }
}
.text {
  color: $c-white;
  font-size: 11px;
  text-align: center;
  @include not-selected {
    color: $c-navy;
  }
}
</style>
