<template>
  <div id="p_connected_projects">
    <nav>
      <van-icon name="arrow-left" @click="$global.previous()" />已连接项目
    </nav>
    <main>
      <div style="text-align: center;margin-top: 2rem;color: #969799">{{reminder}}</div>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item v-for="(l,i) in lists" :key="l.projectUserId"  :name="i">
          <div slot="title" class="title">
              <header>{{l.projectName}}</header>
          </div>
              <div><span>序号</span><span>投资者资料</span></div>
             <ul class="item">
               <li v-for="(item,index) in l.investorsResp" :key="index" class="item_li">
                 <p><span>{{index+1}}</span></p>
                 <ul >
                   <li  v-for="(value,key,index) in item">
                     {{value}}
                   </li>
                 </ul>
               </li>
               <footer>
                 <button @click="$routerto('p_goods_details',{projectId:l.projectId})">查看项目详情</button>
               </footer>
             </ul>
        </van-collapse-item>
      </van-collapse>
    </main>

    <mbottom></mbottom>
  </div>
</template>
<script>
  export default {
    name: "p_connected_projects",
    data() {
      return {
        activeName:'',
        reminder:'',
        lists:[],
      };
    },
    created() {
      this.getlist()

    },
    mounted() {
      // this.content = "";
    },
    methods: {
      getlist(){
        this.$loading();
        this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/connected/getConnected`).then(
          res=>{
            this.$toast.clear();
            this.lists=[...res.data.data];
            if(this.lists.length<=0){
              this.reminder='没有更多了';
              return
            }
            this.reminder='';
            this.lists.forEach((item=>{
              item.investorsResp =  item.investorsResp.map(x=>{
             return  {
                        investorsEmail: x.investorsEmail,
                          investorsName: x.investorsName,
                        investorsCompanyAddress: x.investorsCompanyAddress
                      }
              })
            }))
            console.log(this.lists)

          }
        )
      }
    }
  };
</script>
<style lang="scss">
  #p_connected_projects {
    nav {
      position: relative;
      .van-icon-arrow-left {
        position: absolute;
        left: 0.6rem;
        top: 50%;
        transform: (translate(0, -50%));
      }
    }
   .van-collapse-item .van-cell{
      margin:0 0.3rem;
    }
    .van-collapse-item{
      .van-cell{
        /*min-height: 2rem;*/
        min-height: 2rem;

        font-size: 0.46rem;
        padding:  0.5rem 0;
        width: initial;
        box-sizing: border-box;
        word-break: break-all;
        display: -webkit-flex;
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-content: center;
        align-content: center;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        color: #0f6ebe;
        font-weight: 600;
        line-height: 0.68rem;
        /*.borderstyle{*/
        /*  height: 0.3rem;*/
        /*  border-bottom: 1px dashed #969799;*/
        /*}*/
      }
      /*.van-collapse-item__wrapper{*/
      /*    border-bottom: 1px dashed #969799;*/
      /*    top:0;*/
      /*  !*will-change*!*/
      /*}*/
      .van-collapse-item__content{
        /*padding: 0rem;*/
        padding: 0;
        >div:nth-of-type(1){
          padding:0 0.5rem;
          background: #f2f2f2;
          display: flex;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          span:nth-of-type(1){
              flex:1;
          }
          span:nth-of-type(2){
            flex:3;
          }
        }
        .item{
         margin:0 0.5rem;

          .item_li{
            display: flex;
            padding: 0.3rem 0;
            border-bottom: 1px dashed;
            p:nth-of-type(1){
              flex:1;
              display: flex;
              justify-content: center;
              align-items: center;

              span{
                width: 0.62rem;
                height: 0.62rem;
                border-radius: 50%;
                box-sizing: border-box;
                color: #02a7e7;
                text-align: center;
                line-height: 0.62rem;
                font-size: 0.16rem;
                border: 0.03rem solid #02a7e7;
              }
            }
            ul{
              flex:3;
              li{
                margin-bottom: 0.2rem;
              }
              li:last-child{
                margin-bottom: 0;
              }
            }
            /*p:nth-of-type(2){*/
            /*  flex:3;*/
            /*}*/
          }
          footer{
            text-align: center;
            padding: 0.2rem 0;
            /*border-bottom: 1px dashed;*/
            button{
              height: 1rem;
              width: 8rem;
              background: #00adef;
              color: white;
            }
          }
          /*padding: 0 0.5rem;*/
        }
      }
      /*.van-cell__right-icon{*/
      /*  height: 100%;*/
      /*}*/
    }
    .van-hairline--top-bottom::after {
      /*border: 0.02rem solid #8e8e8e;*/
    }
    .van-field {
      background: #f2f2f2;
    }
  }
</style>
<style lang="scss" scoped>
  #p_connected_projects {
    width: 100%;
   height:100%;
    margin: 1.6rem 0 1.6rem 0;
    nav {
      width: 100%;
      text-align: center;
      line-height: 1.5rem;
      height: 1.5rem;
      position: fixed;
      top: 0;
      z-index: 5;
      font-size: 0.46rem;
      background: white;
      border-bottom: 0.1rem solid #b5b5b5;
    }
    main {
      margin-top: 1.5rem;
      border: 0;
      /*padding: 0 0.5rem;*/
      /*background: #ffffff;*/
    div.list{
        h2{
          min-height: 2rem;
          font-size: 0.46rem;
          z-index: 9999999;
          box-sizing: border-box;
          word-break: break-all;
          display: -webkit-flex;
          display: -webkit-box;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-align-content: center;
          align-content: center;
          -webkit-flex-wrap: wrap;
          border-bottom: 1px dashed #b5b5b5;
          flex-wrap: wrap;
          color: #0f6ebe;
          font-weight: 600;
          line-height: 0.68rem;
        }
    }


    }
  }
</style>
