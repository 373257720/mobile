<template>
	<div id="recent_recommand">
		<commonnav :msg="dad_text"></commonnav>
		<main>
			<div class="interests isbefore">
				<!-- <p class="row1">{{$t('investor.IndustryOfInterest')}}:</p> -->
				<p class="row2">
					<van-checkbox-group v-model="interestedInduslistid" ref="checkboxGroup">
						<van-cell  clickable 
						title="all" v-if='industrylist.length>0'
						  @click="toggleAll">
							<template #right-icon>
								<van-checkbox name="item.industryId" ref="checkboxess" />
							</template>
						</van-cell>
						<van-cell v-for="(item, index) in industrylist" clickable :key="item.industryId" 
						:title="$i18n.locale=='zh_CN'?item.industryNameCh:item.industryNameEn"
						 @click="toggle(index)">
							<template #right-icon>
								<van-checkbox :name="item.industryId" ref="checkboxess" />
							</template>
						</van-cell>
					</van-checkbox-group>
				</p>
			</div>
			<div class="bottom">
				<button @click="$routerto('a_recommand_i')">新增</button>
			</div>
		</main>
		
	</div>
</template>

<script>
	let timeout;
	// let currentValue;
	// import jsonp from 'fetch-jsonp';
	// import querystring from 'querystring';
	export default {
		name: "recent_recommand",
		data() {
			return {
				  num:1,
				interestedInduslistid:[],
				industrylist: [],
				countrylist_fetching: false,
				investors_type: [{
						text: this.$t('common.individual'),
						value: 1
					},
					{
						text: this.$t('common.company'),
						value: 2
					}
				],
				dad_text: this.$t('agent.RecommendInvestors'),
				title: "",
				investorsArea: undefined,
				form: {
					investorsType: 1,
					investorsCompany: "",
					investorsCompanyEn: '',
					investorsName: "",
					investorsArea: '',
					investorsAreaEn: '',
					projectId: "",
					signId: '',
					signStatus: '',
					signUserId1: '',

					// areaCode: ""
					// identity: ""
				}
			};
		},

		created() {
			this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/base/getAllIndustry`,)
			  .then(res => {
			    if(res.data.resultCode==10000){
			      this.title = res.data.data.projectName;
			      this.industrylist = res.data.data;
			    }
			    this.$toast.clear();
			  })
			  .catch(err => {
			    console.log(err);
			  });
			// this.form.projectId = this.$route.query.projectId ? this.$route.query.projectId : "";
			// this.form.signId = this.$route.query.projectId ? this.$route.query.signId : -1;
			// this.form.signStatus = this.$route.query.signStatus >= 5 ? 5 : this.$route.query.signStatus;
			// this.form.signUserId1 = this.$route.query.signUserId1 ? this.$route.query.signUserId1 : '';
			// // console.log(this.form.signUserId1?1:2)
			// this.ulHtml('');
		},
		computed: {

		},
		methods: {
			toggleAll() {
			   // console.log(this.num)
			   if(this.num==1){
			     this.$refs.checkboxGroup.toggleAll(true);
			     this.num=2;
			   }else if(this.num==2){
			     this.$refs.checkboxGroup.toggleAll(false);
			     this.num=1;
			   }
			},
			toggle(index) {
			  this.$refs.checkboxess[index].toggle();
			},
			handleChange1(value) {
				this.form.investorsType = value;
				// console.log()


			},
			search(val) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				timeout = setTimeout(this.ulHtml(val), 300);;
			},
			handleChange(value) {
				this.investorsArea = this.$i18n.locale == 'zh_CN' ? this.region[value - 1].chinese : this.region[value - 1].eng;
				this.form.investorsAreaEn = this.region[value - 1].eng;
				this.form.investorsArea = this.region[value - 1].chinese;
				this.countrylist_fetching = false;
				// console.log(this.form)
			},
			cleanall(value) {
				this.form.investorsCompany = '';
			},
			ulHtml(val) {
				this.region = [];
				let arr = [];
				this.countrylist_fetching = true;
				this.$global.get_encapsulation(`${this.$baseurl}/bsl_web/base/countryList.do`, {
						searchKey: val,
					})
					.then(res => {
						if (res.data.data.length > 0) {
							for (let i = 0; i < res.data.data.length; i++) {
								arr.push({
									chinese: res.data.data[i].countryZhname,
									eng: res.data.data[i].countryEnname,
									value: i,
									remark: res.data.data[i].countryCode
								});
							}
							this.region = arr;
						}
						// console.log(this.region)
						this.countrylist_fetching = false
					});

			},
			remind(meg) {
				this.$dialog
					.alert({
						title: meg
						// message: "弹窗内容"
					})
					.then(() => {});
			},
			regionchoose(value, region) {
				this.region_nametitle = region.text;
				this.form.investorsArea = region.text;
				// this.form.areaCode = region.remark;
				//  console.log(this.form.investorsArea,region.remark)
			},
			submit() {
				// if(this.form.investorsType==2 && this.form.investorsCompany==''){
				//   this.$toast({ message:this.$t('agent.PleaseEnterTheCompanyName')});
				//   return
				// }
				if (this.form.investorsType == 2 && this.form.investorsCompanyEn == '') {
					this.$toast({
						message: this.$t('agent.PleaseEnterTheCompanyName')
					});
					return
				}
				if (this.form.investorsName == '') {
					this.$toast({
						message: this.$t('agent.PleaseEnterInvestorName')
					});
					return
				} else if (this.form.investorsArea == '') {
					this.$toast({
						message: this.$t('agent.PleaseEnterRegion')
					});
					return
				}
				console.log(this.form)
				this.commit();
			},
			commit() {
				console.log(this.form)
				this.$dialog
					.confirm({
						title: this.$t('agent.Confirm')
						// message: "确认提交"
					})
					.then(() => {
						this.$loading()
						this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/projectSign/submitInvestors`,
								this.form)
							.then(res => {
								this.$toast.clear();
								if (res.data.resultCode == 10000) {
									this.$dialog
										.alert({
											title: res.data.resultDesc,
											message: this.$t('agent.WaitingForInvestmentBankReview')
										})
										.then(() => {
											this.$routerto("mysign")
										});
								} else {
									this.remind(res.data.resultDesc);
								}
							});
					})
					.catch(() => {
						// on cancel
					});
			}
		}
	};
</script>

<style lang="scss">
	#recent_recommand{
		width: 100%;
		height: 100%;
		padding: 1.6rem 0 1.3rem 0;
		main{
			// padding: 0.5rem;
			height: 100%;
			width: 100%;	
			display: flex;
			flex-direction: column;
		}
		div.interests{
			// height: 50%;	
			overflow-y: auto;
			margin-bottom: 2rem;
			// border: 1px solid ;
		}
		div.bottom{
		    width: 100%;
		    font-size: 0.42rem;
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: flex;
		    -webkit-box-pack: center;
		    -webkit-justify-content: center;
		    justify-content: center;
			button{
				background: #00adef;
				    line-height: 1rem;
				    color: white;
				    height: 1rem;
				    width: 8rem;
				    border-radius: 5px;
			}
			// position: absolute;
			// height: 1.6rem;
			// position: fixed;
			// bottom: 0;
			// button{
			// 	background: red;
			// 	border-radius: 5px;
				
			// }
		}
	}
</style>
