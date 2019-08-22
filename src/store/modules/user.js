
const state = {
  userinfo: {},
}

const mutations = {
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  },
  
}

const actions = {
  SetUserInfo({ commit }, userinfo) {
  	if(!localStorage.getItem('user_info')){
  		localStorage.setItem('user_info',JSON.stringify(userinfo))
  	}
  	commit('SET_USERINFO',userinfo)
  },
  LoginOut({ commit },userinfo){
  	localStorage.removeItem('user_info')
  	commit('SET_USERINFO',userinfo)
  },
  
}

export default {
  state,
  mutations,
  actions
}