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
                class="card-header product-title bg-white"
                v-bind:class="{ 'text-success': (value.attributes.stock >= 5), 'text-error': (value.attributes.stock < 5 || value.attributes.stock == 0) }"
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
                {{ stockValue(value.attributes.stock) }}
              </div>
              <div class="product-imgcontainer d-flex align-items-center justify-content-center">
                <img
                  :src="value.attributes.images[0]"
                  class="product-img"
                  alt="product"
                >
              </div>
              <div class="card-body">
                <h6 class="card-title">
                  {{ value.attributes.name }}
                </h6>
                <p class="mb-0 mt-2">
                  {{ value.attributes.points }}
                  <span>
                    poins
                  </span>
                </p>
                <div>
                  <star-rating
                    :inline="true"
                    :rating="roundingNum(value.attributes.rating)"
                    :read-only="true"
                    :star-size="20"
                    :increment="0.5"
                    :show-rating="false"
                  />                  
                  {{ value.attributes.numOfReviews }}
                  <span>
                    reviews
                  </span>
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
    },
    metaProduct() {
      return this.$store.state.page_meta
    }
  },
  watch: {
  },
  methods: {
    productTags(data) {
      if (data.isNew == 1 && !(this.roundingNum(data.rating) >= 4 && data.numOfReviews > 25)) return 'New'
      else if (data.isNew == 0 && this.roundingNum(data.rating) >= 4 && data.numOfReviews > 25) return 'Best Seller'
      else if (data.isNew == 1 && this.roundingNum(data.rating) >= 4 && data.numOfReviews > 25) return 'Hot Item'
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
.filter-container {
  min-width: 300px;
}

.list-container {
  min-width: 700px;
  width: 100%;

  .product-card {
    min-width: 270px;
    max-width: 290px;
    overflow: hidden;
    width: 100%;
  }
  .product-img {
    height: 87%;
  }
  .product-imgcontainer {
    height: 270px;
  }
  .product-sort {
    border-radius: 50px;
    padding: 0 2.25rem 0 0.75rem;
    text-align: center;
    width: 150px;
  }
  .product-title {
    border-bottom: none;
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 0;
    padding-top: 20px;
  }
  
  .product-best-seller {
    background: rgb(0, 183, 255);  
     
    span {
      bottom: 0px;
    }   
  }
  .product-hot-item {
    background: #ff5a97;      
     
    span {
      bottom: 0px;
    }     
  }
  .product-new {
    background: rgb(201, 201, 18);  
     
    span {
      bottom: 10px;
    }   
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
      left: 35px;
      position: absolute;
    }
  }

  .text-error {
    color: #ff5a97;
  }
  .text-success {
    color: rgb(106, 207, 106);
  }
}
  
.label-style {
  color: gray;
  font-size: 14px;
}
</style>