<template>
  <div id="p_goods_details">
    <!-- <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />项目详情
    </nav> -->
     <commonnav :msg="dad_text"></commonnav>
    <main>
      <!-- <aside>
        <img src="../../assets/26566ffb301dac8c24d21969b538612.png" alt />
      </aside>-->
      <article>
        <header>放水电费鼎飞丹砂</header>
        <boxx :nav_lists="nav_lists"></boxx>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非官方地方</p>
          </li>
        </ul>
        <footer>
          <button @click="$goto('investor_infor')">投资者资料</button>
          <button @click="$goto('investor_infor')">未签约</button>
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_goods_details",
  data() {
    return {
      dad_text:'项目详情',
           nav_lists: [
        {
          name: "融资阶段",
          response: "12"
        },
        {
          name: "项目方<br>有兴趣数量",
          response: "16"
        },
        {
          name: "已提交</br>投资者数量",
          response: "118"
        }
      ],
     details_lists: [
        {
          name: "行业:",
          response: ""
        },
        {
          name: "地区:",
          response: ""
        },
         {
          name: "公司名称:",
          response: ""
        },
        {
          name: "是否上市公司",
          response: ""
        },
        {
          name: "项目介绍:",
          response: ""
        },
        {
          name: "集资额:",
          response: ""
        },
        {
          name: "融资阶段:",
          response: ""
        },
        {
          name: "项目方有兴趣的数量:",
          response: ""
        },
            {
          name: "已提交的投资者数量:",
          response: ""
        },
        {
          name: "项目状态:",
          response: ""
        },
         {
          name: "联系电话:",
          response: ""
        },
        {
          name: "投资者公司:",
          response: ""
        },
          {
          name: "电邮:",
          response: ""
        },
          {
          name: "项目详情:",
          response: ""
        },
     
      ]
    };
  }
};
</script>
<style lang="scss">
#p_goods_details {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      // line-height: 1rem;
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
</style>
<style lang="scss" scoped>
#p_goods_details {
  width: 100%;
  main {
    // margin-top: 1.5rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      margin: 1.5rem 0 1.3rem 0;
      header {
    height: 1.5rem;
        font-size: 0.38rem;
        color: #0f6ebe;
        text-align: center;
        font-weight: 600;
        line-height: 1.5rem;
      }
      ul {
        padding: 0.5rem 0.5rem 0 0.5rem;
        li {
          margin-bottom: 0.2rem;
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        button {
          width: 6.5rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
      }
    }
  }
}
</style>

