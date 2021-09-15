<template>
  <div class="card-container">
    <div class="base-card">
      <slot />
    </div>
    <div class="circle">
      <i class="fas fa-rocket fa-1x rocket-image"></i>
    </div>
    <div class="arrow">
    </div>
  </div>
</template>

<style scoped>
.base-card {
  border-radius: 6px;
  /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.26); */
  min-width: 400px;
  background-color: white;
  margin: 20px 10vw;
}

.circle {
  content: '';
  display: flex;
  position: relative;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 2px solid #444;
  border-radius: 50%;
  top: 30px;
  align-items: center;
  justify-content: center;
}

.arrow {
  content: " ";
  height: 0;
  position: relative;
  width: 0;
  top: -50px;
  z-index: 1;
  border: medium solid white;
  border-width: 20px 20px 20px 20px;
  border-color: white transparent transparent transparent;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>