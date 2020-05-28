<template>
	<div id="a_submit_contract">
		<!--      <nav class="a_submit_contract">
        <van-icon name="arrow-left" @click="$router.go(-2)" />{{$t('agent.SignTheContract')}}
      </nav> -->
		<commonnav :msg="$t('agent.SignTheContract')"></commonnav>
		<main>
			<article>
				<contractcomponent :contract="contract"></contractcomponent>
				<footer>
					<button @click="signproject4">{{$t('common.Submit')}}</button>
				</footer>
			</article>
		</main>
		<!--      <mbottom></mbottom>-->

	</div>
</template>

<script>
	export default {
		name: "goods_details",
		props: ['contract'],
		data() {
			return {
				signId: '',
				projectId: '',
			};
		},
		// beforeRouteEnter(to,from,next){
		//       next((vm)=>{ //参数vm就是当前组件的实例。
		//       console.log(from);

		//         // console.log(to,from,vm.$route.query)
		//         // if(from.name!="a_sign_contract" && vm.iswatch==2){
		//         //   next({name: 'agent_set_contract',query:vm.$route.query});
		//         // }
		//       })
		//   },
		// beforeRouteLeave(to,from,next){
		//     console.log(to,from)
		//       if(to.name=='a_submit_contract'){
		//          next({path: '/mysign'});
		//       }else{
		//         next()
		//       }
		// },
		created() {
			this.projectId = this.$route.query.projectId ? this.$route.query.projectId : '';
			this.signId = this.$route.query.signId ? this.$route.query.signId : -1;
		},
		methods: {
			// 签约
			signproject4() {
				for (let i in this.contract) {
					if (this.contract[i] == '') {
						this.$dialog
							.confirm({
								title: this.$t('ContractWrods.PleaseReturnToCompleteInformation')
								// message: "弹窗内容"
							})
							.then(() => {
								// this.$routerto('agent_set_contract',this.$route.query)
								this.$router.go(-2)
							});
						return;
					}
				};
				let agent_signdata = this.contract.agent_signdate ? this.$global.stamptodate(this.contract.agent_signdate) : '';
				let owner_signdata = this.contract.owner_signdate ? this.$global.stamptodate(this.contract.owner_signdata) : '';
				this.$toast.loading({
					loadingType: "spinner",
					message: this.$t('ContractWrods.UploadTakesAboutOneMinute'),
					overlay: true,
					duration: 0
				});
				this.$global.post_encapsulation(`${this.$baseurl}/bsl_web/projectSign/signProject4`, {
						signId: this.signId,
						projectId: this.projectId,
						signAgreement: JSON.stringify(this.contract),
						// X_Token: this.$store.state.X_Token,
						htmlData: `<html lang="en">
							<head>
							  <meta charset="UTF-8">
							  <meta name="viewport" content="user-scalable=yes">
							  <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
							  <style>
								html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img,input{ margin:0; padding:0; }
								fieldset, img,input,button { border:0 none; padding:0;margin:0;outline-style:none; }   /*去掉input等聚焦时的蓝色边框*/
								ul,li,ol{ list-style:none; }
								#contract_component {
								  width: 595px;
								  /*height: 100%;*/
								  margin: 0 auto;
								  padding: 50px 0;
								  box-sizing: border-box;
								  /*595×842*/
								}
								.ql-align-center{
								  text-align: center;
								}
								.ql-container{
								  height: initial;
								}
								#contract_component .contract_component {
								  /*border: 1px solid #b5b5b5;*/
								  box-sizing: border-box;
								  font-size: 12px;
								  line-height: 20px;
								  padding:30px;
								  width: 100%;
								  /*height: 100%;*/
								  color: black;
								  word-wrap: break-word;
								}
								#contract_component .contract_component .middle{
								  min-height: 250px;
								  background: none;
								  border: 0;
								  width: 100%;
								  white-space: pre-wrap;
								  white-space: -moz-pre-wrap;
								  /*//Mozilla, since 1999 *!*!*/
								  /*white-space: -pre-wrap;*/
								  /*//  //!* Opera 4-6 *!*!*/
								  white-space: -o-pre-wrap;
								}
								#contract_component .contract_component div.button {
								  margin-top: 10px;
								  display: -moz-box;
								  display: -ms-flexbox;
								  display: -webkit-flex;
								  display: flex;
								  -webkit-justify-content:space-between;
								  justify-content:space-between;
								}
								#contract_component .contract_component ul {
								  width: 40%;
								}
								#contract_component .contract_component ul li p{
								  height: 30px;
								}

								#contract_component .contract_component ul li p.signature{
								  text-align: center;

								}
								#contract_component .contract_component ul li p.signature img{
								  width: auto;
								  height: auto;
								  max-width: 100%;
								  max-height: 100%;
								}
								#contract_component .contract_component ul li p:nth-child(1){
								  position: relative;
								  line-height: 14px;
								  border-bottom: 1px solid black;
								}
								#contract_component .contract_component ul li p:nth-child(2){
								  font-weight: 600;
								}
								#contract_component .contract_component ul li:nth-of-type(1){
								  margin-bottom: 30px;
								  height: 80px;
								  line-height: 14px;
								  /* min-height: 50px;
								  max-height: 100px; */
								}
								#contract_component .contract_component ul li:nth-of-type(1) nav{
								  font-weight: 600;

								}   #contract_component .contract_component ul li:nth-of-type(1) div{
									  /* min-height: 30px;*/
									  /*max-height: 100px;*/

									}
								#contract_component .contract_component ul li p:nth-child(1) span{
								  position: absolute;
								  line-height: 14px;
								  word-break: break-all;
								  bottom: 0;
								}

							  </style>

							</head>
							<body>
							<div id="contract_component">
							  <div class="contract_component ql-container ql-snow">
								<div class="middle ql-editor"></div>
								<div class="button">
								  <ul>
									<li>
									  <nav>For and on behalf of:</nav>
									  <div>${this.contract.owner_behalf}</div>
									</li>
									<li>
									  <div>
										<p><img src="${this.contract.owner_sign}" alt=""></p>
									  </div>
									  <p>Signature</p>
									</li>
									<li>
									  <p><span>${this.contract.owner_name}</span></p>
									  <p>Name</p>
									</li>
									<li>
									  <p><span>${this.contract.owner_title}</span></p>
									  <p>Title</p>
									</li>
									<li>
									  <p><span>${owner_signdata}</span></p>
									  <p>Date</p>
									</li>
								  </ul>
								  <ul>
									<li>
									  <nav>For and on behalf of:</nav>
									  <div>${this.contract.agent_behalf}</div>
									</li>
									<li>
									  <div>
										<p><img src="${this.contract.agent_sign}" alt=""></p>
									  </div>
									  <p>Signature</p>
									</li>
									<li>
									  <p><span>${this.contract.agent_name}</span></p>
									  <p>Name</p>
									</li>
									<li>
									  <p><span>${this.contract.agent_title}</span></p>
									  <p>Title</p>
									</li>
									<li>
									  <p><span>${agent_signdata}</span></p>
									  <p>Date</p>
									</li>
								  </ul>
								</div>
							  </div>
							</div>
							<script>
							  let a=  document.querySelector('#contract_component .middle');
							  a.innerHTML=\`${this.contract.article}\`;
							<\/script>
							</body>
							</html>`,
					})
					.then(res => {
						this.$toast.clear();
						if (res.data.resultCode == 10000) {
							// this.signId = res.data.data.signId;
							// this.token = res.data.data.visitToken;
							this.$dialog
								.alert({
									title: res.data.resultDesc,
									message: this.$t('ContractWrods.ConfirmAndUploadToBlockchain')
								})
								.then(() => {
									this.$routerto('mysign');
									// this.$routerto("uploadtoblock",  {
									//    signId: this.signId,
									//    projectId: this.projectId,
									//    signStatus: 4
									//  });
								});
						} else {
							this.$dialog
								.alert({
									title: res.data.resultDesc,
								})
								.then(() => {
									// this.$routerto('mysign');
								});
						}
					});
			},

			// iframe传值
			// handleMessage(event) {
			//   var data = event.data;
			//   switch (data.cmd) {
			//     case "returnFormJson":
			//       // 处理业务逻辑
			//       this.childData = data;
			//       console.log(this.childData);

			//       break;
			//   }
			// },
			// let p = new Promise((resolve, reject) => {
			//   this.iframeState = true;
			//   resolve("success");
			// });
			// p.then(result => {
			//   // console.log(result); //success
			//   if (result == "success") {
			//     let iframeWin = this.$refs.iframe.contentWindow;
			//     return iframeWin;
			//   }
			// }).then(iframeWin => {
			//   console.log(this.str);
			//   iframeWin.postMessage(
			//     {
			//       cmd: "toson",
			//       params: this.str
			//     },
			//     "*"
			//   );
			// });
		}
	};
</script>
<style lang="scss">
	#a_submit_contract {
		height: 100%;
		width: 100%;

		.van-cell {
			padding: 0;
		}
	}
</style>
<style lang="scss" scoped>
	#a_submit_contract {
		width: 100%;
		height: 100%;
		padding: 1.5rem 0 1.3rem 0;

		div.middle {
			/*margin: 0 0.5rem;*/
			box-sizing: border-box;
		}

		main {
			// margin-top: 1.5rem;
			// margin-bottom: 1.5rem;
			padding: 0.5rem;
			height: 100%;
			width: 100%;
			background: #ffffff;

			article {
				height: 100%;
				display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				flex-direction: column;
				-webkit-flex-direction: column;
				-webkit-justify-content: space-between;
				justify-content: space-between;
				width: 100%;

				>div {
					height: 85%;
				}

				footer {
					width: 100%;
					font-size: 0.42rem;
					display: flex;
					justify-content: center;

					button {
						background: #00adef;
						line-height: 1rem;
						color: white;
						height: 1rem;
						width: 8rem;
						border-radius: 5px;
					}

					.blockchain {
						background: orange;
					}
				}

			}

		}
	}
</style>
