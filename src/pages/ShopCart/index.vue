<template>
  <div class="cart" v-show="show">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-if="cartInfoList.length > 0">
        <ul
          class="cart-list"
          v-for="(item, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @click="
                item.isChecked == 1
                  ? (item.isChecked = 0)
                  : (item.isChecked = 1)
              "
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="item.skuNum > 1 ? item.skuNum-- : item.skuNum - 1"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              @change="changNum($event, index)"
              class="itxt"
            />
            <a href="javascript:void(0)" class="plus" @click="item.skuNum++"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(item)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @click="onIsCheck"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCart">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      cartInfoList: [],
      show: true,
    };
  },
  //组件实例创建完成
  created() {
    this.getData();
  },
  //方法
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    //全选按钮
    onIsCheck(event) {
      let checked = event.target.checked ? 1 : 0;
      if (checked == 1) {
        this.cartInfoList.forEach((item) => {
          item.isChecked = 1;
        });
      } else {
        this.cartInfoList.forEach((item) => {
          item.isChecked = 0;
        });
      }
    },
    //删除商品
    deleteCart(item) {
      try {
        this.$store.dispatch("deleteCartListBySkuId", item.skuId);
      } catch (error) {
        alert("请求错误", error.message);
      }
      this.getData();
    },
    //修改商品数量
    changNum(event, index) {
      let value = event.target.value * 1;
      //如果输入进来的非法，出现NaN或小于1
      if (isNaN(value) || value < 1) {
        event.target.value = this.cartInfoList[index].skuNum;
      } else {
        //正常大于1，不能出现效数
        this.cartInfoList[index].skuNum = parseInt(value);
      }
    },
    //删除全部勾选的商品
    deleteAllCart() {
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          this.$store.dispatch("deleteCartListBySkuId", item.skuId);
        }
      });
      this.getData()
    },
    goTrade(){
      this.$router.push('trade')
    },
  },
  //计算属性
  computed: {
    ...mapState(["CartList"]),
    // ...mapGetters(['cartInfoList']),

    //计算购买产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
    //判断底部复选框是否勾选【全部】
    isAllCheck() {
      if (this.cartInfoList.every((item) => item.isChecked == 1)) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    CartList: {
      handler() {
        try {
          this.cartInfoList = this.CartList[0].cartInfoList;
        } catch (error) {
          this.show = false;
          // alert('暂无数据')
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  a:hover {
    cursor: default;

    color: rgb(255, 145, 145);
  }

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
      a:hover {
        color: rgb(255, 145, 145);
  }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>