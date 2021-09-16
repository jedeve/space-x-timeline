import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      launchData: {},
      rockets: {},
      currentFilter: {
        filterType: '',
        filterValue: ''
      },
      offset: 10
    },
    mutations: {
      setData(state, data) {
        state.launchData = data
        state.offset = 10
      },
      addData(state, data) {
        data.forEach(element => {
          state.launchData.push(element)
          state.offset += 1
        }); 
      },
      addRocket(state, data) {
        state.rockets[data.id] = data
      },
      setCurrentFilter(state, filter) {
        state.currentFilter = filter
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
                launchesPast(limit: 10, order: "desc", sort: "launch_date_local") {
                  id
                  mission_name
                  launch_date_unix
                  launch_site {
                    site_name_long
                  }
                  links {
                    article_link
                    video_link
                  }
                  rocket {
                    rocket_name
                    rocket {
                      id
                    }
                    second_stage {
                      payloads {
                        payload_type
                        payload_mass_kg
                      }
                    }
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
      async addRocket(vuexContext, rocket) {
        await axios({
          method: "POST",
          url: 'https://api.spacex.land/graphql',
          data: {
            query: `
            {
              rocket(id: "${rocket}") {
                boosters
                cost_per_launch
                country
                description
                diameter {
                  meters
                }
                engines {
                  number
                  propellant_1
                  propellant_2
                }
                first_flight
                height {
                  feet
                  meters
                }
                mass {
                  kg
                }
                success_rate_pct
                id
              }
            }
            `
          }
        })
        .then(res => {
          vuexContext.commit('addRocket', res.data.data.rocket)
        })
        .catch(e => context.error(e))
    },
    async findLaunches(vuexContext, payload) {
      await axios({
        method: "POST",
        url: 'https://api.spacex.land/graphql',
        data: {
          query: `
          {
            launchesPast(limit: 10, order: "desc", sort: "launch_date_local", find: {${payload.filterType}: "${payload.filterValue}"}) {
              id
              mission_name
              launch_date_unix
              launch_site {
                site_name_long
              }
              links {
                article_link
                video_link
              }
              rocket {
                rocket_name
                rocket {
                  id
                }
                second_stage {
                  payloads {
                    payload_type
                    payload_mass_kg
                  }
                }
              }
            }
          }
          `
        }
      })
      .then(res => {
        vuexContext.commit('setData', res.data.data.launchesPast)
        vuexContext.commit('setCurrentFilter', payload)
      })
      .catch(e => context.error(e))
  },
  async addMoreLaunches(vuexContext) {
    let filter = ""
    if(vuexContext.state.currentFilter.filterType) {
     filter = `${vuexContext.state.currentFilter.filterType}: "${vuexContext.state.currentFilter.filterValue}"`
    }
    await axios({
      method: "POST",
      url: 'https://api.spacex.land/graphql',
      data: {
        query: `
        {
          launchesPast(limit: 10, offset: ${vuexContext.state.offset}, order: "desc", sort: "launch_date_local", find: {${filter}}) {
            id
            mission_name
            launch_date_unix
            launch_site {
              site_name_long
            }
            links {
              article_link
              video_link
            }
            rocket {
              rocket_name
              rocket {
                id
              }
              second_stage {
                payloads {
                  payload_type
                  payload_mass_kg
                }
              }
            }
          }
        }
        `
      }
    })
    .then(res => {
      vuexContext.commit('addData', res.data.data.launchesPast)
    })
    .catch(e => context.error(e))
},
  },
    getters: {
      getRocketData: (state) => (id) => {
          return state.rockets[id]
      }
    }
  })
}

export default createStore