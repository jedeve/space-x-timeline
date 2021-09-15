<template>
 <div class="flex-row cards-row">
    <base-card v-for="launch in launchData" :key="launch.mission_name">
      <mission-info
        :missionName="launch.mission_name"
        :launchDate="launch.launch_date_unix"
        :rocketData="launch.rocket"
        :launchSite="launch.launch_site.site_name_long"
        :links="launch.links"
      />
    </base-card>
 </div>
</template>

<script>
import MissionInfo from '../components/MissionInfo.vue'
import BaseCard from '../components/UI/BaseCard.vue'
export default {
  components: { MissionInfo, BaseCard },
  computed: {
    launchData() {
      return this.$store.state.launchData
    }
  }
}
</script>

