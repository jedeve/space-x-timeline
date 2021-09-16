<template>
  <div class="container">
    <filter-cards class="filter" />
    <div class="flex-row cards-row">
        <div class="timeline"></div>
          <base-card v-for="launch in launchData" :key="launch.id">     
              <mission-info 
                :missionName="launch.mission_name"
                :launchDate="launch.launch_date_unix"
                :rocket="launch.rocket"
                :launchSite="launch.launch_site.site_name_long"
                :links="launch.links"
                @flipCard="flipCard"
              />
          </base-card>
          <base-card id="end-card">
            <div class="end-btn" @click="loadMore">
              <h1>Load More</h1>
            </div>
          </base-card>
      </div>
  </div>
</template>

<script>
import FilterCards from '../components/filterCards.vue'
import MissionInfo from '../components/MissionInfo.vue'
import BaseCard from '../components/UI/BaseCard.vue'
export default {
  components: { MissionInfo, BaseCard, FilterCards },
  data() {
    return {
      isFlipped: false,
      front: true
    }
  },
  computed: {
    launchData() {
      return this.$store.state.launchData
    }
  },
  methods: {
    flipCard() {
      console.log(this.isFlipped)
      this.isFlipped = !this.isFlipped
    },
    loadMore() {
      this.$store.dispatch('addMoreLaunches')
    }
  },
  
}
</script>

<style scoped>
.cards-row {
  height: 100vh;
  min-height: 750px;
}

.filter {
  z-index: 1;
}

.timeline {
  content: '';
  height: 6px;
  width: 100%;
  background-color: white;
  position: fixed;
  margin-top: 655px;
}

.flip-card-enter-from,
.flip-card-leave-to  {
  transform: rotateX(0deg);
}

.flip-card-enter-active {
  transition: transform 0.3s ease-out;
}

.flip-card-enter-to,
.flip-card-leave-from {
  transform: rotateX(180deg);
  opacity: 0;
}

.flip-card-leave-active {
  transition: opacity 0.3s ease-in;
}

.end-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: darkgrey;
}

.end-btn:hover {
  color:black;
  cursor: pointer;
}

@media (max-width: 400px) {
  .timeline {
      margin-bottom: 30px;
  }
  .cards-row {
    padding-top: 30px;
  }
}
</style>
