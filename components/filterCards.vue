<template>
<div class="background">
  <div class="header">
    <img class="logo" src="../static/images/spacex_logo.png" alt="">
      <div class="flex-row">
        <input type="text" v-model="searchTerm" @keyup.enter="findLaunches">
        <select name="find-type" id="find-type" v-model="filterType">
          <option value="launch_year">Launch Year</option>
          <option value="mission_name">Mission Name</option>
          <option value="rocket_name">Rocket</option>
          <option value="payload_type">Payload</option>
        </select>
        <button @click="findLaunches"><i class="fas fa-search"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterType: 'launch_year',
      searchTerm: ''
    }
  },
  methods: {
    findLaunches() {
      this.$store.dispatch('findLaunches', {filterType: this.filterType, filterValue: this.searchTerm})
      this.searchTerm = ''
      window.scrollTo(0,0);
    }
  }
}
</script>

<style scoped>

.background {
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
  width: 100%;
  height: 40px;
  position: fixed;
}

.header {
  padding: 5px;
  position: fixed;
  display: flex;
}

h3 {
  margin: 0 10px;
}

.logo {
  max-height: 100%;
  padding: 6px;
  width: 150px;
  object-fit: contain;
}

input, select, button {
  border: 1px solid black;
  border-radius: 7px;
  margin-right: 5px;
  height: 30px;
}

button {
  width: 30px;
}

button:hover {
  background-color: lightgrey;
  cursor: pointer;
}

@media (max-width: 420px) {
  .background {
    height: 70px;
    width: 100%;
  }

  .header {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100vw;
  }
}

</style>