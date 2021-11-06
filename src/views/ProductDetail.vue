<template>
  <div id="product-detail" class="container">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">List Product</a></li>
        <li class="breadcrumb-item active" aria-current="page">Samsung Galaxy</li>
      </ol>
    </nav>
    <div class="mt-5 content">
      <div class="row align-items-start mb-5">
        <div class="col card">
          <div class="card-body">
           <img src="https://rgbtest.s3.ap-southeast-1.amazonaws.com/images/gift/full/xiaomi-pocophone-f1.jpg" class="img-fluid" alt="...">
          </div>
        </div>
        <div class="col">
          <h1 class="fw-bold fs-2 mb-3">Samsung Galaxy S9 - Midnight Black 4/64 GB</h1>
          <div class="row align-items-start mb-3 reviews">
            <div class="col-4">
              <star-rating
                :star-size="20"
                :increment="0.5"
              />
            </div>
            <div class="col-8">
              <p class="text-muted">160 reviews</p>
            </div>
          </div>

          <div class="row align-items-start stock">
            <div class="col-8">
              <h2 class="fs-3 fw-bold product-price"><dollar-sign-icon size="1x"></dollar-sign-icon>200.000 poins</h2>
            </div>
            <div class="col-4 mb-3">
              <p class="fw-bold text-success">In Stock</p>
            </div>
          </div>

          <div class="mb-3">
            <p class="fw-lighter">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Soluta, mollitia. Aperiam exercitationem fugiat ut fuga alias corrupti consequuntur 
            aspernatur cum deleniti soluta quos, error eum nulla molestias minima vitae dolorem.</p>
          </div>

          <div>
            <p class="text-muted">Jumlah</p>
          </div>

          <div class="wrapper-quantity">
            <button class="btn btn--minus" @click="changeCounter('-1')" type="button" name="button">
            -
            </button>
            <input class="quantity-value" type="text" name="name" :value="counter">
            <button class="btn btn--plus" @click="changeCounter('1')" type="button" name="button">
              +
            </button>
          </div>

          <div class="mt-4 align-items-start action">
            <button type="button" class="btn btn-wishlist" :style="{ backgroundColor : backgroundColor }">
              <heart-icon size="1.5x" class="custom-class wishlist-icon" :fill="filledIcon" @click="handleAddWishlist"></heart-icon>
            </button>
            <button type="button" class="btn btn-success btn-redeem">Redeem</button>
            <button type="button" class="btn btn-outline-success btn-add-cart">Add to cart</button>
          </div>
        </div>
      </div>
      <div class="product-info">
        <ul class="nav nav-tabs mb-5">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Info Product</a>
          </li>
        </ul>
        <div>
          <h5 class="fw-lighter text-success mb-4">Rincian</h5>
          <p class="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit cupiditate error sapiente, 
            tenetur at vero officia qui officiis ad! Incidunt quas est et. 
            Cupiditate quisquam saepe deleniti aperiam dicta quis. Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Maxime beatae ea aut. Quisquam, doloribus dolore animi veniam autem atque voluptates 
            cumque quod ducimus tempora sequi omnis doloremque soluta sunt? Assumenda.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { DollarSignIcon, HeartIcon } from 'vue-feather-icons'

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
    HeartIcon,
    DollarSignIcon
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
#product-detail {
  max-width: 1200px;
  padding: 25px;
  .content {
    padding: 26px;
    .row {
      .card {
        border-color: white;
        align-items: center;
        border-radius: 12px;
        img {
          max-height: 500px;
        }
      }
      .row.reviews {
        @media screen and (max-width: 800px) {
          .col-8, .col-4 {
            width: 50%;
          }
        }
      }
      .row.stock {
        @media screen and (max-width: 800px) {
          .col-8 {
            width: 67.5%;
          }
          .col-4 {
            width: 32.5%;
          }
        }
        @media screen and (max-width: 713px) {
          .col-8 {
            width: 100%;
          }
          .col-4 {
            width: 100%;
          }
        }
        .product-price {
          color: #5fbd02;
        }
      }
      .wrapper-quantity {
        height: 30px;
        display: flex;
        .quantity-value {
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
          border: 0px solid #E1E8EE;
          width: 30px;
          background-color: #E1E8EE;
          text-align: center;
          cursor: pointer;
        }
        button:focus,
        input:focus {
          outline:0;
        }
      }
      
      .action {
        .btn {
          margin-right: 10px;
        }
        .btn-wishlist {
          border: 2px solid red;
          border-radius: 20px;
          width: 70px;
          .wishlist-icon {
            color: red;
            cursor: pointer;
          }
          @media screen and (max-width: 813px) {
            width: 100%;
          }
        }
        .btn-redeem,
        .btn-add-cart {
          border-radius: 20px;
          width: 120px;
          @media screen and (max-width: 813px) {
            width: 100%;
            margin-top: 12px;
          }
        }
        .btn-add-cart:hover {
          background-color: #5fbd02;
          border-color: #5fbd02;
        }
      }
    }
    .product-info {
      .nav-tabs {
        .nav-link {
          padding: 0.5rem 2.5rem 0.5rem 0;
        }
        .nav-link.active {
          border-bottom-color: #5fbd02;
          color: #5fbd02;
          border-bottom-width: 5px;
          border-top: none;
          border-right: none;
          border-left: none;
        }
      }
      .description {
        line-height: 2.5rem;
      }
    }
  }
}

</style>
