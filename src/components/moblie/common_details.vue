<template>
  <div id="common_details">
    <main class='common_details'>
      <article>
        <ul>
          <li v-for="(item,key) in toson" :key="item.name">
            <div class="content" v-if="key=='projectDescribe'">
                <p class="row1">{{item.name}}:</p>
               <!-- <van-field
                    class="row2"
                    v-model="item.response"
                    autosize
                  /> -->
                  <p class="row2">{{item.response}}</p>
            </div>
			<div class="content projectDetail" v-else-if="key=='projectDetail'">
			    <p class="row1">{{item.name}}:</p>
			   <!-- <van-field
			        class="row2"
			        v-model="item.response"
			        autosize
			      /> -->
			    <p class="row2">
				<span v-show="!switch1">{{item.response}}</span>
				<span v-show="switch1">{{item.response.substr(0,[800])}}...</span>
				<i :class={up:!switch1} @click="moreDetails" v-if="item.response.length>800"></i></p>
			</div>
            <div class="normal" v-else-if="key=='collectMoney'">
              <p class="row1">{{item.name}}:</p>
              <p class="row2" ><span>{{item.collectMoneyMin}}</span><span style="margin: 0 0.2rem;">-</span><span>{{item.collectMoneyMax}}</span></p>
            </div>
<!--            <div class="normal" v-else-if="key=='signStatus'">-->
<!--              <p class="row1">{{$t(item.name)}}:</p>-->
<!--              <p class="row2" :class="item.classname" >{{$t(item.response)}}</p>-->
<!--            </div>-->
            <div class="normal" v-else>
              <p class="row1">{{item.name}}:</p>
              <p class="row2">{{item.response}}</p>
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
    return {
		switch1:true,
	};
  },
  created() {
    console.log(this.toson);
  },
  mounted() {},
  methods: {
	  moreDetails(){
		  this.switch1=!this.switch1;
	  },
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
			 /*width: 2.5rem;*/
			 }
            .row2{
              color: #787878;
             white-space: pre-wrap;       /* css-3 */
              white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
              /*white-space: -pre-wrap;      !* Opera 4-6 *!*/
              white-space: -o-pre-wrap;
            }

         }
		div.projectDetail{
			i{
			display: inline-block;
			border-width: 5px;
			border-style: solid;
			border-color: red transparent transparent transparent;
			transform :translate(50%,50%);
			}
			.up{
				transform :translate(0,0%);
				border-color: transparent transparent red transparent;
			}
		}

        }
      }
    }
  }
}
</style>
