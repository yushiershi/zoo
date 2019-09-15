<template>
    <zoo-content title="转让确认">
		<div class="item-line">
				  订单时间：
				  <span class="item-content">{{data.adopttime}}</span>
		</div>
		<div class="item-line">
				  转让方联系电话：
				  <span class="item-content">{{data.tranphone}}</span>
		</div>
		<div class="item-line">
				  领养方联系电话：
				  <span class="item-content">{{data.adophone}}</span>
		</div>
		<div class="item-line">
				  金额：
				  <span class="item-content">{{data.price}}元</span>
		</div>
    <zoo-line-item label="付款凭证" :hasMargin="false">
      <img :src="$store.state.imgUrl+info.imagesrc" style="max-width: 120px;"/>
    </zoo-line-item>
	  <zoo-line-item label="资产密码" :hasMargin="false">
	    <zoo-gray-input v-model="info.paypwd" ref="pass"
	      @keypress.native.enter="checkPass(false)"
	      placeHolder="请输入资产密码"
	      :inputType="show1?'text':'password'"
	      maxLength="16"></zoo-gray-input>
	      <span slot="right">
	        <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
	      </span>
	  </zoo-line-item>
      <div class="btn">
        <zoo-button label="提交" @click="submit"></zoo-button>
      </div>
    </zoo-content>
</template>

<script>
	import { tranconfirm,transfertrade } from '../../utils/axios/api.js';
	export default {
		name:'zrDetail',
		data(){
		  return {
        info:{},
        show1:false,
        data:{},
		  }
		},
		methods: {
		  submit() {
			if(!this.info.paypwd){
			  this.$message.error("资产密码不能为空");
			  return;
			}
			let that = this;
			tranconfirm({
			  "id": this.$route.params.id,
			  ...this.info
			}).then(res => {
			  that.$message.success("确认成功！");
			  that.$router.go(-1);
			})
		  },
		  transfertrade(){
			let that = this;
			transfertrade({adpotID :this.$route.params.id}).then(res => {
			  that.data = res.data;
			})
		  }
		},
		mounted(){
		  this.transfertrade();
		},
	}
</script>

<style scoped>
	.item-line{
		margin: 10px 25px;
    font-size: 16px;
    line-height: 20px;
	}
  .item-content{
    font-size: 16px;
    font-weight: bold;
  }
</style>
