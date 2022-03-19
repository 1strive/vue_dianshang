<!--
 * @Author: JA
 * @Date: 2022-03-13 15:24:47
 * @LastEditTime: 2022-03-13 16:50:39
 * @LastEditors: JA
-->

<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>

    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <!-- v-for遍历数字时从一开始，一直遍历到数字处 所以此处应隐藏一部分 -->
    <!-- 在`Vue`处理时，`v-for`的优先级高于`v-if`，所以不管
    你`condition`是否成立，`v-for`都会做循环,所以是达不到先判
    断再循环的作用 -->
    <!-- v-if="page >= startNumAndEndNum.start" -->
    <button
      v-for="(page, index) in pageArr"
      :key="index"
      @click="$emit('getPageNo', page)"
     :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <!-- 下部分 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

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
    //计算出连续展示页码的起始数字与结束数字
    //注意可能的异常现象：总页数没有连续页码多(即总页数要大于continues的设定值，此处为5)
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let start = 0;
      let end = 0;
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end > totalPage) {
        end = totalPage;
        start = totalPage - continues + 1;
      }
      return { start, end };
    },
    pageArr() {
      const end = this.startNumAndEndNum.end;
      const page = [];
      for (let i = 1; i <= end; i++) {
        if (i >= this.startNumAndEndNum.start) {
          page.push(i);
        }
      }
      return page;
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
</style>
