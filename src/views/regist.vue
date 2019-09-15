<template>
	<el-container>
		<el-main>
			<div class="input-label" style="margin-top: 20px;">手机号</div>
			<zoo-input-line inputType="tel" v-model="user.mobile" placeHolder="请输入手机号码" maxLength="11"
				@keypress.native.enter="$refs.validcode.focus()">
			</zoo-input-line>
			<div class="input-label">验证码</div>
			<zoo-input-line v-model="user.code" ref="validcode" placeHolder="请输入验证码" maxLength="4"
				@keypress.native.enter="$refs.invitecode.focus()">
				<zoo-button type="small" :maxCount="60" width="80px" ref="validinput"
					@click="sendValidCode" label="发送验证码"></zoo-button>
			</zoo-input-line>
			<div class="input-label">邀请人</div>
			<zoo-input-line inputType="tel" v-model="user.invitecode" ref="invitecode" placeHolder="请输入邀请人手机号码"
				@keypress.native.enter="$refs.pass.focus()">
			</zoo-input-line>
			<div class="input-label">密码</div>
			<zoo-input-line v-model="user.pass" ref="pass" placeHolder="请输入8-16位包含数字和字母的密码" maxLength="16"
				@keypress.native.enter="checkPass(false)" :inputType="show1?'text':'password'">
        <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
			</zoo-input-line>
			<div class="input-label">确认密码</div>
			<zoo-input-line v-model="user.repass" ref="repass" placeHolder="请重复输入一遍密码" maxLength="16"
				@keypress.native.enter="checkPass(true)" :inputType="show2?'text':'password'">
        <zoo-icon :iconType="show2?'password-eye-open':'password-eye-close'" @click.native="show2 = !show2"></zoo-icon>
			</zoo-input-line>
			<div class="input-label">资金密码</div>
			<zoo-input-line v-model="user.cashpass" ref="cashpass" placeHolder="请输入8-16位包含数字和字母的资金密码" maxLength="16"
				@keypress.native.enter="checkCashPass(false)" :inputType="show3?'text':'password'">
        <zoo-icon :iconType="show3?'password-eye-open':'password-eye-close'" @click.native="show3 = !show3"></zoo-icon>
			</zoo-input-line>
			<div class="input-label">确认资金密码</div>
			<zoo-input-line v-model="user.recashpass" ref="recashpass" placeHolder="请重复输入一遍资金密码" maxLength="16"
				@keypress.native.enter="regist" :inputType="show4?'text':'password'">
        <zoo-icon :iconType="show4?'password-eye-open':'password-eye-close'" @click.native="show4 = !show4"></zoo-icon>
			</zoo-input-line>
			<div class="btn">
				<zoo-button label="注册" @click="regist"></zoo-button>
			</div>
			<div class="tool-line" @click="$router.push('/')">
				已经有账号？点击这里登录
			</div>
		</el-main>
	</el-container>
</template>

<script>
import { Container,Main } from 'element-ui';
import { registerCode,register } from '../utils/axios/api.js';
//import md5 from "js-md5";
	export default {
		name:'login',
		components: {
			'el-container':Container,
			'el-main':Main,
		},
		data(){
			return {
				user:{
				},
        show1:false,
        show2:false,
        show3:false,
        show4:false,
			}
		},
		methods: {
			checkCashPass(flag){
				if(flag){
					if(this.user.cashpass!=this.user.recashpass){
						this.$message.error("两次输入资金密码不一致");
						return false;
					}
					return true;
				}else{
					if(this.user.pass.length<8){
						this.$message.error("资金密码至少8位字符");
						return false;
					}
					if(!/\d/.test(this.user.cashpass)||!/[a-zA-Z]/.test(this.user.cashpass)){
						this.$message.error("资金密码必须同时包含数字和字母");
						return false;
					}
					if(this.user.recashpass&&this.user.cashpass!=this.user.recashpass){
						this.$message.error("两次输入资金密码不一致");
						return false;
					}
					this.$refs.recashpass.focus();
					return true;
				}
			},
			checkPass(flag){
				if(flag){
					if(this.user.pass!=this.user.repass){
						this.$message.error("两次输入密码不一致");
						return false;
					}
					this.$refs.cashpass.focus();
					return true;
				}else{
					if(this.user.pass.length<8){
						this.$message.error("密码至少8位字符");
						return false;
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
				if(!new RegExp(this.$ptn.phone()).test(this.user.mobile)){
					this.$message.error("请输入正确的手机号码");
					this.$refs.validinput.clearInterval();
					return;
				}
				let that = this;
				registerCode({
					phone:new Number(this.user.mobile)
				}).then(res => {
					that.$message.success("验证码已经发送");
				})
			},
			regist() {
				if(!this.checkCashPass(true)){
					return;
				}
				if(!new RegExp(this.$ptn.phone()).test(this.user.mobile)){
					this.$message.error("请输入正确的手机号码");
					return;
				}
				if(!new RegExp(this.$ptn.phone()).test(this.user.invitecode)){
					this.$message.error("请输入正确的邀请人手机号码");
					return;
				}
				if(!this.user.code||this.user.code.length!=4){
					this.$message.error("请输入正确的验证码");
					return;
				}
				if(!this.user.invitecode){
					this.$message.error("请输入邀请码");
					return;
				}
				if(!this.user.pass){
					this.$message.error("请输入密码");
					return;
				}
				if(!this.user.cashpass){
					this.$message.error("请输入资金密码");
					return;
				}
        if(this.user.pass.length<8){
          this.$message.error("密码至少8位字符");
          return false;
        }
        if(!/\d/.test(this.user.pass)||!/[a-zA-Z]/.test(this.user.pass)){
          this.$message.error("密码必须同时包含数字和字母");
          return false;
        }
        if(this.user.pass.length<8){
          this.$message.error("资金密码至少8位字符");
          return false;
        }
        if(!/\d/.test(this.user.cashpass)||!/[a-zA-Z]/.test(this.user.cashpass)){
          this.$message.error("资金密码必须同时包含数字和字母");
          return false;
        }
				if(!this.checkPass(true)){
					return;
				}
        let that = this;
				register({
					phone:this.user.mobile,
					code:this.user.code,
					invitecode:this.user.invitecode,
					pwd:this.user.pass,//md5(this.user.pass),
					paypwd:this.user.cashpass,//md5(this.user.cashpass),
				}).then(res => {
					if(res.status.errCode===200){
            that.$message.success('您已注册成功，感谢您的注册');
            that.$router.push("/login");
          }
				})
			}
		},
    mounted(){
      if(this.$route.query.invited){
        this.$set(this.user,'invitecode',this.$route.query.invited);
      }
    }
	}
</script>

<style scoped>
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
