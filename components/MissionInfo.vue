<template>
  <div class="container">
    <section v-if="mission" id="mission-info">
      <header class="flex-row">
        <i class="fas fa-rocket fa-2x rocket-image" @click="flipCard"></i>
        <div>
          <h1 class="title">{{ missionName }}</h1>
          <p>{{ launchDate + " " + launchTime}}</p>
        </div>
      </header>
      
      <section class="launch-info">
        <div class="video-player">
          <iframe width="100%" height="100%" :src="videoLink" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="info-container">
          <h2 class="rocket-name">{{ rocketName }}</h2>
          <div class="flex-row">
            <div class="info-group">
              <h3 class="info-title">Launch Site</h3>
              <p class="info-text">{{ launchSite }} 9</p>
            </div>
          </div>
          <div v-for="payload in payloads" :key="payload" class="flex-row">
            <div class="info-group">
              <h3 class="info-title">Payloads</h3>
              <p class="info-text">{{ payload.payload_type }}</p>
            </div>
            <div class="info-group">
              <h3 class="info-title">Payload Mass</h3>
              <p v-if="payload.payload_mass_kg" paclass="info-text">{{ payload.payload_mass_kg }}</p>
              <p v-else paclass="info-text">No Data</p>
            </div>
          </div>
        </div>
      </section>
    </section>

    <section v-else id="rocket-info">
      <header class="flex-row">
        <i class="fas fa-rocket fa-2x rocket-image" @click="flipCard"></i>
        <div>
          <h1 class="title">{{ rocketName }}</h1>
        </div>
      </header>
        <div class="rocket-info-grid">
          <p class="info-text">{{ rocketData.description }}</p>
          <div class="info-group">
              <h3 class="info-title">First Flight</h3>
              <p class="info-text">{{ rocketData.first_flight }}</p>
          </div>
          <div class="info-group">
            <h3 class="info-title">Country</h3>
            <p class="info-text">{{ rocketData.country }}</p>
          </div>
          <div class="info-group">
            <h3 class="info-title">Costs per launch</h3>
            <p class="info-text">$ {{ rocketData.cost_per_launch }}</p>
          </div>
          <div class="info-group">
            <h3 class="info-title">Diameter</h3>
            <p class="info-text">{{ rocketData.diameter.meters }} m</p>
          </div>
          <div class="info-group">
            <h3 class="info-title">Height</h3>
            <p class="info-text">{{ rocketData.height.meters }} m</p>
          </div>
          <div class="info-group">
            <h3 class="info-title">Mass</h3>
            <p class="info-text">{{ rocketData.mass.kg }} kg</p>
          </div>
          <div class="info-group">
            <h3 class="info-title">Succes Rate</h3>
            <p class="info-text">{{ rocketData.success_rate_pct}}%</p>
          </div>
          <div class="info-group">
            <h3 class="info-title">Boosters</h3>
            <p class="info-text">{{ rocketData.boosters }}</p>
          </div> 
          <div class="info-group">
            <h3 class="info-title">Nr. of engines</h3>
            <p class="info-text">{{ rocketData.engines.number }}</p>
          </div>
          <div class="info-group">
            <h3 class="info-title">Propellants</h3>
            <p class="info-text">{{ rocketData.engines.propellant_1 }}</p>
            <p class="info-text">{{ rocketData.engines.propellant_2 }}</p>
          </div>    
        </div>
    </section>

  </div>
</template>

<script>
export default {
  props: [
    'missionName',
    'launchDate',
    'launchTime',
    'launchSite',
    'links',
    'rocket',
  ],
  data() {
    return {
      mission: true,
    }
  },
  computed: {
    payloads(){
      return this.rocket.second_stage.payloads
    },
    rocketName() {
      return this.rocket.rocket_name
    },
    videoLink() {
      const link = this.links.video_link
      let urlSplit = []
      let urlCode = "" 
      if(link.includes('.be')){
        urlSplit = link.split('/')
        urlCode = urlSplit[urlSplit.length - 1]
      } else {
        urlSplit = link.split('=')
        urlCode = urlSplit[urlSplit.length - 1]
      }
      return 'https://www.youtube.com/embed/' + urlCode
    },
    rocketData() {
      return this.$store.getters.getRocketData(this.rocket.rocket.id)
    },
  },
  methods: {
    async flipCard() {
      await this.getRocketData()
      console.log(this.$store.getters.getRocketData(this.rocket.rocket.id))
      this.$emit('flipCard')
      this.mission = !this.mission
    },
    async getRocketData() {
      let rocketData = this.$store.getters.getRocketData(this.rocket.rocket.id)
      if(!rocketData){
        await this.$store.dispatch('addRocket', this.rocket.rocket.id)
      }
    }
  }
}
</script>

<style scoped>

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.rocket-image {
  margin-right: 15px;
  background-color: black;
  color: white;
  padding: 1rem;
  border-radius: 50%;
  }

.rocket-image:hover {
  background-color: #444;
  cursor: pointer;
}

.video-player {
  position: relative; 
  padding-bottom: 56.25%; 
  padding-top: 30px; 
  height: 0; 
  overflow: hidden;
}

.video-player iframe {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
}

.info-container .flex-row {
  justify-content: space-between;  
}

.rocket-name {
  font-size: 1.3rem;
  font-weight: bold;
}

.info-title {
  font-size: 1rem;
  font-weight: 600;
}

.info-text {
  font-weight: 300;
}

.info-container, .rocket-info-grid, header {
  padding: 15px;
}

.info-group {
  margin-top: 10px;
  margin-right: 20px;
  min-width: 40%;
}

#rocket-info .info-group {
  margin-bottom: 5px;
}

.rocket-info-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}


@media (max-width: 420px) {

}

</style>