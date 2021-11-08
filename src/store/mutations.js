const mutations = {
  SET_PAGE_META (state, data) {
    state.page_meta = data
  },
  SET_PRODUCT_DETAIL (state, data) {
    state.product_detail = data
  },
  SET_PRODUCT_LIST (state, data) {
    state.product_list = data
    state.product_display = data
  },
  SET_SORT_PRODUCT (state, value) {
    if (value == 'terbaru') state.product_display.sort((a, b) => b.attributes.id - a.attributes.id)
    else if (value == 'ulasan') state.product_display.sort((a, b) => b.attributes.rating - a.attributes.rating)
  },
  SET_FILTER_PRODUCT (state, value) {
    if (value.length == 0) state.product_display = [...state.product_list]
    else if (value.length == 1) {
      if (value[0] == '4+') state.product_display = state.product_list.filter(data => data.attributes.rating >= 3.8)
      else if (value[0] == 'ready') state.product_display = state.product_list.filter(data => data.attributes.stock > 0)
    }
    else {
      state.product_display = state.product_list.filter(data => data.attributes.rating >= 3.8 || data.attributes.stock > 0)
    }
  }
}

export default mutations
