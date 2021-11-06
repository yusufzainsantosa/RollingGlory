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
          <div class="row">
            <div
              class="card product-card col m-2"
              v-for="(value, index) in allProduct"
              :key="index"
            >
              <div
                class="product-overlay"
                v-show="value.attributes.stock == 0"
              >
              </div>
              <div class="product-hover">
                <div class="d-flex flex-column align-items-center product-hover-container">
                  <div class="product-hover-title">
                    {{ value.attributes.name }}
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-light mt-3"
                    @click="productClick(value.id)"
                  >
                    <eye-icon size="1.5x" />
                    View detail
                  </button>
                </div>
              </div>
              <div
                class="card-header product-title"
                v-bind:class="{
                  'text-success': (value.attributes.stock >= 5),
                  'text-error': (value.attributes.stock < 5 || value.attributes.stock == 0)
                }"
              >              
                <div
                  class="sale-tag"                  
                  v-bind:class="{
                    'product-new': (productTags(value.attributes) == 'New'),
                    'product-best-seller': (productTags(value.attributes) == 'Best Seller'),
                    'product-hot-item': (productTags(value.attributes) == 'Hot Item') 
                  }"
                >
                  <span v-if="(productTags(value.attributes) == 'New')">
                    New
                  </span>
                  <span v-else-if="(productTags(value.attributes) == 'Best Seller')">
                    Best
                    <br>
                    Seller
                  </span>
                  <span v-else-if="(productTags(value.attributes) == 'Hot Item')">
                    Hot
                    <br>
                    Item
                  </span>
                </div>
                <div class="product-stock">
                  {{ stockValue(value.attributes.stock) }}
                </div>
              </div>
              <div class="product-imgcontainer d-flex align-items-center justify-content-center">
                <img
                  :src="value.attributes.images[0]"
                  class="product-img"
                  :alt="`product-${value.attributes.slug}`"
                >
              </div>
              <div class="card-body p-0">
                <h6 class="card-title">
                  {{ value.attributes.name }}
                </h6>
                <p class="mb-0 mt-2 product-points">
                  <img
                    :src="require('@/assets/images/point-logo-list.svg')"
                    class="img-points-logo"
                    alt="logo"
                  >  
                  {{ value.attributes.points }}
                  <span>
                    poins
                  </span>
                </p>
              </div>
              <div class="card-body p-0 pb-4 d-flex">
                <star-rating
                  :inline="true"
                  :rating="roundingNum(value.attributes.rating)"
                  :read-only="true"
                  :star-size="15"
                  :increment="0.5"
                  :show-rating="false"
                />     
                <div class="product-reviews">           
                  {{ value.attributes.numOfReviews }}
                  reviews
                </div>  
                <div
                  v-show="!value.attributes.isWishlist"
                  class="ms-auto wishlist-index"
                >
                  <div class="product-wishlist d-flex justify-content-center py-1">
                    <heart-icon
                      size="1.5x"
                      class="wishlist-icon"
                      :fill="wishlistColor"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { EyeIcon, HeartIcon } from 'vue-feather-icons'

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
      selectFilter: [],
      wishlistColor:'white'
    }
  },
  components: {
    EyeIcon,
    HeartIcon,
    StarRating
  },
  computed: {
    allProduct() {
      return this.$store.state.product_list
    },
    metaProduct() {
      return this.$store.state.page_meta
    }
  },
  methods: {
    productClick(id) {
      this.$router.push({
        name: 'product-detail',
        params: { productId: id }
      })
    },
    productTags(data) {
      if (data.isNew && !(this.roundingNum(data.rating) >= 4 && data.numOfReviews > 25)) return 'New'
      else if (!data.isNew && this.roundingNum(data.rating) >= 4 && data.numOfReviews > 25) return 'Best Seller'
      else if (data.isNew && this.roundingNum(data.rating) >= 4 && data.numOfReviews > 25) return 'Hot Item'
    },
    roundingNum(num) {
      if (num >= (Math.floor(num) + 0.3) && num <= (Math.floor(num) + 0.7)) return (Math.floor(num) + 0.5)
      return Math.round(num)
    },
    stockValue(stock) {
      if (stock >= 5) return 'In Stock'
      else if (stock == 0) return 'Sold Out'
      else if (stock < 5) return 'Stock < 5'
    }
  },
  created () {
    this.$store.dispatch('fetchProduct', {pageNumber: 1, pageSize: 100})
  } 
}
</script>

<style lang="scss">
@import '@/assets/scss/productList.scss';
</style>