import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions';
import * as getters from './getters';
import localstoragePlugin from './plugins/localstoragePlugin';

Vue.use(Vuex);
const plugin = localstoragePlugin();

const state = {
    AllData           : [],
    TitleColumns      : null,
    NameTable         : 'user',
    ClosedСolumn      :  [],
    ActionColumn      : ['action'],
    TitleColumnsAlias : null
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [plugin]
})