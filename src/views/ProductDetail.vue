<template>
  <div
    id="product-detail"
    class="container pt-2"
  >
    <div v-if="productDetail.id != undefined">
      <nav
        style="--bs-breadcrumb-divider: '>';"
        aria-label="breadcrumb"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a
              class="list-product"
              href="/"
            >
              List Product
            </a>
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
          >
            {{ productDetail.attributes.name }}
          </li>
        </ol>
      </nav>
      <div class="mt-5 content">
        <div class="row align-items-start mb-5">
          <div class="col card">
            <div class="card-body img-container">
              <div
                class="sale-tag d-flex justify-content-center"                  
                v-bind:class="{
                  'product-new': (productTags(productDetail.attributes) == 'New'),
                  'product-best-seller': (productTags(productDetail.attributes) == 'Best Seller'),
                  'product-hot-item': (productTags(productDetail.attributes) == 'Hot Item') 
                }"
              >
                <span v-if="(productTags(productDetail.attributes) == 'New')">
                  New
                </span>
                <span v-else-if="(productTags(productDetail.attributes) == 'Best Seller')">
                  Best
                  <br>
                  Seller
                </span>
                <span v-else-if="(productTags(productDetail.attributes) == 'Hot Item')">
                  Hot
                  <br>
                  Item
                </span>
              </div>
              <img
                :src="productDetail.attributes.images[0]"
                class="img-fluid"
                :alt="productDetail.attributes.slug"
              >
            </div>
          </div>
          <div class="col">
            <h1 class="fw-bold fs-2 mb-3">
              {{ productDetail.attributes.name }}
            </h1>
            <div class="d-flex">
              <div>
                <star-rating
                  :inline="true"
                  :rating="roundingNum(productDetail.attributes.rating)"
                  :read-only="true"
                  :star-size="18"
                  :increment="0.5"
                  :show-rating="false"
                />  
              </div>
              <div>
                <p class="text-muted total-reviews">
                  {{ productDetail.attributes.numOfReviews }} reviews
                </p>
              </div>
            </div>

            <div class="d-flex stock">
              <div>  
                <h2 class="fs-3 fw-bold product-price">                            
                  <img
                    :src="require('@/assets/images/point-logo.svg')"
                    class="img-points-logo"
                    alt="logo"
                  >  
                  {{ productDetail.attributes.points }} poins
                </h2>
              </div>
              <div class="mx-3">
                <p
                  class="fw-bold product-stock"
                  v-bind:class="{
                    'text-success': (productDetail.attributes.stock >= 5),
                    'text-error': (productDetail.attributes.stock < 5 || productDetail.attributes.stock == 0)
                  }"
                >
                  {{ stockValue(productDetail.attributes.stock) }}
                </p>
              </div>
            </div>

            <div class="mb-3">
              <p
                class="fw-lighter"
                v-html="productDetail.attributes.info"
              />
            </div>

            <div>
              <p class="text-muted">
                Jumlah
              </p>
            </div>

            <div class="wrapper-quantity">
              <button
                class="btn btn--minus"
                @click="changeCounter('-1')"
                type="button"
                name="button"
              >
              -
              </button>
              <input
                class="quantity-value"
                type="text"
                name="name"
                :value="counter"
              >
              <button
                class="btn btn--plus"
                @click="changeCounter('1')"
                type="button"
                name="button"
              >
                +
              </button>
            </div>

            <div class="mt-4 align-items-start action">
              <button
                type="button"
                class="btn btn-wishlist"
                :style="{
                  backgroundColor : backgroundColor
                }"
              >
                <heart-icon
                  size="1.5x"
                  class="custom-class wishlist-icon"
                  :fill="filledIcon"
                  @click="handleAddWishlist" />
              </button>
              <button
                type="button"
                class="btn btn-success btn-redeem"
              >
                Redeem
              </button>
              <button
                type="button"
                class="btn btn-outline-success btn-add-cart"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div class="product-info">
          <ul class="nav nav-tabs mb-5">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
              >
                Info Product
              </a>
            </li>
          </ul>
          <div>
            <h5 class="fw-lighter text-success mb-4">
              Rincian
            </h5>
            <p
              class="description"
              v-html="productDetail.attributes.description"
            />
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { HeartIcon } from 'vue-feather-icons'

export default {
  data () {
    return {
      counter: 1,
      filledIcon: 'white',
      backgroundColor: '#E7246B',
      productId: 0
    }
  },
  components: {
    HeartIcon,
    StarRating
  },
  computed: {
    productDetail() {
      return this.$store.state.product_detail
    }
  },
  methods: { 
    changeCounter(num) {
      this.counter += +num
      console.log(this.counter)
      !isNaN(this.counter) && this.counter > 0 ? this.counter : this.counter = 0
    },
    handleAddWishlist() {
      this.$store.dispatch('toggleProduct', this.productId)
      this.$store.dispatch('detailProduct', this.productId)
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
    this.productId = this.$route.params.productId
    this.$store.dispatch('detailProduct', this.productId)
  } 
}
</script>

<style lang="scss">
@import '@/assets/scss/productDetail.scss';
</style>
