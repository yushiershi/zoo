<template>
	<zoo-content title="修改资金密码">
    <zoo-line-item label="验证码">
      <zoo-gray-input v-model="user.code"
        @keypress.native.enter="$refs.pass.focus()"
        placeHolder="请输入验证码"
        maxLength="4"></zoo-gray-input>
      <span slot="right">
        <zoo-button type="small" :maxCount="60" width="80px" ref="validinput"
          @click="sendValidCode" label="发送验证码"></zoo-button>
      </span>
    </zoo-line-item>
    <zoo-line-item label="新密码">
      <zoo-gray-input v-model="user.pass" ref="pass"
        @keypress.native.enter="checkPass(false)"
        placeHolder="请输入新密码"
        :inputType="show1?'text':'password'"
        maxLength="16"></zoo-gray-input>
        <span slot="right">
          <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
        </span>
    </zoo-line-item>
    <zoo-line-item label="确认密码">
      <zoo-gray-input v-model="user.repass" ref="repass"
        @keypress.native.enter="findPass"
        placeHolder="请重复输入一遍密码"
        :inputType="show2?'text':'password'"
        maxLength="16"></zoo-gray-input>
        <span slot="right">
          <zoo-icon :iconType="show2?'password-eye-open':'password-eye-close'" @click.native="show2 = !show2"></zoo-icon>
        </span>
    </zoo-line-item>
    <div class="btn">
      <zoo-button label="提交" @click="findPass"></zoo-button>
    </div>
  </zoo-content>
</template>

<script>
import { Container,Main } from 'element-ui';
import { passCode,editpaypwd,logout } from '../../utils/axios/api.js';
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
					phone:this.$store.state.userName,
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
				editpaypwd({
					phone:this.user.phone,
					code:this.user.code,
					newpwd:this.user.pass,//md5(this.user.pass),
				}).then(res => {
					that.$message.success('密码修改成功');
					that.$router.push("./index");
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
