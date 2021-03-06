import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        fetchedData: []
    },
    getters: {
        getData(state) {
            return state.fetchedData;
        }
    },
    actions: {
        loadData({ commit }) {
            fetch('https://www.boredapi.com/api/activity')
                .then((response) => response.json())
                .then(({activity, link, type}) => {
                commit('addData', {activity, link, type});
            });
        },
    },
    mutations: {
        addData(state, data) {
            state.fetchedData.push(data);
        },
        deleteItem(state, activityName) {
            const idx = state.fetchedData.findIndex((it) => it.activity === activityName);

            if (idx >= 0) {
                state.fetchedData.splice(idx, 1);
            }
        }
    }
});
