<!--
 * @Author: JA
 * @Date: 2022-03-07 18:55:14
 * @LastEditTime: 2022-03-12 20:39:50
 * @LastEditors: JA
-->
<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 在Home、Search显示、在登陆注册时隐藏 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
//引入Header与Footer非路由组件
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header, //ES6新语法  K,V一致可省略V
    Footer,
  },
  mounted() {
    //优化：减少请求次数
    // //通知Vuex发请求，获取数据，存储与仓库当中 (转移到App中 只派发一次数)
    this.$store.dispatch("categoryList");
  },
};
</script>

<style scoped></style>
