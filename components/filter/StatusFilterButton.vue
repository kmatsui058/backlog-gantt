<template>
  <div class="status-filter-button">
    <ControllerBox
      title="Status"
      help="ガントをグルーピング表示させます"
      :auto-hide="true"
    >
      <v-popover trigger="click" offset="20px">
        <div class="value">{{ Status }}</div>

        <div slot="popover" class="popup">
          <button
            v-for="(option, key) in options"
            :key="key"
            v-close-popover
            class="popup__option"
            @click="submit(option)"
          >
            {{ option }}
          </button>
        </div>
      </v-popover>
    </ControllerBox>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ControllerBox from '@/components/common/ControllerBox.vue'
import IconSelector from '@/components/common/IconSelector.vue'
import { filterStore } from '~/store'

@Component({ components: { ControllerBox, IconSelector } })
export default class StatusFilterButton extends Vue {
  get Status(): Status {
    return filterStore.getStatus
  }

  get options(): Status[] {
    return ['none', 'member', 'project']
  }

  submit(value: Status): void {
    filterStore.setStatus(value)
  }
}
</script>
<style lang="scss" scoped>
.status-filter-button {
  transition: opacity 0.2s;
  cursor: pointer;
  &.disabled {
    cursor: wait;
    opacity: 0.2;
  }
}
.popup {
  padding: 0;
  &__option {
    text-align: center;
    display: block;
    width: 100%;
    line-height: 2.5;
    &:hover {
      color: $c-sky;
    }
    &:not(:last-child) {
      border-bottom: 1px solid $c-navy;
    }
  }
}
</style>
