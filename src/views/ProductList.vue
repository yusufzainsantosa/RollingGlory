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
#main-container > div {
  min-width: 1070px !important;
}

.filter-container {
  min-width: 300px;
}

.list-container {
  min-width: 700px;
  width: 100%;
  
  .product-card {
    border-radius: 10px;
    min-width: 270px;
    max-width: 290px;
    overflow: hidden;
    width: 100%;
  }
  .product-card:hover {
    .product-hover {
      display: block; 
    }
    .product-overlay {
      background-color: transparent;
    }
    .product-stock {
      color: white;
    }
    .product-wishlist {
      background-color: transparent !important;
      border:1px solid white !important;
    }
    .wishlist-icon {
      color: white !important;
    }
  }  
  .product-hover {
    background-color: #73b71bec;
    bottom: 0;
    color: white;
    display: none;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 20;    

    .product-hover-container {
      height: 100%;

      button {
        border-radius: 20px;
        width: 200px;
      }
    }
    .product-hover-title {
      margin-top: 180px;
      margin-bottom: 50px;
    }
  }
  .product-img {
    height: 87%;
  }
  .product-imgcontainer {
    height: 270px;
  }
  .product-overlay {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .product-points {
    color: #79B625;
    font-size: 14px;

    .img-points-logo {
      height: 10px;
    }
  }
  .product-reviews {
    font-size: 10px;
    color: gray;
    margin-top: 12px;
  }
  .product-sort {
    border-radius: 50px;
    padding: 0 2.25rem 0 0.75rem;
    text-align: center;
    width: 150px;
  }
  .product-title {
    z-index: 30;
    background-color: transparent;
    border-bottom: none;
    font-size: 13px;
    font-weight: bold;
    padding-bottom: 0;
    padding-top: 20px;
  }
  
  .product-best-seller {
    background: rgb(0, 183, 255);  
     
    span {
      bottom: 0px;
      left: 30px;
    }   
  }
  .product-hot-item {
    background: #E7246B;      
     
    span {
      bottom: 0px;
      left: 35px;
    }     
  }
  .product-new {
    background: rgb(201, 201, 18);  
     
    span {
      bottom: 10px;
      left: 35px;
    }   
  }
  .product-wishlist {
    align-content: center;
    background-color: #E7246B;
    border-radius: 50px;
    width: 55px;
    z-index: 30;
  }
  .sale-tag{
    border-radius: 10px;
    height: 70px;
    position: absolute;
    top: -20px;
    transform: rotate(45deg);
    right: -35px;
    width: 100px;

    span {
      color: white;
      position: absolute;
      text-align: center;
    }
  }

  .text-error {
    color: #E7246B;
  }
  .text-success {
    color: #79B625 !important;
  }

  .wishlist-icon {
    color: transparent;
  }
  .wishlist-index {
    z-index: 30;
  }
}
  
.label-style {
  color: gray;
  font-size: 14px;
}
</style>