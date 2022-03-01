<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('pageCode', pageNo - 1)">
      上一页
    </button>
    <button v-if="starEnd.start > 1" @click="$emit('pageCode', 1)" :class="{active:pageNo==1}">1</button>
    <button v-if="starEnd.start > 2">···</button>
    <button
      v-for="(item, index) in starEnd.pageList"
      :key="index"
      @click="$emit('pageCode', item)"
       :class="{active:pageNo==item}"
    >
          {{ item }}
    </button>

    <button v-if="starEnd.end < totalPage - 1">···</button>
    <button
      v-if="starEnd.end < totalPage"
      @click="$emit('pageCode', totalPage)"
       :class="{active:pageNo==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('pageCode', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //   props: ['goodList']
  props: ["pageNo", "pageSize", "total", "countinues"],
  data() {
    return {};
  },
  //生命周期钩子
  mounted() {},
  //计算属性
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字和结束数字[至少是5]
    starEnd() {
      let start = 0;
      let end = 0;
      let pageList =[];
      //总页小于5(联系页码数)时
      if (this.countinues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        //正常情况，总页码大于5
        //起始数字
        start = this.pageNo - parseInt(this.countinues / 2);
        //结束数字
        end = this.pageNo + parseInt(this.countinues / 2);
        //start数字出现0|负数时，纠正
        if (start < 1) {
          start = 1;
          end = this.countinues;
        }
        //end数字大于总页码时，纠正
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.countinues + 1;
        }
      }
      //显示的页码数组
      for (let index = 1; index <= end; index++) {
        if (index>=start) {
          pageList.push(index)
        }
      }
      return { start, end ,pageList};
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>
