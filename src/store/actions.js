import axios from '@/axios'

const actions = {
  fetchProduct ({commit}, {pageNumber, pageSize}) {
    return new Promise((resolve, reject) => {
      axios.get(`api/v2/gifts?page[number]=${pageNumber}&page[size]=${pageSize}`)
        .then(response => {
          commit('SET_PAGE_META', response.data.meta)
          commit('SET_PRODUCT_LIST', response.data.data)
          resolve(response)
        })
        .catch(error => { reject(error.response) })
    })
  },
  detailProduct ({commit}, productId) {
    return new Promise((resolve, reject) => {
      axios.post(`api/v2/gifts/${productId}`)
        .then(response => {
          commit('SET_PRODUCT_LIST', response.data)
          resolve(response)
        })
        .catch(error => { reject(error.response) })
    })
  }
}

export default actions
