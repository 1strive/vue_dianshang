<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <!-- 利用事件委派 实现鼠标移出全部商品分类样式才会消失-->
        <!-- 事件的委派
				 * 	- 指将事件统一绑定给元素的共同的祖先元素，这样当后代元素上的事件触发时，会一直冒泡到祖先元素
				 * 		从而通过祖先元素的响应函数来处理事件。
				 *  - 事件委派是利用了冒泡，通过委派可以减少事件绑定的次数，提高程序的性能 -->
        <nav class="nav">
          <h2 class="all">全部商品分类</h2>
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="sortShow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: currentIndex == index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <!-- 当currentIndex与index相等时，添加类名cur -->
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移到了哪一个一级分类
      currentIndex: -1,
      sortShow: true,
    };
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    console.log("this", this);
    // //通知Vuex发请求，获取数据，存储与仓库当中 (转移到App中 只派发一次数)
    // this.$store.dispatch("categoryList");
    if (this.$route.path != "/home") {
      this.sortShow = false;
    }
  },
  computed: {
    //...对mapState方法返回的对象进行展开，返回为计算属性
    ...mapState({
      //右侧需要的是一个函数，当使用此计算属性时该函数会立即执行一次
      //注入一个参数state，即为大仓库中的数据
      categoryList: (state) => {
        console.log(state);
        return state.home.categoryList.data;
      },
    }),
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    //节流
    changeIndex: throttle(function (index) {
      //ES5写法（KV写法）
      this.currentIndex = index;
    }, 50),
    enterShow() {
      if (this.$route.path != "/home") {
        //鼠标移出
        this.sortShow = true;
      }
    },
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        //鼠标移出
        this.currentIndex = -1;
        this.sortShow = false;
      }
    },
    //进行路由跳转的回调函数
    goSearch(event) {
      //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      let node = event.target;
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id;
          //一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          console.log(this);
          location.params = this.$route.params;
          //动态给location配置对象添加query属性
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
  },
};
</script>

<style lang = 'less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      margin-bottom: 0;
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
      display: flex;
      a {
        margin: 0 22px;
        line-height: 50px;
        font-size: 23px;
        color: #333;
      }
    }

    .sort {
      margin-top: 10px;
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
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

          .cur {
            background: #cde11b;
          }
        }
      }
    }

    /* 过度动画的样式 */

    /* 开始 */
    .sort-enter {
      height: 0px;
      transform: rotate(0);
    }

    /* 结束 */
    .sort-enter-to {
      height: 461px;
      /* transform: rotate(360deg); */
    }

    /* 定义动画时间、速率 */
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>