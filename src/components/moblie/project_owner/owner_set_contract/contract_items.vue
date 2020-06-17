<template>
  <div class="contract_items">
    <van-form @submit="onSubmit">
      <div v-for="(item,idx) in arr" :key="item.title">
        <div class="itemTitle">
          <p>{{item.title}}</p>
          <p>
            <van-icon @click="additem(item,idx)" name="add-o" />
            <van-icon @click="deleteitem(idx)" name="delete" />
          </p>
        </div>
        <!-- <p>{{item.title}}</p> -->

        <div v-for="(it,ids) in item.terms" :key="ids">
          <van-swipe-cell @close="deleteterms(idx,ids)">
            <div class="itemTitle">
              <span>{{ids+1}}</span>
              <van-field v-model="it.item_ch" placeholder="Username" />
            </div>
            <template #right>
              <van-button square text="Delete" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </div>
      </div>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">Submit</van-button>
      </div>
    </van-form>

    <div>添加条款：</div>
    <p class="dialog-add">
      <!-- <el-input placeholder="中文" @change="translate" v-model="newtitle"></el-input>
      <el-input placeholder="English" :suffix-icon="loading" v-model="newtitleEN"></el-input>-->
      <!-- <button @click="addtitle">增加</button> -->
    </p>
    <!-- <p class="dialog-footer">
      <button @click="$routerto('industry_lists')">{{$t('project.Cancel')}}</button>
      <button @click="submitForm('ruleForm')">{{$t('project.Confirm')}}</button>
    </p>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      arr: [
        {
          title: "费率:",
          titleEn: "Fee sharing mechanism:",
          terms: [
            {
              item_ch: "",
              item_En: "",
              loading: ""
            }
          ]
        },
        {
          title: "dfdsfdsfdsf:",
          titleEn: "Fee sharing mechanism:",
          terms: [
            {
              item_ch: "",
              item_En: "",
              loading: ""
            }
          ]
        }
      ]
    };
  },
  methods: {
     deleteitem(idx) {
      this.arr.splice(idx, 1);
      // if(this.arr.length===1){
      //   return
      // }
      //   this.arr[index].terms.splice(index, 1);
    },
    deleteterms(idx, index) {
      if (this.arr[idx].terms.length > 1) {
        this.arr[idx].terms.splice(index, 1);
      } else {
        // this.$message("最少为1");
        this.$toast('最少为1');
      }
    },
    onSubmit(values) {
      // console.log("submit", values);
    },
    additem(item, idx) {
      // console.log(item.idx);
      this.arr[idx].terms.push({
        item_ch: "",
        item_En: "",
        loading: ""
      });
      //    this.arr.item.push({
      //       //   key:1,
      //       title: this.newtitle,
      //       item_ch: ""
      //     });
    },
    addtitle() {
      let a = true;
      if (this.newtitle && this.newtitleEN) {
        this.arr.forEach((item, idx) => {
          if (
            item.title === this.newtitle ||
            item.titleEn === this.newtitleEN
          ) {
            a = false;
          }
        });
        if (a) {
          this.$nextTick(() => {
            this.arr.push({
              title: this.newtitle,
              titleEn: this.newtitleEN,
              terms: [
                {
                  item_ch: "",
                  item_En: "",
                  loading: ""
                }
              ]
            });
          });
        }
      }
    }
  }
};
</script>
<style lang="scss">
.itemTitle {
  // padding: 0.3125rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete-button {
  height: 100%;
}
/* @font-face {
  font-family: 'my-icon';
  src: url('./my-icon.ttf') format('truetype');
}

.my-icon {
  font-family: 'my-icon';
}

.my-icon-extra::before {
  content: '\e626';
} */
</style>