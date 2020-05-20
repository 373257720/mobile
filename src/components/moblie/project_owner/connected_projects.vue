<template>
  <div id="p_connected_projects">
    <nav>
      {{$t('common.ConnectedItems')}}
    </nav>
    <main>
      <div class='remind' v-if='remind_show'>{{reminder}}</div>
      <van-collapse v-if='!remind_show' v-model="activeName" accordion>
        <van-collapse-item v-for="(l,i) in lists" :key="l.projectId"  :name="i">
          <div slot="title" class="title">
              <header>{{l.projectName}}</header>
          </div>
              <div><span>{{$t('projectOwner.SerialNumber')}}</span><span>{{$t('projectOwner.Recommender')}}</span>
                <span>{{$t('projectOwner.InvestorInformation')}}</span><span></span></div>
             <ul class="item">
               <li v-for="(item,index) in l.investorsResp" :key="index" class="item_li">
                 <p><span>{{index+1}}</span></p>
                 <p><span>{{item.userIdentityType==1?item.userName:item.userIdentityType==2?item.userCompany:''}}</span></p>
                 <ul >
                   <li>
                     {{item.investorsEmail}}
                   </li>
                   <li>
                     {{item.investorsType==1?item.investorsName:item.investorsType==2?item.investorsCompany:''}}
                   </li>
                   <li>
                     {{item.investorsCompanyAddress}}
                   </li>
                 </ul>
                 <p>
                   <img  :src="stauts_pic[item.signStatus==10?item.signStatus:11]" alt="">
                  </p>
               </li>
               <footer>
                 <button @click="$routerto('p_goods_details',{projectId:l.projectId})">{{$t('projectOwner.ViewProjectDetails')}}</button>
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
        remind_show:false,
        lists:[],
        stauts_pic:{
          '10':"../../../static/pic/success.png",
          '11':"../../../static/pic/false.png",
        }
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
              this.reminder=this.$t('common.NoMore');
              this.remind_show=true;
              return;
            }
            this.reminder='';

            this.lists.forEach((item=>{
              if(item.projectLan== "zh_CN"){
                item.investorsResp =  item.investorsResp.map(x=>{
                  return  {
                    investorsEmail: x.investorsEmail,
                    investorsName: x.investorsName,
                    investorsType:x.investorsType,
                    userIdentityType:x.userIdentityType,
                    investorsCompanyAddress: x.investorsCompanyAddress,
                    investorsCompany:x.investorsCompany,
                    signStatus:x.signStatus,
                    userCompany:x.userCompanyCh,
                    userName:x.userName
                  }
                })
              }else if(item.projectLan== "en_US"){
                item.investorsResp =  item.investorsResp.map(x=>{
                  return  {
                    investorsEmail: x.investorsEmail,
                    investorsName: x.investorsName,
                    investorsType:x.investorsType,
                    userIdentityType:x.userIdentityType,
                    investorsCompanyAddress: x.investorsCompanyAddressEn,
                    investorsCompany:x.investorsCompanyEn,
                    signStatus:x.signStatus,
                    userCompany:x.userCompanyEn,
                    userName:x.userName
                  }
                })
              }
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
      // padding:0 0.3rem;
    }
    .van-collapse-item{
      .van-cell{
        /*min-height: 2rem;*/
        min-height: 2rem;
        // line-height: 2rem;
        font-size: 0.46rem;
        padding:  0.5rem 0.3rem;
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
          // padding:0 0.5rem;
          color: #575757;
          background: #E8E8E8;
          display: flex;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          span:nth-of-type(1){
              flex:1;
          }
          span:nth-of-type(2){
           width: 30%;
          }
          span:nth-of-type(3){
           width: 40%;
          }
          span:nth-of-type(4){
            flex:1;
          }
        }
        .item{
        //  margin:0 0.5rem;
          .item_li{
            display: flex;
            padding: 0.3rem 0;
            // border-bottom: 1px dashed;
            p:nth-of-type(1){
                flex-grow: 1;
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
                font-size: 0.38rem;
                border: 0.03rem solid #02a7e7;
              }
            }
            p:nth-of-type(2){
            //  flex-grow: 2;
            width: 30%;
            padding: 0 0.2rem;
            display: flex;
            justify-content:center;
            align-items: center;
            span{
                word-wrap:break-word;
                width: 100%;
                text-align: center;
              }
            }
            p:nth-of-type(3){
               flex-grow: 1;
              display: flex;
              img{
                height: 0.62rem;
                width: 0.62rem;
              }
              justify-content: center;
              align-items: center;

            }
            ul{
              width:40%;
               padding: 0 0.2rem;
              // color: #575757;
              word-wrap:break-word;
                li{
                  display: flex;
                  justify-content: center;
                }
            }
          }
          footer{
            text-align: center;
            padding: 0.2rem 0;
            button{
              border-radius:5px;
              height: 1rem;
              width: 8rem;
              background: #00adef;
              color: white;
            }
          }
          /*padding: 0 0.5rem;*/
        }
      }

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
    // margin: 0 0 1.6rem 0;
    .remind{
     text-align: center;
      /*padding-top: 1rem;*/
      color: #969799;
      font-size: 0.4375rem;
      line-height: 1.5625rem;

    }
    nav {
      width: 100%;
      text-align: center;
      line-height: 1.6rem;
      height: 1.6rem;
      position: fixed;
      top: 0;
	font-weight: bold;
      z-index: 5;
      font-size: 0.46rem;
      background: white;
      border-bottom: 0.1rem solid #b5b5b5;
    }
    main {
      padding: 1.6rem 0 1.3rem 0;
      // margin
      // border: 0;
      /*padding: 0 0.5rem;*/
      /*background: #ffffff;*/



    }
  }
</style>
