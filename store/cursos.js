export const state = () => ({
  list: []
})

export const mutations = {
  add(state, curso) {
    state.list.push(curso)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}