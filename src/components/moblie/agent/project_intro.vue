<template>
  <div id="a_project_intro">
    <!-- <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />签约请求
    </nav> -->
     <commonnav :msg="dad_text"></commonnav>
    <main>
      <div class="investors_infor">
        <h2>{{title}}</h2>
      
      </div>
      <article>
            <div class="nav_lists">
          <p v-for="(item) in nav_lists" :key="item.name">
            <section class="box">
               <span class="1row" v-html="item.name"></span>
              <span class="rowb" >{{item.response}}</span>
            </section>
          
          </p>
        </div>
        <ul>
          <li i v-for="(item) in details_lists" :key="item.name">
            <p class="row1">{{item.name}}</p>
            <p class="row2" v-if="item.keyword=='projectDescribe'" v-html="item.response"></p>
            <p class="row2" v-else-if="item.keyword!='projectDescribe'">{{item.response}}</p>
          </li>
        </ul>
        <footer>
          <aside>
            <button @click="$routerto('a_recommand_i',$route.query)">推荐投资人</button>
            <button @click="$global.previous()">再考虑一下</button>
          </aside>
        </footer>
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
      show: false,
      title:'',
      dad_text:'项目简介',
      // details:{},
      nav_lists: [
    
      ],
      details_lists: [
    
      ]
    };
  },
    created() {
        let details = this.$route.query;
     this.$loading();
  this.$global.goods_deatails(`${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${details.projectId}&signStatus=${details.signStatus}&signId=${details.signId?details.signId:-1}`,'get').then(res=>{
    console.log(res);
    this.nav_lists=[...res.nav_lists]
    this.details_lists= [...res.details_lists]
    this.title=res.title;
    this.$toast.clear();
  })
  //  this.details = this.$route.query;D
  //   console.log(this.details);
    
  //   this.$axios({ 
  //     method: "get",
  //     url: `${this.$baseurl}/bsl_web/project/getProjectDetails?projectLan=zh_CN&projectId=${this.details.projectId}&signStatus=${this.details.signStatus}&signId=${this.details.signId?this.details.signId:-1}`
  //   }).then(res => {
  //      this.title=res.data.data.projectName;
  //     for (var i in res.data.data) {
  //       for(var j=0;j<this.details_lists.length;j++){
  //         if(this.details_lists[j].keyword==i){
  //           this.details_lists[j].response=res.data.data[i]
  //           if(this.details_lists[j].keyword=='signStatus'){
  //             this.details_lists[j].response= this.$global.pic_obj[res.data.data[i]] ;
  //           }
  //           //   if(this.details_lists[j].keyword=='signStatus'){
                
  //           // }
  //         } 
  //       }
  //       for(var w=0;w<this.nav_lists.length;w++){
  //          if(this.nav_lists[w].keyword==i){
  //           this.nav_lists[w].response=res.data.data[i]
  //         }
  //       }
  //     }
  //     console.log(this.details_lists);
  //   });
  },
  methods: {
    gg() {
      // console.log(this.$dialog);

      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容"
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss">
#a_project_intro {
  nav {
    // position: relative;
    .van-icon-arrow-left {
      position: absolute;
      left: 0.6rem;
      top: 50%;
      transform: (translate(0, -50%));
    }
  }
}
.van-dialog {
  font-size: 0.3rem;
}
.van-dialog__message {
  font-size: 0.3rem;
}
.van-button {
  font-size: 0.3rem;
}
</style>
<style lang="scss" scoped>
#a_project_intro {
  width: 100%;
  // nav {
  //   width: 100%;
  //   text-align: center;
  //   line-height: 1.5rem;
  //   height: 1.5rem;

  //   position: fixed;
  //   top: 0;
  //   font-size: 0.38rem;
  //   background: white;
  //   border-bottom: 0.02rem dashed #b5b5b5;
  // }
  main {
    margin-top: 1.6rem;
    background: #ffffff;
    aside {
      display: flex;
      width: 100%;
      height: 3rem;
      justify-content: center;
    }
    div.investors_infor {
      h2 {
     height: 2rem;
        font-size: 0.46rem;
        padding: 0.4rem;
        box-sizing: border-box;
        // font-size: 0.5rem;
        color: #0f6ebe;
        // text-align: center;
        font-weight: 600;
        line-height: 0.7rem;  
      }
      header {
        height: 0.8rem;
        font-size: 0.32rem;
        text-align: center;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
      ul {
        padding: 0.1rem 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.28rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 3rem;
          }
          .draft {
            margin-bottom: 0.25rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
          .draft1 {
            padding: 0.2rem 0.4rem;
            box-sizing: border-box;
          }
        }
      }
    }
    article {
      margin: 0 0 1.3rem 0;
      header {
        height: 0.8rem;
        font-size: 0.32rem;
        text-align: center;
        // font-weight: 600;
        background: #f2f2f2;
        line-height: 0.8rem;
        color: #868686;
        border-bottom: 0.01rem dashed #b5b5b5;
      }
       div.nav_lists {
        display: flex;
        border-top: 0.2rem solid #f2f2f2;
        border-bottom: 0.2rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2.5rem;  
          font-size: 0.3rem;
          display: flex;
          align-items:center;
         
          section.box{
            box-sizing: border-box;
              width: 100%;
              display: flex;
              text-align: center;
             height: 2rem;
            //  padding: 0.1rem;
            border-right: 0.08rem solid #f2f2f2;
            flex-direction: column;
            justify-content:space-between;
            span.rowb{
                 font-size: 0.6rem;
                  color: #0f6ebe;

            }
          }
            
        }
        p:nth-last-child(1){
            section.box{
              border-right: 0;
            }
            
          }
           
      
      }
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.1rem;
          display: flex;
          align-items: baseline;
          font-size: 0.3rem;
          .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 4rem;
          }
          .draft {
            margin-bottom: 0.25rem;
          }
          .row2 {
            width: 7rem;
            word-break: break-all;
            line-height: 0.48rem;
            color: #787878;
          }
          .draft1 {
            padding: 0.2rem 0.4rem;
            box-sizing: border-box;
          }
        }
        .contract {
          display: block;
          .row2 {
            width: 8rem;
            height: 6rem;
            border: 0.01rem solid #b3b3b3;
            // box-sizing: border-box;
            padding: 0;
            background: #f2f2f2;
            .draft1_middle {
              padding: 0.3rem;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              overflow-y: auto;
            }
          }
        }
      }
      footer {
        padding: 0 0.5rem 0.5rem 0.5rem;
        aside {
          height: 2.5rem;
          display: flex;
          font-size: 0.38rem;
          flex-direction: column;
          justify-content: space-between;
          button {
            height: 1rem;
            color: #ffffff;
          }
          button:nth-of-type(1) {
            background: #00adef;
          }
          button:nth-of-type(2) {
            background: #ff7c2c;
          }
        }
      }
    }
  }
}
</style>
