<template>
  <div class="container">
    <div class="d-flex flex-nowrap">
      <div class="m-3 filter-container">
        <div class="d-flex">
          <h6 class="fw-bold">
            Filter
          </h6>
        </div>
        <hr class="mt-1">
        <div class="border p-2">
          <div
            v-for="(obj, index) in filterProduct"
            :key="index"
            class="d-flex justify-content-between"
          >
            <label
              class="form-check-label"
              :for="`checkbox_${index}`"
            >
              <p class="label-style m-2">
                {{ obj.label }}
              </p>              
            </label>
            <input
              :id="`checkbox_${index}`"
              class="form-check-input m-2"
              type="checkbox"
              :value="obj.value"
              v-model="selectFilter"
            >
          </div>
        </div>
      </div>
      <div class="m-3 list-container">
        <div class="d-flex">
          <div class="me-auto">            
            <h6 class="fw-bold">
              Product List
            </h6>
          </div>
          <div class="mx-2 label-style">
            Urutkan
          </div>
          <div>
            <select
              class="form-select product-sort label-style"
              aria-label="Default select example"
            >
              <option value="terbaru">
                Terbaru
              </option>
              <option value="ulasan">
                Ulasan
              </option>
            </select>
          </div>
        </div>
        <hr class="mt-1">
        <div>
          <div class="card product-card">
            <img
              src="https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg"
              class="product-img"
              alt="product"
            >
            <div class="card-body">
              <h6 class="card-title">
                Samsung Galaxy S9-Midnight Black 4/64 GB
              </h6>
              <star-rating
                :star-size="20"
                :increment="0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  data () {
    return {
      filterProduct: [
        {
          label: 'Rating 4 ke atas',
          value: '4+'
        },
        {
          label: 'Stock Tersedia',
          value: 'all'
        }
      ],
      selectFilter: []
    }
  },
  components: {
    StarRating
  },
  computed: {
    allProduct() {
      return this.$store.state.product_list
    }
  },
  watch: {
  },
  methods: {
  },
  created () {
    this.$store.dispatch('fetchProduct', {pageNumber: 1, pageSize: 6})
  } 
}
</script>

<style lang="scss">
.filter-container {
  min-width: 300px;
}

.list-container {
  min-width: 700px;
  width: 100%;

  .product-card {
    width: 250px;
  }
  .product-sort {
    border-radius: 50px;
    padding: 0 2.25rem 0 0.75rem;
    text-align: center;
    width: 150px;
  }
}
  
.label-style {
  color: gray;
  font-size: 14px;
}
</style>