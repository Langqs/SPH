<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseenter="enterShow" @mouseleave="leaveShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- <transition name="sort"> -->
      <div class="sort" v-show="show">
        <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
        <div class="all-sort-list2" @click="goSearch">
          <div
            class="item"
            v-for="(c1, index) in categoryList"
            :key="c1.categoryId"
            @mouseenter="changIndex(index)"
            @mouseleave="leaveIndex"
            :class="{ cur: currIndex == index }"
          >
            <h3>
              <a
                :data-categoryName="c1.categoryName"
                :data-categoryId1="c1.categoryId"
              >
                {{ c1.categoryName }}</a
              >
            </h3>
            <div class="item-list clearfix">
              <div
                class="subitem"
                v-for="c2 in c1.categoryChild"
                :key="c2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a
                      :data-categoryName="c2.categoryName"
                      :data-categoryId2="c2.categoryId"
                    >
                      {{ c2.categoryName }}</a
                    >
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a
                        :data-categoryName="c3.categoryName"
                        :data-categoryId3="c3.categoryId"
                      >
                        {{ c3.categoryName }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import _ from 'lodash'; //完整引入
import throttle from "lodash/throttle"; //按需引入
export default {
  name: "TypeNav",
  data() {
    return {
      currIndex: -1, //三级联动背景色初始值
      show: true,
    };
  },
  //生命周期：组件挂载完毕,可以向服务器发请求
  mounted() {
    //通知Vuex发请求，获取数据，存储于仓库当中
    // this.$store.dispatch("categoryList");
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  //计算属性
  computed: {
    ...mapState({ categoryList: "categoryList" }),
  },
  //方法
  methods: {
    // changIndex(index){
    //   this.currIndex = index
    // },

    //节流，三级联动节流
    //changIndex:_.throttle(function(index){  //完整引入写法
    changIndex: throttle(function (index) {
      //按需引入写法
      this.currIndex = index;
    }, 100),

    //一级分类鼠标移出的事件回调
    leaveIndex() {
      this.currIndex = -1;
    },

    //三级联动跳转的方法
    goSearch(event) {
      //获取点击事件的子节点
      let element = event.target;
      //通过子节点中a标签加上自定义属性，来确认点击的是几级分类的a标签
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, categoryid1, categoryid2, categoryid3 } =
        element.dataset;
      // console.log(element.dataset);
      //如果标签身上拥有categoryname一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = {
          name: "search",
          params: this.$route.params || undefined,
        };
        let query = { categoryName: categoryname };
        //一级分类、二级分类、三级分类的a标签
        if (categoryid1) {
          query.category1Id = categoryid1;
        } else if (categoryid2) {
          query.category2Id = categoryid2;
        } else if (categoryid3) {
          query.category3Id = categoryid3;
        }
        //整理完参数
        location.query = query;
        //路由跳转
        if (location.query.categoryName == this.$route.query.categoryName) {
          console.log("请求参数与当前路由参数一致，跳转空白页");
          this.$router.push({
            name: "black",
            query: location,
          });
        } else {
          this.$router.push(location);
        }
      }
    },
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      this.currIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  a:hover {
    cursor: default;
    color: rgb(255, 145, 145);
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .cur {
        background-color: skyblue;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    //过渡动画的样式
    //过度动画开始状态
    //   .sort-enter{
    //     height: 0px;
    //   }
    //   //过渡动画结束状态
    //   .sort-enter-to{
    //     height: 461px;
    //   }
    //   //定义动画时间、速率
    //   .sort-enter-active{
    //     transition: all .5s linear;
    //   }
  }
}
</style>