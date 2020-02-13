<template>
<div id="nav_lists">
      <van-divider>项目详情</van-divider>
    <div class="nav_lists">
          <p v-for="(item) in nav_lists" :key="item.name">
            <section class="box">
               <span class="rowa" v-html="item.name"></span>
              <span class="rowb" >{{item.response}}</span>
            </section>

          </p>
    </div>
</div>
  
</template>
<script >
export default {
    name:'boxer',
    props:["nav_lists"],
  data() {
    return {
      // financingStage: {
      //   '0': '种子轮',
      //   '1': "天使轮",
      //   '2': "A轮",
      //   '3': "B轮",
      //   '4': "C轮",
      //   '5': "PRE-IPO",
      //   '6': "IPO",
      // },
    };
  },
    created(){
        this.nav_lists.interestProjectCount.name="已接受<br>投资者数量";
    }
}
</script>
<style lang="scss">
#nav_lists{
  .van-divider{
    background:#F2F2F2;
    border-color: #D2D2D2;
    padding: 0 2rem;
    margin:0;
    color: #858585;
    font-size: 0.42rem;
  }
}
    div.nav_lists {
        display: flex;
        // border-top: 0.25rem solid #f2f2f2;
        border-bottom: 0.25rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2.5rem;
          
          // font-size: 0.38rem;
             font-size: 0.42rem;
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
           span.rowa{
             line-height: 0.56rem;
             color: #4D4D4D;
           }
            span.rowb{
                 font-size: 0.5rem;
                  color: #0f6ebe;
                  font-weight: 600;
            }
          }
        }
        p:nth-last-child(1){
            section.box{
              border-right: 0;
            }

          }
      }
</style>
