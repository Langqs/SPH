<template lang="">
    <div class="swiper-container">
    <div class="swiper-wrapper">
        <div
        class="swiper-slide"
        v-for="item in list"
        :key="item.id"
        >
        <img :src="item.imgUrl" />
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "Swiper",
  props: ["list"],
  watch: {
    list: {
      immediate: true, //初始化时，让handler调用一次
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            autoplay: true, //可选选项，自动滑动

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

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
};
</script>
