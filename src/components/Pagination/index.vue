<!--
 * @Author: JA
 * @Date: 2022-03-13 15:24:47
 * @LastEditTime: 2022-03-13 16:50:39
 * @LastEditors: JA
-->

<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>{{totalPage}}</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
// 1:分页器组件需要知道我一共展示多少条数据 ----total【100条数据】

// 2:每一个需要展示几条数据------pageSize【每一页3条数据】

// 3:需要知道当前在第几页-------pageNo[当前在第几页]

// 4:需要知道连续页码数【起始数字、结束数字：连续页码个数市场当中一般5、7、9】奇数（因为对称），
// 对称好看 continues：代表分页连续页码个数
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始数字与结束数字
    //注意可能的异常现象：总页数没有连续页码多
    startNumAndEndNum(){
        let start = 0
        let end = 0
        if(continues){
            
        }
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
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
</style>
