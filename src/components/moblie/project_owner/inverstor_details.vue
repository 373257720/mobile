<template>
  <div id="p_inverstor_details">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约投资者资料
    </nav>
    <main>
      <!-- <aside>
        <img src="../../assets/26566ffb301dac8c24d21969b538612.png" alt />
      </aside>-->
      <article>
        <!-- <header>放水电费鼎飞丹砂</header> -->
        <ul>
          <li v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2">地方地方个梵蒂冈发给的发给地方个的发给的发给的发给的非官方地方</p>
          </li>
        </ul>
        <footer>
          <button @click="$goto('p_check_contract')">查看合约</button>
          <!-- <button @click="$goto('p_check_contract')">查看合约</button> -->
        </footer>
      </article>
    </main>
    <mbottom></mbottom>
  </div>
</template>
<script>
export default {
  name: "p_inverstor_details",
  data() {
    return {
      details_lists: [
        // {
        //   name: "申请时间:",
        //   response: ""
        // },
        // {
        //   name: "申请中间人:",
        //   response: ""
        // },
        {
          name: "投资者公司:",
          response: ""
        },
        {
          name: "投资者名称",
          response: ""
        },
        {
          name: "投资者地区:",
          response: ""
        },
        {
          name: "投资者电话:",
          response: ""
        },
        {
          name: "感兴趣行业:",
          response: ""
        },
        {
          name: "投资者邮箱:",
          response: ""
        },
        {
          name: "公司地址:",
          response: ""
        },
        {
          name: "签约时间:",
          response: ""
        }
      ]
    };
  }
};
</script>
<style lang="scss">
#p_inverstor_details {
  nav {
    position: relative;
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
#p_inverstor_details {
  width: 100%;
  nav {
    width: 100%;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    position: fixed;
    top: 0;
    font-weight: 550;
    font-size: 0.46rem;
    background: white;
    border-bottom: 0.16rem solid #b5b5b5;
  }
  main {
    margin-top: 1.5rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    article {
      margin: 0 0 1.3rem 0;
      header {
        height: 1.7rem;
        font-size: 0.32rem;
        text-align: center;
        font-weight: 600;
        line-height: 1.7rem;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
      ul {
        padding: 1.2rem 1.5rem 0 1.5rem;
        li {
          margin-bottom: 0.4rem;
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
        font-size: 0.4rem;
        button {
          width: 9.9rem;
          height: 1rem;
          background: #00adef;
          color: white;
        }
        button {
          margin-bottom: 0.4rem;
        }
        aside {
          height: 1.5rem;
          // width: 6.5rem;
          display: flex;
          justify-content: space-between;
          button {
            width: 3rem;
          }
        }
      }
    }
  }
}
</style>

