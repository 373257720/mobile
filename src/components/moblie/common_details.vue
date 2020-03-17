<template>
  <div id="common_details">
    <main class='common_details'>
      <article>
        <ul>
          <li v-for="(item,key) in toson" :key="item.name">
            <div class="content" v-if="key=='projectDescribe' || key=='projectDetail'">
                <p class="row1">{{item.name}}:</p>
               <!-- <van-field
                    class="row2"
                    v-model="item.response"
                    autosize
                  /> -->
                  <p class="row2">{{item.response}}</p>
            </div>
            <div class="normal" v-else-if="key=='collectMoney'">
              <p class="row1">{{item.name}}:</p>
              <p class="row2" ><span>{{item.collectMoneyMin}}</span><span style="margin: 0 0.2rem;">-</span><span>{{item.collectMoneyMax}}</span></p>
            </div>
            <div class="normal" v-else>
              <p class="row1">{{item.name}}:</p>
              <p class="row2" :class="item.classname" >{{item.response}}</p>
            </div>
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

  }
}
</style>
<style lang="scss" scoped>
#common_details {
  width: 100%;
  main {
    background: #ffffff;
    article {
      ul {
        padding: 0.5rem;
        li {
          margin-bottom: 0.2rem;
          align-items: baseline;

          font-size: 0.42rem;
          div.normal{
            /*display: flex;*/
            line-height: 0.6rem;
            .row1 {
            color: #4c4c4c;
            font-weight: 600;
            font-size: 0.46rem;
            /*width: 2.5rem;*/
            }
              .row2 {
            /*width: 7.5rem;*/
            word-break: break-all;
            // line-height: 0.48rem;
            color: #787878;
          }
            .red{
              color: #ee0a24;
            }
          }
         div.content{
            .row1 {
            color: #4c4c4c;
            font-weight: 600;
            font-size: 0.46rem;
            }
            .row2{
              color: #787878;
             white-space: pre-wrap;       /* css-3 */
              white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
              /*white-space: -pre-wrap;      !* Opera 4-6 *!*/
              white-space: -o-pre-wrap;
            }

         }


        }
      }
    }
  }
}
</style>
