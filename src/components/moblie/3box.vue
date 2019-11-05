<template>
    <div class="nav_lists">
          <p v-for="(item) in nav_lists" :key="item.name">
            <section class="box">
               <span class="1row" v-html="item.name"></span>
              <span class="rowb" >{{item.response}}</span>
            </section>
          
          </p>
    </div>
</template>
<script >
export default {
    name:'boxer',
    props:["nav_lists"],
    created(){
        console.log(this.nav_lists);   
    }
}
</script>
<style lang="scss">
    div.nav_lists {
        display: flex;
        border-top: 0.25rem solid #f2f2f2;
        border-bottom: 0.25rem solid #f2f2f2;
        > p {
          flex: 1;
          height: 2.5rem;  
          font-size: 0.34rem;
          display: flex;
          align-items:center;
          section.box{
            box-sizing: border-box;
              width: 100%;
              display: flex;
              text-align: center;
             height: 1.66rem;
            //  padding: 0.1rem;
            border-right: 0.08rem solid #f2f2f2;
            flex-direction: column;
            justify-content:space-between;
            span.rowb{
                 font-size: 0.38rem;
                  color: #0f6ebe;
                  font-weight: 550;
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