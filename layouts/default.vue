<template>
  <div class="container">
    <header></header>
    <main>
      <Nuxt />
    </main>
    <footer></footer>
  </div>
</template>
<style lang="scss" scoped>
.container {
  position: relative;
  background-color: #f1f3f9;
  min-height: 100vh;
  &::before {
    content: '';
    display: block;
    position: absolute;
    background-color: $c-navy;
    top: 0;
    right: 0;
    left: 0;
    height: 378px;
  }
}
main,
header,
footer {
  position: relative;
}
</style>
