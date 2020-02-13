<template>
  <div id="common_details">
    <main class='common_details'>
      <article>
        <ul>
          <li v-for="(item,key) in toson" :key="item.name">
            <div class="content" v-if="key=='projectDescribe' || key=='projectDetail'">
                <p class="row1">{{item.name}}</p>
               <!-- <van-field
                    class="row2"
                    v-model="item.response"
                    autosize
                
                    type="textarea"
                  /> -->
                  <p class="row2">{{item.response}}</p>
                  <!-- <textarea v-model="item.response"  name='describes'  rows="5" cols="5" class='row2'  readonly></textarea> -->
        
            </div>
            <div class="normal" v-else-if="key=='collectMoney'">
              <p class="row1">{{item.name}}</p>
              <p class="row2" ><span>{{item.collectMoneyMin}}</span><span>-</span><span>{{item.collectMoneyMax}}</span></p>
            </div>
            <div class="normal" v-else>
              <p class="row1">{{item.name}}</p>
              <p class="row2" >{{item.response}}</p>
            </div>
            
            <!-- <p class="row2" v-if="key=='projectDescribe'" v-html="item.response"></p> -->
          <!-- <van-field
          v-if="key=='projectDescribe'"
            class="row2 projectDescribe"
            v-model="item.response"
            autosize
            disabled
            type="textarea"
          />
            <van-field
          v-else-if="key=='projectDetail'"
            class="row2 projectDetail"
            v-model="item.response"
            autosize
            disabled
            type="textarea"
          />
            <!-- <p class="row2" v-else-if="key=='projectDetail'" v-html="item.response"></p> -->
            <!-- <p class="row2 money" v-else-if="key=='collectMoney'">
              <span>{{item.collectMoneyMin}}</span><span>-</span><span>{{item.collectMoneyMax}}</span>
            </p> --> 
          
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>
<script>
export default {
  name: "goods_details",
  props: ["toson"],
  data() {
    return {};
  },
  created() {
    console.log(this.toson);
  },
  mounted() {},
  methods: {
//     submitText(){
//     let arr = [];
//     this.text1.split('\n').forEach(item=>arr.push(`<p>${item.trim()}</p>`));
//     this.text2 = arr.join('<br>');
// }
  }
};
</script>
<style lang="scss">
#common_details {
  .common_details{
  // .van-cell {
  //      color: #787878;
  //    padding: 0;
  //     font-size: 0.42rem;
  //   background: none;
  //   padding: 0;
  //   margin: 0;
  //   border: 0;
  //   .van-field__control{
  //        color: #787878;
  //   // padding: 0;
  //   font-weight: 500;
  //   opacity: 2;
  //   // z-index: 0;
  //   // line-height: 0.56rem;
  //   // font-size: 0.42rem;
  //   // // text-shadow: none;
  //   background:white;
  //   // margin: 0;
  //   // border: 0;

  //   }
     
  // }
  }
 
}
</style>
<style lang="scss" scoped>
#common_details {
  width: 100%;
  main {
    background: #ffffff;
    article {
      // margin: 0 0 1.3rem 0;
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.2rem;
          align-items: baseline;
             line-height: 0.6rem;
          font-size: 0.42rem;
          div.normal{
            display: flex;
             .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 2.5rem;
            }
              .row2 {
            width: 7.5rem;
            word-break: break-all;
            // line-height: 0.48rem;
            color: #787878;
          }
          }
         div.content{
                .row1 {
            color: #4c4c4c;
            font-weight: 600;
            width: 2.5rem;
            }
            .row2{
              color: #787878;
             white-space: pre-wrap;       /* css-3 */
              white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
              white-space: -pre-wrap;      /* Opera 4-6 */
              white-space: -o-pre-wrap; 
            }
            pre {
            //       font-family: "Avenir", Helvetica, Arial, sans-serif;
            // margin: 0;
            //  color: #787878;
            // /* Opera 7 */
            // word-wrap: break-word;       /* Internet Explorer 5.5+ */
            // word-break:break-all;
            // overflow:hidden;
            // word-break: break-all;
            // width:100%;
            // background:white;
            // border: 0px;
            // color: #787878;
          }
         }

        
          .money{
            display: flex;
            span:nth-child(2){
              margin: 0 0.3rem;
            }
          }

        }
      }
    }
  }
}
</style>
