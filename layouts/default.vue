<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
}

.flex-row {
  display: flex;
  align-items: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

body {
  background: url("https://scutumetlorica.com/wp-content/uploads/2018/02/loopable-tileable-stars-pattern-realistic-stars-slowly-twinkle-in-the-night-sky-seamless-tile-can-be-combined-into-8k-or-larger-frame-by-placing-clip-copies-side-by-side_vkpg6uy2__F0000.png") center/cover;
  overflow-y: hidden;
  height: 100vh;
}

@media (max-width: 420px) {
    html, body {
    overflow-y: hidden;
    }
}

</style>