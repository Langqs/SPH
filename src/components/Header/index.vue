<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="outLogin">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link class="btn-look" to="/center">我的订单</router-link>
          <a @click="goShopCart">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import _ from "lodash";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  //计算属性
  computed: {
    userName() {
      return this.$store.state.userInfo.name;
    },
  },
  //组件挂载完毕
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  //组件实例销毁之前，解绑事件
  beforeDestroy() {
    this.$bus.$off("hello");
  },
  //方法
  methods: {
    goShopCart(){
      this.$router.push('/shopCart')
    },
    //搜索按钮的回调函数
    // goSearch(){
    //   //路由传递参数
    //     this.$router.push({
    //     name:'search',
    //     query:{
    //       keyword:this.keyword,
    //     }
    //   })
    // },

    //防抖
    goSearch: _.debounce(function () {
      //路由传递参数
      let location = {
        name: "search",
        params: {
          keyword: this.keyword || undefined,
        },
      };
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      if (location.params.keyword === this.$route.params.keyword) {
        console.log("请求参数与当前路由参数一致，跳转空白页");
        this.$router.push({
          name: "black",
          query: location,
        });
      } else {
        this.$router.push(location);
      }
    }, 0),
    //退出登录
    async outLogin() {
      try {
        await this.$store.dispatch("userLogOut");
        this.$router.push("/login");
      } catch (error) {
        alert(error.message)
      }
    },
  },
};
</script>
<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
