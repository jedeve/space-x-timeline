<template>
  <div class="container">
    <header class="flex-row">
      <i class="fas fa-rocket fa-2x rocket-image"></i>
      <div>
        <h1 class="title">{{ missionName }}</h1>
        <p>{{ missionDate }}</p>
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

  </div>
</template>

<script>
export default {
  props: [
    'missionName',
    'launchDate',
    'launchSite',
    'links',
    'rocketData',
  ],
  computed: {
    missionDate() {
      var timestamp = this.launchDate
      var date = new Date(timestamp*1000);

      return date.getDate().toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })+
          "/"+(date.getMonth()+1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })+
          "/"+date.getFullYear()+
          " "+date.getHours().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })+
          ":"+date.getMinutes().toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })+
          ":"+date.getSeconds().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })
    },
    payloads(){
      return this.rocketData.second_stage.payloads
    },
    rocketName() {
      return this.rocketData.rocket_name
    },
    videoLink() {
      const link = this.links.video_link
      const urlSplit = link.split('/')
      const urlCode = urlSplit[urlSplit.length - 1]
      console.log(urlCode)
      return 'https://www.youtube.com/embed/' + urlCode
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
  font-weight: bold;
}

.info-container, header {
  padding: 15px;
}

.info-group {
  margin-top: 20px;
}


</style>