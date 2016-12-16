import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
    AllData      : [],
    TitleColumns : null,
    NameTable    : 'user',
    ClosedСolumn : [],
    ActionColumn : ['action']

};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})