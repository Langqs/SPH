<template>
  <div>
    <!-- 三级联动全局组件：三级联动组件已注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list='floor'/>
    <Brand />
  </div>
</template>
<script>
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import ListContainer from "./ListContainer";
import Rank from "./Rank";
import TodayRecommend from "./TodayRecommend";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
  //计算属性
  computed: {
    ...mapState({ count: "count", floorList: "getFloorList" }),
  },
  //方法
  methods: {
    add() {
      this.$store.dispatch("add", 1);
    },
    reduce() {
      this.$store.dispatch("reduce", 1);
    },
  },
  //生命周期钩子，组件挂载完毕
  mounted() {
    //派发action，获取floor组件数据
    this.$store.dispatch("getFloorList");
  },
  //组件实例创建完成
  created(){

  }
};
</script>
<style>
</style>