<template>
  <div class="default">
    <header></header>
    <main><Nuxt /></main>
  </div>
</template>
<style lang="scss" scoped>
.default {
  background-color: #f1f3f9;
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 378px;
    background-color: $c-navy;
  }
}
header,
main {
  position: relative;
}
</style>
