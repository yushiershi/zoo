<template>
	<el-container>
		<el-main>
			<div class="logo">
				<img src="../assets/img/index/login_logo.png" style="width: 24%;"/>
			</div>
			<div class="input-label">手机号码</div>
			<zoo-input-line inputType="tel" v-model="user.phone" placeHolder="手机号码"
				@keypress.native.enter="$refs.code.focus()">
			</zoo-input-line>
			<div class="input-label">验证码</div>
			<zoo-input-line v-model="user.code" ref="validcode" placeHolder="请输入验证码" maxLength="4"
				@keypress.native.enter="$refs.pass.focus()">
				<zoo-button type="small" :maxCount="60" width="80px" ref="validinput"
					@click="sendValidCode" label="发送验证码"></zoo-button>
			</zoo-input-line>
			<div class="input-label">新密码</div>
			<zoo-input-line v-model="user.pass" ref="pass" placeHolder="请输入新密码" maxLength="16"
				@keypress.native.enter="checkPass(false)" :inputType="show1?'text':'password'">
        <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
			</zoo-input-line>
			<div class="input-label">确认密码</div>
			<zoo-input-line v-model="user.repass" ref="repass" placeHolder="请重复输入一遍密码" maxLength="16"
				@keypress.native.enter="findPass" :inputType="show2?'text':'password'">
        <zoo-icon :iconType="show2?'password-eye-open':'password-eye-close'" @click.native="show2 = !show2"></zoo-icon>
			</zoo-input-line>
			<div class="btn">
				<zoo-button label="找回密码" @click="findPass"></zoo-button>
			</div>
			<div class="tool-line" @click="$router.push('/regist')">
				没有账号？点击这里注册
			</div>
		</el-main>
	</el-container>
</template>

<script>
import { Container,Main } from 'element-ui';
import { passCode,editpwd } from '../utils/axios/api.js';
	export default {
		name:'login',
		components: {
			'el-container':Container,
			'el-main':Main,
		},
		data(){
			return {
				cnt:0,
				user:{
					phone:"",
					code:""
				},
        show1:false,
        show2:false,
			}
		},
		methods: {
      checkPass(flag){
      	if(flag){
      		if(this.user.pass!=this.user.repass){
      			this.$message.error("两次输入密码不一致");
      			return false;
      		}
      		return true;
      	}else{
      		if(!this.user.pass.length||this.user.pass.length<8){
      			this.$message.error("密码至少8位字符");
      			return;
      		}
      		if(!/\d/.test(this.user.pass)||!/[a-zA-Z]/.test(this.user.pass)){
      			this.$message.error("密码必须同时包含数字和字母");
      			return false;
      		}
      		if(this.user.repass&&this.user.pass!=this.user.repass){
      			this.$message.error("两次输入密码不一致");
      			return false;
      		}
      		this.$refs.repass.focus();
      		return true;
      	}
      },
			sendValidCode(){
				if(!new RegExp(this.$ptn.phone()).test(this.user.phone)){
					this.$message.error("请输入正确的手机号码");
					this.$refs.validinput.clearInterval();
					return;
				}
				let that = this;
				passCode({
					phone:new Number(this.user.phone)
				}).then(res => {
					that.$message.success("验证码已经发送");
				})
			},
			findPass() {
				if(!this.checkPass(true)){
					return;
				}
				if(!new RegExp(this.$ptn.phone()).test(this.user.phone)){
					this.$message.error("请输入正确的手机号码");
					return;
				}
				if(!this.user.code||this.user.code.length!=4){
					this.$message.error("请输入正确的验证码");
					return;
				}
				if(!this.user.pass){
					this.$message.error("请输入密码");
					return;
				}
				if(!this.checkPass(true)){
					return;
				}
				let that = this;
				editpwd({
					phone:this.user.phone,
					code:this.user.code,
					newpwd:this.user.pass,//md5(this.user.pass),
				}).then(res => {
					that.$message.success('密码修改成功');
					that.$router.push("/login");
				})
			}
		},
		mounted(){
		}
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
	.valid-code,.tool-line{
		font-size: 14px;
		color: #673ab7;
		cursor: pointer;
	}
	.valid-cnt {
		font-size: 14px;
	}
	.tool-line{
		display: flex;
		justify-content: center;
	}
	.input-label {
		margin: 5px 20px;
		color: #3c3c3c;
	}
	.btn{
		margin-top: -10px;
	}
</style>
