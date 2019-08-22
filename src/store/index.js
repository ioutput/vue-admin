import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import user from './modules/user';
import global from './modules/global';
import getters from './getters';

export default new Vuex.Store({
    modules: {
        user, global
    },
    getters
});

