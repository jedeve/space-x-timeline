<template>
  <div class="main">
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

.main::before {
  content: '';
  height: 6px;
  width: 100%;
  background-color: white;
  top: 650px;
  position: fixed;
  /* margin-left: 50px; */
}

.flex-row {
  display: flex;
  align-items: center;
}

body {
  background: url("https://scutumetlorica.com/wp-content/uploads/2018/02/loopable-tileable-stars-pattern-realistic-stars-slowly-twinkle-in-the-night-sky-seamless-tile-can-be-combined-into-8k-or-larger-frame-by-placing-clip-copies-side-by-side_vkpg6uy2__F0000.png") center/cover;
  /* background-attachment: fixed; */
}

</style>