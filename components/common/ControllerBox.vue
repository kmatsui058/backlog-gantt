<template>
  <div class="controller-box" :class="{ wrappable: wrappable }">
    <div class="head">
      <span class="title">{{ title }}</span>
      <v-popover v-if="help" class="help" trigger="hover focus" offset="10px">
        <HelpCircle class="help__icon" />
        <div slot="popover" class="popup">{{ help }}</div>
      </v-popover>
    </div>
    <div class="slot"><slot /></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import HelpCircle from '@/assets/images/icons/help-circle.svg?inline'
@Component({ components: { HelpCircle } })
export default class ControllerBox extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: String, required: false }) readonly help?: string
  @Prop({ type: Boolean, required: false }) readonly wrappable?: boolean
}
</script>

<style lang="scss" scoped>
@mixin wrappable {
  .controller-box.wrappable & {
    @content;
  }
}
.controller-box {
  background-color: $c-white;
  border-radius: 10px;
  padding: 9px 20px;
  min-height: 66px;
  display: block;
  min-width: 172px;
  text-align: left;
  vertical-align: baseline;
  height: 100%;
}
$head-height: 11;
.head {
  display: flex;
}
.help {
  height: #{$head-height}px;
  line-height: #{$head-height}px;
  &__icon {
    width: #{$head-height}px;
    height: #{$head-height}px;
  }
}
.title {
  font-size: #{$head-height}px;
  color: $c-gray;
  margin: 0;
  text-transform: uppercase;
  flex-grow: 1;
}
.slot {
  min-height: 30px;
  color: #4d4f5c;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  @include wrappable {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
