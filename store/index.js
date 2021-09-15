import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      launchData: {},
    },
    mutations: {
      setData(state, data) {
        state.launchData = data
      } 
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
          return axios({
            method: "POST",
            url: 'https://api.spacex.land/graphql',
            data: {
              query: `
              {
                launchesPast(limit: 10) {
                  mission_name
                  links {
                    article_link
                    video_link
                  }
                  rocket {
                    rocket_name
                    first_stage {
                      cores {
                        flight
                        core {
                          reuse_count
                          status
                        }
                      }
                    }
                    second_stage {
                      payloads {
                        payload_type
                        payload_mass_kg
                        payload_mass_lbs
                      }
                    }
                  }
                  launch_date_unix
                  launch_site {
                    site_name_long
                  }
                }
              }
              
              `
            }
          })
          .then(res => {
              vuexContext.commit('setData', res.data.data.launchesPast)
          })
          .catch(e => context.error(e))
      },
    }
  })
}

export default createStore