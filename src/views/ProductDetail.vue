<template>
  <div class="container">
    <h1>Details</h1>
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">List Product</a></li>
        <li class="breadcrumb-item active" aria-current="page">Samsung Galaxy</li>
      </ol>
    </nav>
    <div id="product-detail">
      <div class="row align-items-start">
        <div class="col">
          <img src="https://rgbtest.s3.ap-southeast-1.amazonaws.com/images/gift/full/xiaomi-pocophone-f1.jpg" class="img-fluid" alt="...">
        </div>
        <div class="col">
          <h1>Samsung Galaxy S9 - Midnight Black 4/64 GB</h1>
          <div class="row align-items-start">
            <div class="col-4">
              <star-rating
                :star-size="20"
                :increment="0.5"
              />
            </div>
            <div class="col-8">
              <p>160 reviews</p>
            </div>
          </div>

          <div class="row align-items-start">
            <div class="col-8">
              <h2><span>💰</span>200.000 poins</h2>
            </div>
            <div class="col-4">
              <p>In Stock</p>
            </div>
          </div>

          <div class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Soluta, mollitia. Aperiam exercitationem fugiat ut fuga alias corrupti consequuntur 
            aspernatur cum deleniti soluta quos, error eum nulla molestias minima vitae dolorem.
          </div>

          <div>
            <p>Jumlah</p>
          </div>

          <div class="wrapper quantity">
            <button class="btn btn--minus" @click="changeCounter('-1')" type="button" name="button">
            -
            </button>
            <input class="quantity" type="text" name="name" :value="counter">
            <button class="btn btn--plus" @click="changeCounter('1')" type="button" name="button">
              +
            </button>
          </div>

          <div class="mt-4 row align-items-start">
            <div class="col wishlist">
              <button type="button" class="btn btn-wishlist" :style="{ backgroundColor : backgroundColor, border: '2px solid red', borderRadius: '20px', width: '70px' }">
                <heart-icon size="1.5x" class="custom-class wishlist-icon" :fill="filledIcon" @click="handleAddWishlist"></heart-icon>
              </button>
              <!-- <span id = heart><i class="fa fa-heart-o" aria-hidden="true" ></i> </span> -->
            </div>
            <div class="col">
              dua
            </div>
            <div class="col">
              tiga
            </div>
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
      backgroundColor: 'red'
    }
  },
  components: {
    StarRating,
    HeartIcon
  },
  watch: {
  },
  methods: { 
    changeCounter(num) {
      this.counter += +num
      console.log(this.counter)
      !isNaN(this.counter) && this.counter > 0 ? this.counter : this.counter = 0
    },
    handleAddWishlist() {
      if (this.filledIcon === 'white') {
        this.filledIcon = 'red'
        this.backgroundColor = 'white'
      } else {
        this.filledIcon = 'white'
        this.backgroundColor = 'red'
      }
    }
  }
}
</script>

<style lang="scss">
/* Product Quantity */
.quantity {
	height: 30px;
	display: flex;
  .quantity {
    -webkit-appearance: none;
    border: none;
    text-align: center;
      width: 30px;
  
    font-size: 16px;
    color: #43484D;
    font-weight: 300;
    border: 1px solid #E1E8EE;
  }

  .btn {
    border: 1px solid #E1E8EE;
    width: 30px;
    background-color: #E1E8EE;
  /*   border-radius: 6px; */
    cursor: pointer;
  }
  button:focus,
  input:focus {
    outline:0;
  }
}

.wishlist {
  .btn-wishlist {
    // background-color: red;
    .wishlist-icon {
      color: red;
      cursor: pointer;
    }
  }
}

</style>
