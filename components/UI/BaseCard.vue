<template>
  <div class="card-container">
    <div class="card" :class="{animate: flip}">
      <div class="base-card">
        <slot name="card"/>
      </div>
      <div class="arrow"></div>
    </div>
    <div class="circle">
        <i class="fas fa-rocket fa-1x rocket-image"></i>
        <div class="timeline"></div>
      </div>
      <div>
        <slot name="date">&nbsp</slot>
      </div>
    </div>
</template>

<script>
export default {
  props: [
    'flip',
  ],
}
</script>

<style scoped>
.base-card {
  border-radius: 6px;
  /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.26); */
  /* min-width: 280px ; */
  min-width: 280px;
  width: 80vw;
  max-width: 400px;
  background-color: white;
  margin: 0px 10vw;
  min-height: 540px;
  height: 70vh;
  max-height: 600px;
  overflow-y: hidden;
}

.timeline {
  content: '';
  height: 6px;
  width: 100%;
  background-color: white;
  position: fixed;
  z-index: -1;
}

.circle {
  content: '';
  display: flex;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 2px solid #444;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.arrow {
  content: " ";
  height: 0;
  width: 0;
  z-index: 1;
  border: medium solid white;
  border-width: 20px 20px 20px 20px;
  border-color: white transparent transparent transparent;
}

.card-container, .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.date {
  color: white;
}

@media (max-width: 420px) {
  .base-card {
    overflow-y: scroll;
  }
  
}

</style>