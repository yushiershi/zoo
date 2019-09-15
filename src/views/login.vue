<template>
	<el-container>
		<el-main>
			<div class="logo">
				<img src="../assets/img/index/login_logo.png" style="width: 24%;"/>
			</div>
			<zoo-input-line inputType="tel" v-model="user.phone" iconType="account" placeHolder="手机号码"
				@keypress.native.enter="$refs.pwd.focus()" maxLength="11">
			</zoo-input-line>
			<zoo-input-line v-model="user.pass" ref="pwd" iconType="password" placeHolder="密码"
				@keypress.native.enter="$refs.code.focus()" maxLength="16" :inputType="show1?'text':'password'">
        <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
			</zoo-input-line>
			<zoo-input-line v-model="user.code" ref="code" iconType="validcode" placeHolder="验证码"
				@keypress.native.enter="login" maxLength="5">
				<!-- <span class="valid-code" v-show="cnt==0" @click="sendValidCode">发送验证码</span>
				<span class="valid-cnt" v-show="cnt>0" maxLength="6">{{cnt}}秒</span> -->
				<img :src="imgbuff"
					style="width: 100px;" @click="changeValid"/>
			</zoo-input-line>
			<div class="btn">
				<zoo-button label="登录" @click="login"></zoo-button>
			</div>
			<div class="tool-line">
				<div class="forget-pass" @click="$router.push('/forget')">忘记密码</div>
				<div class="regist" @click="$router.push('/regist')">新用户注册</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
import { Container,Main } from 'element-ui';
import { login,getCodeImg,getSessionid } from '../utils/axios/api.js';
//import md5 from "js-md5";
	export default {
		name:'login',
		components: {
			'el-container':Container,
			'el-main':Main,
		},
		data(){
			return {
        show1:false,
				imgbuff:null,
				timestamp:null,
				cnt:0,
				user:{
					phone:"",
					pass:"",
					code:""
				}
			}
		},
		watch:{
			timestamp(val){
				let that = this;
				getCodeImg({timestamp:val}).then(res => {
					that.imgbuff = 'data:image/png;base64,' + new Buffer(res, 'binary').toString('base64');
				})
			}
		},
		methods: {
      changeValid(){
        this.timestamp = new Date().getTime();
        this.user.code="";
      },
			sendValidCode(){
				if(this.cnt>0){
					return;
				}
				this.cnt = 60;
				setTimeout(this.countdown,1000);
				this.$message.success('发送验证码成功');
			},
			countdown(){
				this.cnt--
				if(this.cnt>0){
					setTimeout(this.countdown,1000);
				}
			},
			login() {
				if(!new RegExp(this.$ptn.phone()).test(this.user.phone)){
					this.$message.error("请输入正确的手机号码");
					return;
				}
				if(!this.user.code){
					this.$message.error("请输入正确的验证码");
					return;
				}
				if(!this.user.pass){
					this.$message.error("密码不能为空");
					return;
				}
				if(this.user.pass.length<8){
					this.$message.error("密码至少8位字符");
					return;
				}
				if(!/\d/.test(this.user.pass)||!/[a-zA-Z]/.test(this.user.pass)){
					this.$message.error("密码必须同时包含数字和字母");
					return false;
				}
				let that = this;
				login({
					phone:this.user.phone,
					code:this.user.code,
					pwd:this.user.pass//md5(this.user.pass)
				}).then(res => {
					if(res.status.errCode===200){
						that.$store.commit(that.$types.LOGIN,true);
						that.$store.commit(that.$types.USERNAME,this.user.phone);
            that.$store.commit("setUserId",res.data.userID);
						that.$router.push("/sx/index");
					}else{
            that.changeValid();
          }
				}).catch(res => {
          that.changeValid();
					that.$message.error(res.msg);
				})
				//this.$router.push("/sx/index");
			}
		},
		mounted(){
			this.$util.doStopReturn();
			getSessionid();
			this.timestamp = new Date().getTime();
			let that = this;
			setInterval(function(){
				that.timestamp = new Date().getTime();
			},300000);
		},
		destroyed() {
			this.$util.removeStopReturn();
		},
	}
</script>

<style scoped>
	.logo{
		width: 100%;
		height: 30vh;
		margin: 5vh 0 3vh 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.valid-code,.forget-pass,.regist{
		font-size: 14px;
		color: #673ab7;
		cursor: pointer;
	}
	.valid-cnt {
		font-size: 14px;
	}
	.tool-line{
		display: flex;
		justify-content: space-between;
	}
	.forget-pass {
		margin-left: 15px;
	}
	.regist{
		margin-right: 15px;
	}
</style>
