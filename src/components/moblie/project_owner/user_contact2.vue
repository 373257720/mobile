<template>
	<div id="p_user_contact2">
		<commonnav :msg="dad_text"></commonnav>
		<!-- <main></main> -->
		<ul>
			<li>
				<!-- <p> -->
				<span>
					<img src="../../../assets/4a1d586cb6cffdaee2c91f77293a773.png" alt />
				</span>
				<span>{{name}}</span>
				<!-- <van-icon name="arrow" /> -->
				<!-- </p> -->
			</li>
			<li>
				<main>
					<div v-for="(item) in details_lists" :key="item.name">
						<div v-if="item.keyword!='investorsCompany' || (item.keyword=='investorsCompany' && item.response!='')">
							<p class="row1">{{item.name}}</p>
							<p class="row2">{{item.response}}</p>
						</div>
					</div>
				</main>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: "user_contact",
		data() {
			return {
				searchkey: "",
				dad_text: this.$t('common.Contacts'),
				details_lists: [{
						keyword: "investorsCompany",
						name: this.$t('agent.InvestorCompany'),
						response: ""
					},
					{
						keyword: "investorsName",
						name: this.$t('agent.InvestorName'),
						response: ""
					},
					{
						keyword: "investorsArea",
						name: this.$t('investor.InvestorRegion'),
						response: ""
					},
					{
						keyword: "investorsMobile",
						name: this.$t('investor.InvestorPhone'),
						response: ""
					},
					{
						keyword: "investorsEmail",
						name: this.$t('investor.InvestorEmail'),
						response: ""
					},
					{
						keyword: "interestedIndustries",
						name: this.$t('investor.InvestorInterest'),
						response: ""
					},
					{
						keyword: "investorsCompanyAddress",
						name: this.$t('investor.InvestorCompanyAddress'),
						response: ""
					},
					{
						keyword: "signTime3",
						name: this.$t('common.SigningTime'),
						response: ""
					}
				],
			};
		},
		computed: {
			name() {
				return this.$route.query.idname;
			}
		},
		created() {
			this.$loading();
			this.$global.get_encapsulation(
					`${this.$axios.defaults.baseURL}/bsl_web/projectSign/getInvestorsDetail`, {
						investorsId: this.$route.query.investorsId,
					}
				)
				.then(res => {
					this.$toast.clear();
					if (res.data.resultCode == 10000) {
						this.details_lists.forEach((item,idx)=>{
							if(res.data.data.hasOwnProperty(item.keyword)){
								if (item.keyword == "signTime3") {
									item.response = res.data.data[item.keyword] ? this.$global.timestampToTime(res.data.data[item.keyword]) : "-";
								} else {
									item.response = res.data.data[item.keyword] || '-';
								}
								if (res.data.data.lan == 'en_US') {
									// console.log(res.data.data.interestedIndustriesEn)
									if (item.keyword == 'interestedIndustries') {
										item.response = res.data.data.interestedIndustriesEn || '-';;
									} else if (item.keyword == 'investorsArea') {
										item.response = res.data.data.investorsAreaEn || '-';;
									} else if (item.keyword == 'investorsCompany') {
										item.response = res.data.data.investorsCompanyEn || '-';;
									} else if (item.keyword == 'investorsCompanyAddress') {
										item.response = res.data.data.investorsCompanyAddressEn || '-';;
									}
								
								}
							}
						})
					}

				});

			// if(a.er
		},
		methods: {

		}
	};
</script>
<style lang="scss">
	#p_user_contact2 {
		.van-search {
			padding: 0.1rem 0.2rem;
		}

		.van-search__action {
			font-size: 0.3rem;
			line-height: 0.5rem;
		}

		.van-cell {
			font-size: 0.1rem;
			line-height: 0.5rem;
			padding: 0.1rem 0.25rem 0.1rem 0;
		}

		.van-cell--clickable {
			padding: 0.1rem 0.3rem;
		}

		.van-field__left-icon .van-icon,
		.van-field__right-icon .van-icon {
			font-size: 0.3rem;
		}

		.van-field__clear {
			// height: 0.1rem;
			font-size: 0.3rem;
		}

		.van-field__control {
			// height: 0.5rem;
			// font-size: 0.1rem;
		}

		nav {
			.van-icon-arrow-left {
				position: absolute;
				left: 0.6rem;
				top: 50%;
				transform: (translate(0, -50%));
			}
		}

		.van-dropdown-menu {
			height: 1rem;
		}

		.van-hairline--top-bottom {
			text-align: left;

			.van-ellipsis {
				font-size: 0.3rem;
			}

			.van-cell--clickable {
				font-size: 0.3rem;
			}
		}
	}
</style>
<style lang="scss" scoped>
	#p_user_contact2 {
		width: 100%;

		ul {
			padding: 1.6rem 0 1.5rem 0;
			background: white;

			li:nth-child(1) {
				margin-bottom: 0.5rem;
				height: 2.23rem;
				// display: flex;
				align-items: center;
				border-bottom: 0.02rem dashed #f2f2f2;

				img {
					height: 1.46rem;
					width: 1.46rem;
				}

				span:nth-child(1) {
					// display: inline;
					// font-weight: 600;
					// color: #4c4c4c;
					margin-right: 0.76rem;
					// font-size: 0.3rem;
					// line-height: 1.5rem;
				}

				span:nth-child(2) {
					font-weight: 600;
					color: #4c4c4c;
					font-size: 0.38rem;
					// line-height: 1.5rem;
				}
			}

			li {
				word-break: break-all;
				margin: 0 0.7rem 0;
				display: flex;
				font-size: 0.38rem;

				div {
					>div {
						margin-bottom: 0.5rem;
						align-items: baseline;
						font-size: 0.44rem;
						line-height: 0.56rem;
					}

					.row1 {
						color: #4c4c4c;
						font-weight: 600;
						margin-bottom: 0.2rem;
					}

					.row2 {
						/*height: 0.6rem;*/
						word-break: break-all;
						line-height: 0.6rem;
						color: #787878;
					}
				}


			}
		}
	}
</style>
