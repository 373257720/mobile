<template>
  <div id="goods_details">
    <nav>项目详情</nav>
    <main>
      <!-- <aside>
        <img src="../../assets/26566ffb301dac8c24d21969b538612.png" alt />
      </aside> -->
      <article>
        <ul>
          <li  i v-for="(item) in details_lists" :key="item">
            <p class="row1">{{item}}</p>
            <p class="row2">{{item}}</p>
          </li>
        </ul>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  data() {
    return {
      details_lists: [
        "公司名称:",
        "是否上市公司:",
        "项目详情:",
        "集资金额:",
        "联系电话:",
        "电邮:",
        "投资者公司:",
        '投资者姓名:',
        '投资者电话:',
        '感兴趣行业:',
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#goods_details {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1rem;
    height: 1rem;
    position: fixed;
    top: 0;
    background: white;
    border-bottom: 0.01rem dashed #b5b5b5;
  }
  main {
    padding-top: 1.2rem;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      ul {
        padding: 0.5rem;
        li{
          margin-bottom:0.5rem;
            .row1 {
          font-size: 0.3rem;
          font-weight: 600;
        }
        .row2{
            font-size: 0.2rem;
        }
        }
      
      }
    }
  }
}
</style>

