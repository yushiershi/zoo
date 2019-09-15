<template>
    <zoo-content title="领养确认"><div class="info-line">
      温馨提示：为了玩家订单安全，收款信息约在18-19分钟显示出来！
    </div>
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
      <zoo-line-item label="转让方收款账号" :hasMargin="false">
        <div class="pay-line">
          <zoo-icon iconType="wx" size="80px"></zoo-icon>
          <div class="payinfo-line">
            <div class="payinfo-text">账户名称：{{data.wechatName}}</div>
            <div class="payinfo-text">账户号：{{data.wechatAccount}}</div>
            <div class="payinfo-text">账户类型：微信</div>
          </div>
        </div>
        <div class="pay-line">
          <img :src="$store.state.imgUrl+data.transWechatSrc" style="max-width: 50vw;margin-top: 20px;"/>
        </div>
      </zoo-line-item>
      <zoo-line-item label="转让方收款账号" :hasMargin="false">
        <div class="pay-line">
          <zoo-icon iconType="zfb" size="80px"></zoo-icon>
          <div class="payinfo-line">
            <div class="payinfo-text">账户名称：{{data.alipayName}}</div>
            <div class="payinfo-text">账户号：{{data.alipayAccount}}</div>
            <div class="payinfo-text">账户类型：支付宝</div>
          </div>
        </div>
        <div class="pay-line">
          <img :src="$store.state.imgUrl+data.transAlipaySrc" style="max-width: 50vw;margin-top: 20px;"/>
        </div>
      </zoo-line-item>
      <zoo-line-item label="转让方收款账号" :hasMargin="false">
        <div class="payinfo-line">
          <div class="payinfo-text">银行名称：{{data.bankUsername}}</div>
          <div class="payinfo-text">银行卡账号：{{data.bankNum}}</div>
          <div class="payinfo-text">银行名称：{{data.bank}}</div>
          <div class="payinfo-text">支行名称：{{data.bankName}}</div>
        </div>
      </zoo-line-item>
      <zoo-line-item label="付款凭证" :hasMargin="false">
        <zoo-upload-img :type="1" v-model="info.paysrc"></zoo-upload-img>
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
	import { tranconfirm,adopttrade } from '../../utils/axios/api.js';
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
        if(!this.info.paysrc){
          this.$message.error("截图不能为空");
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
      adopttrade(){
        let that = this;
        adopttrade({adpotID :this.$route.params.id}).then(res => {
          that.data = res.data;
        })
      }
		},
    mounted(){
      this.adopttrade();
    }
	}
</script>

<style scoped>
  .info-line{
    background-color: #fffac7;
    color: #ff6e17;
    font-size: 16px;
    margin: -13px 0 20px 0;
    padding: 10px 15px;
    line-height: 32px;
  }
	.item-line{
		margin: 10px 25px;
		font-size: 16px;
		line-height: 20px;
	}
	.item-content{
		font-size: 16px;
		font-weight: bold;
	}
  .pay-line{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .payinfo-line{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
  }
  .payinfo-text{
    font-size: 16px;
    font-weight: bolder;
  }
</style>
