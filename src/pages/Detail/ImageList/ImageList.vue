<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="item.id"
      >
        <img
          :src="item.imgUrl"
          :class="{ active: imgIndex == index }"
          @click="changImg(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      imgIndex: 0,
    };
  },
  watch: {
    skuImageList: {
      immediate: true, //初始化时，让handler调用一次
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            loop: false, // 循环模式选项
            autoplay: false, //可选选项，自动滑动
            //显示几张图片设置
            slidesPerView: 3,
            //每次切换图片个数
            slidesPerGroup: 1,

            // 如果需要分页器
            // pagination: {
            //   el: ".swiper-pagination",
            // },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
  //方法
  methods: {
    changImg(index) {
      this.imgIndex = index;
      //通知兄弟组件，当前的索引值为几
      this.$bus.$emit("getIndex", this.imgIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>