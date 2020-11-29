<template>
  <div class="icon-selector">
    <v-popover
      v-for="(icon, key) in filteredIcons"
      :key="key"
      class="item"
      trigger="hover focus"
      offset="10px"
    >
      <img v-if="icon.path" :src="icon.path" :alt="icon.text" class="icon" />
      <span v-else class="icon icon--text">{{
        icon.text && icon.text[0].toUpperCase() + icon.text[1]
      }}</span>
      <div slot="popover" class="popup">{{ icon.text }}</div>
    </v-popover>

    <span v-if="icons.length > 5">...</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
export interface Icon {
  path: string
  text?: string
}
@Component
export default class IconSelector extends Vue {
  @Prop({ type: Array, required: true }) readonly icons!: Icon[]
  get filteredIcons(): Icon[] {
    return this.icons.slice(0, 5)
  }
}
</script>
<style lang="scss" scoped>
@mixin hover {
  .icon-selector:hover & {
    @content;
  }
}
.icon-selector {
  display: flex;
  align-items: center;
}
.item {
  display: inline-block;
  &:not(:first-child) {
    margin-left: -10px;
    transition: margin-left 0.2s;
    @include hover {
      margin-left: 5px;
    }
  }
}
.icon {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  &--text {
    border: 1px solid $c-navy;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    background-color: #fff;
    font-size: 13px;
  }
}
</style>
