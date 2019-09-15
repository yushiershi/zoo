<template>
    <zoo-content title="充值">
      <zoo-line-item label="USDT收款二维码">
        <div style="width: 100%;display: flex;justify-content: center;">
          <img :src="$store.state.imgUrl+data.imageSrc" style="width: 50%;"/>
        </div>
      </zoo-line-item>
      <zoo-line-item :label="data.account">
      </zoo-line-item>
      <zoo-line-item :label="data.title">
        {{data.tips}}
      </zoo-line-item>
      <zoo-line-item label="上传付款凭证">
        <zoo-upload-img :type="1" v-model="info.imgurl"></zoo-upload-img>
      </zoo-line-item>
      <zoo-line-item label="资产密码">
        <zoo-gray-input :inputType="show1?'text':'password'" v-model="info.cashpass" placeHolder="请填写资产密码" maxLength="16"></zoo-gray-input>
        <span slot="right">
          <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
        </span>
      </zoo-line-item>
      <div class="btn">
        <zoo-button label="确认提交" @click="submit"></zoo-button>
      </div>
    </zoo-content>
</template>

<script>
	import { rechargeinfo,recharge } from '../../utils/axios/api.js';
	export default {
		name:'gd',
		data(){
		  return {
			data:{},
			info:{},
			show1:false,
		  }
		},
		methods: {
		  submit() {
				if(!this.info.cashpass){
					this.$message.error("资产密码不能为空");
					return;
				}
			let that = this;
			recharge({
			  "payimageSrc": this.info.imgurl,
			  "paypwd": this.info.cashpass,
			}).then(res => {
			  if(res.status.errCode===200){
				that.$message.success("充值信息已经提交，请耐心等待工作人员审核");
				that.$router.go(-1);
			  }
			})
		  },
		  rechargeinfo(){
			let that = this;
			rechargeinfo().then(res => {
			  that.data = res.data;
			})
		  }
		},
		mounted(){
		  this.rechargeinfo();
		}
	}
</script>