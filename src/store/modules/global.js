
const state = {
  global: { 
    collapsed: false, 
    sider_with: 200,
    menu_role:[]
  },
}

const mutations = {
  SET_COLLAPSED: (state, bool) => {
    state.global.collapsed = bool
  },
  SET_SIDERWITH: (state, num) => {
    state.global.sider_with = num
  },
  SET_ROLE: (state, arr) => {
    state.global.menu_role = arr
  },
}

const actions = {
  SetCollapsed({ commit }, bool) {
    commit('SET_COLLAPSED', bool)
  },
  SetSiderwith({ commit }, num) {
    commit('SET_SIDERWITH', num)
  },
  SetRole({ commit }, arr) {
    localStorage.setItem('role',JSON.stringify(arr))
    commit('SET_ROLE', arr)
  },
}

export default {
  state,
  mutations,
  actions
}